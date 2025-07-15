"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Monitor, Play, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuiosques } from "@/modules/listas/hooks/useQuiosques"
import { Quiosque } from "@/modules/listas/types"
import QuiosqueDetailsTabs from "@/modules/listas/components/QuiosqueDetailsTabs"

export default function QuiosqueDetalhesPage() {
  const router = useRouter()
  const params = useParams()
  const { getQuiosqueById } = useQuiosques()
  const [quiosque, setQuiosque] = useState<Quiosque | null>(null)
  const [loading, setLoading] = useState(true)

  const id = typeof params?.id === "string" ? params.id : null

  useEffect(() => {
    const fetchQuiosque = async () => {
      if (!id) {
        setLoading(false)
        return
      }

      try {
        const quiosqueData = await getQuiosqueById(id)
        setQuiosque(quiosqueData)
      } catch (error) {
        console.error("Erro ao carregar quiosque:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuiosque()
  }, [id, getQuiosqueById])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-lg text-slate-600">Carregando detalhes do quiosque...</div>
      </div>
    )
  }

  if (!id || !quiosque) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Quiosque não encontrado</h2>
          <p className="text-slate-600 mb-4">O quiosque solicitado não foi encontrado ou o ID está inválido.</p>
          <Button onClick={() => router.push("/quiosques")}>Voltar</Button>
        </div>
      </div>
    )
  }

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
                <h1 className="text-3xl font-bold text-slate-800">Quiosque: {quiosque.nome}</h1>
                <p className="text-slate-600 text-lg mt-1">Detalhes e configurações do quiosque</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Select>
                <SelectTrigger className="w-[180px] bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="Selecione Ação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freeze">Quiosque de congelamento</SelectItem>
                  <SelectItem value="unfreeze">Quiosque Un Freeze</SelectItem>
                  <SelectItem value="reboot">Quiosque de reinicialização</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
                <Play className="w-4 h-4" />
              </Button>
              <Button
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg"
                onClick={() => alert("Editar quiosque")}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quiosque Basic Info */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
              <Monitor className="w-5 h-5 mr-2" />
              Informações do Quiosque
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">ID do Quiosque:</span>
              <span className="text-pink-600 font-semibold">{quiosque.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Nome:</span>
              <span className="text-slate-800">{quiosque.nome}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Departamento:</span>
              <span className="text-slate-800">{quiosque.departamento}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Quantidade:</span>
              <span className="text-slate-800">{quiosque.quantidade} BRL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Papel:</span>
              <span className="text-slate-800">{quiosque.papel}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Funil:</span>
              <span className="text-slate-800">{quiosque.funil}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Predefinição de Layout:</span>
              <span className="text-slate-800">{quiosque.predefinicaoLayout}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Predefinição de Anúncio:</span>
              <span className="text-slate-800">{quiosque.predefinicaoAnuncio}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Predefinição DocPhoto:</span>
              <span className="text-slate-800">{quiosque.predefinicaoDocPhoto}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Última Tela:</span>
              <span className="text-slate-800">{quiosque.ultimaTela || "—"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Quiosque Details Tabs */}
        <QuiosqueDetailsTabs quiosque={quiosque} />

        
      </div>
    </div>
  )
}
