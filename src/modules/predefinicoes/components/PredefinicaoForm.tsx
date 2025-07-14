"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TabGeral from "./TabGeral"
import TabPagamento from "./TabPagamento"
import TabLocalizacao from "./TabLocalizacao"
import type { PredefinicaoQuiosque, PredefinicaoFormData, Departamento } from "../types"

interface PredefinicaoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  predefinicao?: PredefinicaoQuiosque | null
  departamentos: Departamento[]
  onSubmit: (data: PredefinicaoFormData) => Promise<void>
}

export default function PredefinicaoForm({
  open,
  onOpenChange,
  predefinicao,
  departamentos,
  onSubmit,
}: PredefinicaoFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<PredefinicaoFormData>({
    nome: predefinicao?.nome || "",
    departamento: predefinicao?.departamento || "",
    configuracaoGeral: predefinicao?.configuracaoGeral || {
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
    configuracaoHardware: predefinicao?.configuracaoHardware || {
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
    configuracaoPagamento: predefinicao?.configuracaoPagamento || {
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
    configuracaoLocalizacao: predefinicao?.configuracaoLocalizacao || {
      usarHorarioFuncionamento: false,
      horarioFuncionamento: [],
    },
    configuracaoLocalidade: predefinicao?.configuracaoLocalidade || {
      usarLocalidades: false,
      localidadePadrao: "",
      locais: [],
    },
    configuracaoAvancada: predefinicao?.configuracaoAvancada || {
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
      await onSubmit(formData)
      onOpenChange(false)
    } catch (error) {
      console.error("Erro ao salvar predefinição:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {predefinicao ? "Editar predefinição de quiosque" : "Criar predefinição de quiosque"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Nome"
                  required
                />
              </div>
              <div>
                <Label htmlFor="departamento">Departamento *</Label>
                <Select
                  value={formData.departamento}
                  onValueChange={(value) => setFormData({ ...formData, departamento: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="—" />
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

            <div>
              <h3 className="text-lg font-medium mb-4">Contexto</h3>
              <Tabs defaultValue="geral" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="geral">Em geral</TabsTrigger>
                  <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
                  <TabsTrigger value="localidade">Localidade</TabsTrigger>
                  <TabsTrigger value="adicional">Adicional</TabsTrigger>
                  <TabsTrigger value="hardware">Hardware</TabsTrigger>
                  <TabsTrigger value="localizacao">Localização</TabsTrigger>
                </TabsList>

                <TabsContent value="geral" className="mt-6">
                  <TabGeral
                    data={formData.configuracaoGeral}
                    departamentos={departamentos}
                    onChange={(data) => setFormData({ ...formData, configuracaoGeral: data })}
                  />
                </TabsContent>

                <TabsContent value="pagamento" className="mt-6">
                  <TabPagamento
                    data={formData.configuracaoPagamento}
                    onChange={(data) => setFormData({ ...formData, configuracaoPagamento: data })}
                  />
                </TabsContent>

                <TabsContent value="localidade" className="mt-6">
                  <div className="text-center py-8 text-gray-500">Configurações de localidade</div>
                </TabsContent>

                <TabsContent value="adicional" className="mt-6">
                  <div className="text-center py-8 text-gray-500">Configurações adicionais</div>
                </TabsContent>

                <TabsContent value="hardware" className="mt-6">
                  <div className="text-center py-8 text-gray-500">Configurações de hardware</div>
                </TabsContent>

                <TabsContent value="localizacao" className="mt-6">
                  <TabLocalizacao
                    data={formData.configuracaoLocalizacao}
                    onChange={(data) => setFormData({ ...formData, configuracaoLocalizacao: data })}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <DialogFooter className="mt-8 gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="button"  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg">
              Criar e adicionar outro
            </Button>
            <Button type="submit" disabled={loading}  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg">
              {loading ? "Salvando..." : "Criar predefinição de quiosque"}
            </Button>
            
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
