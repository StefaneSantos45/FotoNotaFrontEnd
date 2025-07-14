"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, RefreshCw, Eye, Monitor, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useQuiosques } from "@/modules/listas/hooks/useQuiosques"
import { Quiosque } from "@/modules/listas/types"
import QuiosqueStatusIcons from "@/modules/listas/components/QuiosqueStatusIcons"

export default function QuiosquesPage() {
  const { quiosques, loading, fetchQuiosques } = useQuiosques()
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const filteredQuiosques = quiosques.filter(
    (quiosque) =>
      quiosque.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiosque.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetails = (quiosque: Quiosque) => {
    router.push(`/quiosques/lista/${quiosque.id}`)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchQuiosques()
    setIsRefreshing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-lg text-slate-600">Carregando quiosques...</div>
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
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-800">Quiosques</h1>
                  <p className="text-slate-600 text-lg mt-1">Gerencie e monitore seus quiosques</p>
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
            <Button
              onClick={() => alert("Funcionalidade de adicionar quiosque")}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Quiosque
            </Button>
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
                placeholder="Procurar quiosques..."
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
            {filteredQuiosques.length} de {quiosques.length} quiosques encontrados
          </div>
        </div>

        {/* Quiosques Table */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
              <Monitor className="w-5 h-5 mr-2" />
              Lista de Quiosques
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      ID DO QUIOSQUE
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      STATUS
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      QUANTIA
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      PAPEL
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      FUNIL
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      DEPARTAMENTO
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      PREDEFINIÇÃO DE LAYOUT
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      PREDEFINIÇÃO DE ANÚNCIO
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      PREDEFINIÇÃO DOCPHOTO
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider text-right">
                      AÇÕES
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuiosques.map((quiosque) => (
                    <TableRow key={quiosque.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="font-medium text-pink-600">{quiosque.nome}</TableCell>
                      <TableCell>
                        <div className="flex flex-col items-start">
                          <QuiosqueStatusIcons status={quiosque.status} />
                          {quiosque.monitorMemoria && (
                            <span className="text-xs text-slate-500 mt-1">
                              Monitor de memória: {quiosque.monitorMemoria.value} ({quiosque.monitorMemoria.timeAgo})
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">{quiosque.quantidade} BRL</TableCell>
                      <TableCell className="text-slate-600">{quiosque.papel}</TableCell>
                      <TableCell className="text-slate-600">{quiosque.funil}</TableCell>
                      <TableCell className="text-slate-600">{quiosque.departamento}</TableCell>
                      <TableCell className="text-slate-600">{quiosque.predefinicaoLayout}</TableCell>
                      <TableCell className="text-slate-600">{quiosque.predefinicaoAnuncio}</TableCell>
                      <TableCell className="text-slate-600">{quiosque.predefinicaoDocPhoto}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="border-slate-200 bg-transparent">
                              Ações
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(quiosque)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Quiosque de congelamento")}>
                              Quiosque de congelamento
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Quiosque Un Freeze")}>
                              Quiosque Un Freeze
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Quiosque de reinicialização")}>
                              Quiosque de reinicialização
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Adicionar quiosque de cookies do Instagram")}>
                              Adicionar quiosque de cookies do Instagram
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Menu de serviço aberto")}>
                              Menu de serviço aberto
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Baixar Estatísticas do Quiosque de Detalhes")}>
                              Baixar Estatísticas do Quiosque de Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Conectar ao Team Viewer")}>
                              Conectar ao Team Viewer
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert("Conectar-se a qualquer mesa")}>
                              Conectar-se a qualquer mesa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredQuiosques.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum quiosque encontrado</h3>
                <p className="text-gray-500">Nenhum quiosque corresponde aos critérios de busca.</p>
              </div>
            )}

            {/* Pagination */}
            {filteredQuiosques.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
                <div className="text-sm text-slate-600">1-4 de 4</div>
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

      </div>
    </div>
  )
}
