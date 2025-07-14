"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Plus, Download, Search, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PermissionGuard, ProtectedRoute } from "@/modules/auth/components"
import { gruposData, moldurasData } from "@/modules/grupos/data/gruposData"

export default function DetalhesGrupoPage() {
  const params = useParams()
  const router = useRouter()
  const grupoId = Number.parseInt(params.id as string)

  const [searchTerm, setSearchTerm] = useState("")

  const grupo = gruposData.find((g) => g.id === grupoId)
  const molduras = moldurasData.filter((m) => m.grupoId === grupoId)

  const filteredMolduras = molduras.filter(
    (moldura) =>
      moldura.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moldura.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!grupo) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Grupo não encontrado</h1>
            <p className="text-slate-600 mb-4">O grupo solicitado não existe.</p>
            <Button onClick={() => router.push("/grupos")}>Voltar para Grupos</Button>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-slate-50">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-slate-100 rounded-full"
                    onClick={() => router.push("/grupos")}
                  >
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                  </Button>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${grupo.cor} rounded-xl flex items-center justify-center shadow-sm`}>
                      <span className="text-2xl">{grupo.icone}</span>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-slate-800">{grupo.nome}</h1>
                      <p className="text-slate-600">{grupo.descricao}</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <PermissionGuard resource="frames" action="create">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Moldura
                    </Button>
                  </PermissionGuard>
                  <PermissionGuard resource="groups" action="edit">
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Grupo
                    </Button>
                  </PermissionGuard>
                </div>
              </div>
            </div>

            {/* Estatísticas do Grupo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">Total de Molduras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">{molduras.length}</div>
                  <p className="text-sm text-slate-500">molduras disponíveis</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">Molduras Ativas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">{molduras.filter((m) => m.ativa).length}</div>
                  <p className="text-sm text-slate-500">em uso</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">Total Downloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">
                    {molduras.reduce((acc, m) => acc + m.downloads, 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-slate-500">downloads realizados</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">Preço Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">
                    {formatCurrency(molduras.reduce((acc, m) => acc + m.preco, 0) / molduras.length || 0)}
                  </div>
                  <p className="text-sm text-slate-500">por moldura</p>
                </CardContent>
              </Card>
            </div>

            {/* Controles */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Pesquisar molduras..."
                    className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Exportar PDF</DropdownMenuItem>
                  <DropdownMenuItem>Exportar Excel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Tabela de Molduras */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800">
                  Molduras do Grupo ({filteredMolduras.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {filteredMolduras.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200">
                        <TableHead className="font-semibold text-slate-700">Preview</TableHead>
                        <TableHead className="font-semibold text-slate-700">Nome</TableHead>
                        <TableHead className="font-semibold text-slate-700">Categoria</TableHead>
                        <TableHead className="font-semibold text-slate-700">Tamanho</TableHead>
                        <TableHead className="font-semibold text-slate-700">Preço</TableHead>
                        <TableHead className="font-semibold text-slate-700">Downloads</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        <TableHead className="font-semibold text-slate-700 text-center">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMolduras.map((moldura) => (
                        <TableRow key={moldura.id} className="border-slate-200 hover:bg-slate-50/50">
                          <TableCell>
                            <div className="w-16 h-12 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                              <img
                                src={moldura.preview || "/placeholder.svg"}
                                alt={moldura.nome}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold text-slate-800">{moldura.nome}</div>
                            <div className="text-sm text-slate-500">
                              Criada em {new Date(moldura.dataCriacao).toLocaleDateString("pt-BR")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-slate-600">
                              {moldura.categoria}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold text-slate-800">{moldura.tamanho}cm</div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div
                                className={`font-semibold ${moldura.promocao ? "text-slate-400 line-through text-sm" : "text-green-600"}`}
                              >
                                {formatCurrency(moldura.preco)}
                              </div>
                              {moldura.promocao && moldura.precoPromocao && (
                                <div className="font-semibold text-red-600">
                                  {formatCurrency(moldura.precoPromocao)}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold text-slate-800">{moldura.downloads.toLocaleString()}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={moldura.ativa ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                              >
                                {moldura.ativa ? "Ativa" : "Inativa"}
                              </Badge>
                              {moldura.promocao && <Badge className="bg-orange-100 text-orange-800">Promoção</Badge>}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Button variant="ghost" size="sm" title="Ver detalhes">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <PermissionGuard resource="frames" action="edit">
                                <Button variant="ghost" size="sm" title="Editar moldura">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </PermissionGuard>
                              <PermissionGuard resource="frames" action="delete">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  title="Excluir moldura"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </PermissionGuard>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">{grupo.icone}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">
                      {searchTerm ? "Nenhuma moldura encontrada" : "Nenhuma moldura neste grupo"}
                    </h3>
                    <p className="text-slate-500 mb-4">
                      {searchTerm
                        ? "Tente ajustar sua pesquisa"
                        : "Adicione molduras para começar a organizar este grupo"}
                    </p>
                    {!searchTerm && (
                      <PermissionGuard resource="frames" action="create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Primeira Moldura
                        </Button>
                      </PermissionGuard>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
