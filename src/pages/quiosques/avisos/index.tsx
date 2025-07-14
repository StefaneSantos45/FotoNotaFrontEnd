"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Eye, Trash2, RefreshCw, Bell, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAvisos } from "../../../modules/avisos/hooks/useAvisos"
import NivelBadge from "../../../modules/avisos/components/NivelBadge"
import type { Aviso } from "../../../modules/avisos/types"

export default function AvisosPage() {
  const { avisos, loading, deleteAviso, marcarComoLido } = useAvisos()
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const filteredAvisos = avisos.filter(
    (aviso) =>
      aviso.quiosqueNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aviso.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (aviso.sessao && aviso.sessao.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleViewDetails = async (aviso: Aviso) => {
    if (!aviso.lido) {
      await marcarComoLido(aviso.id)
    }
    router.push(`/quiosques/avisos/${aviso.id}`)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este aviso?")) {
      await deleteAviso(id)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const avisosNaoLidos = avisos.filter((aviso) => !aviso.lido).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-lg text-slate-600">Carregando avisos...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-800">Avisos</h1>
                  <p className="text-slate-600 text-lg mt-1">Monitore alertas e notificações dos quiosques</p>
                </div>
              </div>
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
            {avisosNaoLidos > 0 && (
              <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-medium">{avisosNaoLidos} avisos não lidos</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Procurar avisos..."
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
          <div className="text-sm text-slate-600">
            {filteredAvisos.length} de {avisos.length} avisos
          </div>
        </div>

        {/* Avisos Table */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Lista de Avisos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      QUIOSQUE
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      SESSÃO
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      TIPO
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      NÍVEL
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      CRIADO
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider text-right">
                      AÇÕES
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAvisos.map((aviso) => (
                    <TableRow
                      key={aviso.id}
                      className={`border-slate-100 hover:bg-slate-50/50 transition-colors ${
                        !aviso.lido ? "bg-blue-50/30" : ""
                      }`}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span className="text-pink-600 font-semibold">{aviso.quiosqueNome}</span>
                          {!aviso.lido && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {aviso.sessao ? (
                          <span className="text-pink-600 font-medium">{aviso.sessao}</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-slate-700 font-medium">{aviso.tipo}</span>
                      </TableCell>
                      <TableCell>
                        <NivelBadge nivel={aviso.nivel} />
                      </TableCell>
                      <TableCell className="text-slate-600">{aviso.criado}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(aviso)}
                            className="border-slate-200 hover:border-blue-300 hover:text-blue-600"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(aviso.id)}
                            className="border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAvisos.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum aviso encontrado</h3>
                <p className="text-gray-500">Não há avisos que correspondam aos critérios de busca.</p>
              </div>
            )}

            {/* Pagination */}
            {filteredAvisos.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
                <div className="text-sm text-slate-600">1-8 de 8</div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled className="border-slate-200 bg-transparent">
                    ‹
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-200 bg-blue-50 text-blue-600">
                    1
                  </Button>
                  <Button variant="outline" size="sm" disabled className="border-slate-200 bg-transparent">
                    ›
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 mt-12">FnPix · © 2020 - 2025 ·</div>
      </div>
    </div>
  )
}
