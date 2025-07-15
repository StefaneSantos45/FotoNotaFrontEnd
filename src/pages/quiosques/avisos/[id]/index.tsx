"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Bell, Calendar, AlertTriangle, Info, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAvisos } from "../../../../modules/avisos/hooks/useAvisos"
import NivelBadge from "../../../../modules/avisos/components/NivelBadge"
import type { Aviso } from "../../../../modules/avisos/types"

// 👇 evita erro de build por rota dinâmica
export const dynamic = "force-dynamic"

export default function AvisoDetalhesPage() {
  const router = useRouter()
  const params = useParams()
  const { getAvisoById } = useAvisos()
  const [aviso, setAviso] = useState<Aviso | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAviso = async () => {
      const avisoId = params?.id?.toString()
      if (avisoId) {
        try {
          const avisoData = await getAvisoById(avisoId)
          setAviso(avisoData)
        } catch (error) {
          console.error("Erro ao carregar aviso:", error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchAviso()
  }, [params?.id, getAvisoById])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-lg text-slate-600">Carregando detalhes do aviso...</div>
      </div>
    )
  }

  if (!aviso) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Aviso não encontrado</h2>
          <p className="text-slate-600 mb-4">O aviso solicitado não foi encontrado.</p>
          <Button onClick={() => router.back()}>Voltar</Button>
        </div>
      </div>
    )
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "quiosque offline":
      case "printTimeError":
        return AlertTriangle
      case "quiosqueFreeze":
        return Info
      default:
        return Bell
    }
  }

  const TipoIcon = getTipoIcon(aviso.tipo)

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
                <h1 className="text-3xl font-bold text-slate-800">Detalhes do aviso: {aviso.tipo}</h1>
                <p className="text-slate-600 text-lg mt-1">Informações detalhadas sobre o aviso</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Main Details Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                <TipoIcon className="w-5 h-5 text-white" />
              </div>
              Informações do Aviso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between py-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-slate-500" />
                <span className="text-slate-600 font-medium">Quiosque</span>
              </div>
              <span className="text-pink-600 font-semibold text-lg">{aviso.quiosqueNome}</span>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <Info className="w-5 h-5 text-slate-500" />
                <span className="text-slate-600 font-medium">Sessão</span>
              </div>
              {aviso.sessao ? (
                <span className="text-pink-600 font-medium">{aviso.sessao}</span>
              ) : (
                <span className="text-slate-400">—</span>
              )}
            </div>

            <div className="flex items-center justify-between py-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <TipoIcon className="w-5 h-5 text-slate-500" />
                <span className="text-slate-600 font-medium">Tipo</span>
              </div>
              <span className="text-slate-800 font-medium">{aviso.tipo}</span>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-slate-500" />
                <span className="text-slate-600 font-medium">Nível</span>
              </div>
              <NivelBadge nivel={aviso.nivel} />
            </div>

            <div className="flex items-center justify-between py-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-slate-500" />
                <span className="text-slate-600 font-medium">Mensagem</span>
              </div>
              {aviso.mensagem ? (
                <span className="text-slate-800 font-medium">{aviso.mensagem}</span>
              ) : (
                <span className="text-slate-400">—</span>
              )}
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-slate-500" />
                <span className="text-slate-600 font-medium">Criado</span>
              </div>
              <span className="text-slate-800 font-medium">{aviso.criado}</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center">
          <Button onClick={() => router.back()} variant="outline" className="border-slate-200 bg-transparent">
            Voltar para Lista de Avisos
          </Button>
        </div>

        
      </div>
    </div>
  )
}
