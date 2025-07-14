"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Plus, Settings, Palette, Globe, HardDrive, MapPin, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePredefinicoes } from "@/modules/predefinicoes/hooks/usePredefinicoes"
import { PredefinicaoFormData } from "@/modules/predefinicoes/types"
import TabGeral from "@/modules/predefinicoes/components/TabGeral"
import TabPagamento from "@/modules/predefinicoes/components/TabPagamento"
import TabLocalidade from "@/modules/predefinicoes/components/TabLocalidade"
import TabAdicional from "@/modules/predefinicoes/components/TabAdicional"
import TabHardware from "@/modules/predefinicoes/components/TabHardware"
import TabLocalizacao from "@/modules/predefinicoes/components/TabLocalizacao"

export default function CriarPredefinicaoPage() {
  const router = useRouter()
  const { departamentos, createPredefinicao } = usePredefinicoes()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("geral")
  const [formData, setFormData] = useState<PredefinicaoFormData>({
    nome: "",
    departamento: "",
    configuracaoGeral: {
      departamentoQuiosques: "",
      usarFonteFoto: false,
      fonteFoto: {
        instagram: false,
        telefone: false,
        facebook: false,
        identificacao: false,
        selfie: false,
        eventoInstagram: false,
      },
      usarTipoUploadTelefone: false,
      tipoUploadTelefone: {
        rede: false,
        wifi: false,
        bluetooth: false,
      },
      predefinicaoLayout: "",
      predefinicaoAnuncio: "",
      predefinicaoDocPhoto: "",
    },
    configuracaoPagamento: {
      preco: "",
      precoFotoIdentificacao: "",
      usarPrecoFlexivel: false,
      oFlexPriceE: false,
      precosEspeciais: [],
      usarCodigoPromocionalTroco: false,
      codigoPromocionalAlteracao: false,
      tipoPromocaoErroImpressao: "",
      valorMinimoImpressao: "",
      usarPagamentosCodigoQr: false,
      pagamentosCodigoQr: {
        ksherPromptPay: false,
        ksherAlipay: false,
        ksherTruemoney: false,
        rmTng: false,
        rmGrabPay: false,
        maybankQrPay: false,
        impulsionar: false,
        mostroReceita: false,
        bcelLaos: false,
      },
      usarNotasAceitas: false,
      aceitandoNotas: false,
      usarMoedasAceitam: false,
      aceitandoMoedas: false,
    },
    configuracaoLocalidade: {
      usarLocalidades: false,
      localidadePadrao: "",
      locais: [],
    },
    configuracaoHardware: {
      usarRegiao: false,
      regiao: "",
      usarAceitadorMoedas: false,
      aceitadorMoedas: "",
      usarHopper: false,
      funii: "",
      qualidadeMoedaHopper: "",
      usarControlador: false,
      controlador: "",
      usarAceitadorNotas: false,
      aceitadorNotas: "",
      usarCashless: false,
      semDinheiro: "",
      portoSemDinheiro: "",
      serieSemDinheiro: "",
    },
    configuracaoLocalizacao: {
      usarHorarioFuncionamento: false,
      horarioFuncionamento: [],
    },
    configuracaoAvancada: {
      atrasoReinicializacao: "",
      redefinirExibicaoAtraso: "",
      taxaPrincipalAtrasoReinicializacao: "",
      imprimirRendaVitalicia: "",
      reiniciarQuiosqueAposErros: "",
      usarFotosPbAtencao: false,
      fotosPbAtencoes: false,
      usarLimiteFolhasImpressas: false,
      limiteFolhasImpressao: "",
      limiteMeoriaRenderizacao: "",
      usarMargem: false,
      margem: {
        left: 44,
        right: 44,
        top: 48,
        bottom: 48,
      },
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createPredefinicao(formData)
      router.push("/quiosques/predefinicoes")
    } catch (error) {
      console.error("Erro ao criar predefinição:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAndAddAnother = async () => {
    setLoading(true)
    try {
      await createPredefinicao(formData)
      // Reset form for new entry
      setFormData({
        ...formData,
        nome: "",
        departamento: "",
      })
    } catch (error) {
      console.error("Erro ao criar predefinição:", error)
    } finally {
      setLoading(false)
    }
  }

  const tabConfig = [
    { id: "geral", label: "Em geral", icon: Settings, color: "from-blue-500 to-cyan-500" },
    { id: "pagamento", label: "Pagamento", icon: Palette, color: "from-emerald-500 to-teal-500" },
    { id: "localidade", label: "Localidade", icon: Globe, color: "from-violet-500 to-purple-500" },
    { id: "adicional", label: "Adicional", icon: Zap, color: "from-amber-500 to-orange-500" },
    { id: "hardware", label: "Hardware", icon: HardDrive, color: "from-pink-500 to-rose-500" },
    { id: "localizacao", label: "Localização", icon: MapPin, color: "from-indigo-500 to-blue-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="p-2 hover:bg-slate-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Criar predefinição de quiosque</h1>
                <p className="text-slate-600 text-lg mt-1">Configure uma nova predefinição para quiosques</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => router.back()} className="border-slate-200">
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleCreateAndAddAnother}
                disabled={loading}
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar e adicionar outro
              </Button>
              <Button
                type="submit"
                form="predefinicao-form"
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Salvando..." : "Criar predefinição"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Basic Info Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form id="predefinicao-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-sm font-semibold text-slate-700">
                    Nome da Predefinição
                  </Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Digite o nome da predefinição"
                    className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="departamento" className="text-sm font-semibold text-slate-700">
                    Departamento *
                  </Label>
                  <Select
                    value={formData.departamento}
                    onValueChange={(value) => setFormData({ ...formData, departamento: value })}
                  >
                    <SelectTrigger className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                      <SelectValue placeholder="Selecione um departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {departamentos.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Configuration Tabs */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Configurações</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Custom Tab List */}
              <div className="px-6 pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {tabConfig.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative p-4 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r " + tab.color + " text-white shadow-lg transform scale-105"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isActive ? "bg-white/20" : "bg-white"
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-600"}`} />
                          </div>
                          <span className="text-sm font-medium text-center">{tab.label}</span>
                        </div>
                        {isActive && (
                          <div className="absolute inset-0 rounded-xl ring-2 ring-white/50 ring-offset-2 ring-offset-transparent" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Tab Contents */}
              <div className="p-6">
                <TabsContent value="geral" className="mt-0">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                    <TabGeral
                      data={formData.configuracaoGeral}
                      departamentos={departamentos}
                      onChange={(data) => setFormData({ ...formData, configuracaoGeral: data })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="pagamento" className="mt-0">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                    <TabPagamento
                      data={formData.configuracaoPagamento}
                      onChange={(data) => setFormData({ ...formData, configuracaoPagamento: data })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="localidade" className="mt-0">
                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6">
                    <TabLocalidade
                      data={formData.configuracaoLocalidade}
                      onChange={(data) => setFormData({ ...formData, configuracaoLocalidade: data })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="adicional" className="mt-0">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
                    <TabAdicional
                      data={formData.configuracaoAvancada}
                      onChange={(data) => setFormData({ ...formData, configuracaoAvancada: data })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="hardware" className="mt-0">
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6">
                    <TabHardware
                      data={formData.configuracaoHardware}
                      onChange={(data) => setFormData({ ...formData, configuracaoHardware: data })}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="localizacao" className="mt-0">
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                    <TabLocalizacao
                      data={formData.configuracaoLocalizacao}
                      onChange={(data) => setFormData({ ...formData, configuracaoLocalizacao: data })}
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
