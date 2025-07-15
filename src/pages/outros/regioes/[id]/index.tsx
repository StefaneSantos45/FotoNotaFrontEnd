"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { regioesMock } from "../../../../../data/regioes-data"
import type { Regiao } from "../../../../../types/regioes"

export default function DetalhesRegiaoPage() {
  const params = useParams()
  const [regiao, setRegiao] = useState<Regiao | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verifica se params.id é string válida
    if (!params?.id || typeof params.id !== "string") {
      setLoading(false)
      setRegiao(null)
      return
    }

    const regiaoId = Number.parseInt(params.id)

    const foundRegiao = regioesMock.find((r) => r.id === regiaoId) || null
    setRegiao(foundRegiao)
    setLoading(false)
  }, [params?.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-slate-600">Carregando detalhes da região...</div>
      </div>
    )
  }

  if (!regiao) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Região não encontrada</h1>
          <p className="text-slate-600 mb-4">A região solicitada não existe.</p>
          <Link href="/outros/regioes">
            <Button>Voltar para Regiões</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/outros/regioes">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-100 rounded-full">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-slate-800">Detalhes da região: {regiao.nome}</h1>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        </div>

        {/* Detalhes da Região */}
        <Card className="border-0 shadow-sm bg-white mb-6">
          <CardContent className="p-6">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">EU IA</span>
                <span className="text-slate-800 font-medium">{regiao.id}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Código</span>
                <span className="text-slate-800 font-medium">{regiao.codigo}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Nome</span>
                <span className="text-slate-800 font-medium">{regiao.nome}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Nome da moeda</span>
                <span className="text-slate-800 font-medium">{regiao.nomeMoeda}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Código da moeda</span>
                <span className="text-slate-800 font-medium">{regiao.codigoMoeda}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Moeda Str</span>
                <span className="text-slate-800 font-medium">{regiao.moedaStr}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Taxa de câmbio</span>
                <span className="text-slate-800 font-medium">{regiao.taxaCambio}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aceitando Notas */}
        <Card className="border-0 shadow-sm bg-white mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-4">Aceitando notas</h3>

            {regiao.aceitandoNotas.length > 0 ? (
              <div className="space-y-6">
                {regiao.aceitandoNotas.map((nota) => (
                  <div key={nota.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-pink-600 font-medium">#{nota.numero}</span>
                      <span className="text-slate-800 font-medium">Nota de banco</span>
                    </div>

                    <div className="ml-6 space-y-2">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">Nome</span>
                        <span className="text-blue-600 font-medium">{nota.nome}</span>
                      </div>

                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">Valor</span>
                        <span className="text-blue-600 font-medium">{nota.valor.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-blue-600">Nenhuma nota cadastrada</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Aceitando Moedas */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-4">Aceitando moedas</h3>

            {regiao.aceitandoMoedas.length > 0 ? (
              <div className="space-y-6">
                {regiao.aceitandoMoedas.map((moeda) => (
                  <div key={moeda.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-pink-600 font-medium">#{moeda.numero}</span>
                      <span className="text-slate-800 font-medium">Moeda</span>
                    </div>

                    <div className="ml-6 space-y-2">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">Nome</span>
                        <span className="text-blue-600 font-medium">{moeda.nome}</span>
                      </div>

                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">Valor</span>
                        <span className="text-blue-600 font-medium">{moeda.valor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <span className="text-2xl">—</span>
                <p className="mt-2 text-blue-600">Nenhuma moeda cadastrada</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
