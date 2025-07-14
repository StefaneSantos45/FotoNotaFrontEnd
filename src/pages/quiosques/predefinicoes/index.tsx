"use client"

import { useState } from "react"
import { Search, Filter, Plus, Settings, RefreshCw, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { usePredefinicoes } from "@/modules/predefinicoes/hooks/usePredefinicoes"
import { PredefinicaoQuiosque } from "@/modules/predefinicoes/types"
import EmptyState from "@/modules/predefinicoes/components/EmptyState"

export default function PredefinicoesPag() {
  const { predefinicoes, departamentos, loading, deletePredefinicao } = usePredefinicoes()
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const filteredPredefinicoes = predefinicoes.filter((predefinicao) =>
    predefinicao.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (predefinicao: PredefinicaoQuiosque) => {
    router.push(`/quiosques/predefinicoes/editar/${predefinicao.id}`)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta predefinição?")) {
      await deletePredefinicao(id)
    }
  }

  const handleCreateClick = () => {
    router.push("/quiosques/predefinicoes/criar")
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-lg text-slate-600">Carregando predefinições...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-4xl font-bold text-slate-800">Predefinições de quiosque</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 hover:bg-slate-100 rounded-full"
                title="Atualizar dados"
              >
                <RefreshCw className={`w-5 h-5 text-slate-600 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>
            </div>
            <Button
              onClick={handleCreateClick}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar predefinição de quiosque
            </Button>
          </div>
          <p className="text-slate-600 text-lg mt-3">Gerencie as configurações padrão dos quiosques</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Procurar predefinições..."
                className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="border-slate-200 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
          <div className="text-sm text-slate-600">{filteredPredefinicoes.length} predefinições encontradas</div>
        </div>

        {/* Content */}
        {filteredPredefinicoes.length === 0 ? (
          <EmptyState onCreateClick={handleCreateClick} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPredefinicoes.map((predefinicao) => (
              <Card
                key={predefinicao.id}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200 group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {predefinicao.nome}
                        </CardTitle>
                        <p className="text-sm text-slate-500">
                          {departamentos.find((d) => d.id === predefinicao.departamento)?.nome || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Criado em:</span>
                      <span className="font-medium text-slate-800">
                        {new Date(predefinicao.criadoEm).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Atualizado em:</span>
                      <span className="font-medium text-slate-800">
                        {new Date(predefinicao.atualizadoEm).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 pt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(predefinicao)}
                        className="flex-1 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-200 hover:border-blue-300 hover:text-blue-600 bg-transparent"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(predefinicao.id)}
                        className="border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
