"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  UserCheck,
  UserX,
  RefreshCw,
  Search,
  Download,
  Filter,
  FileText,
  FileSpreadsheet,
  Eye,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const usuarios = [
    {
      id: 175,
      nome: "WTotem",
      email: "wilson.hora@wtotem.com.br",
      departamento: "FotoNotaBR (Brasil)",
      avatar: "W",
      ativo: true,
      telefone: "(11) 99999-9999",
      criadoEm: "15/01/2024",
      roles: ["Administrador"],
    },
    {
      id: 165,
      nome: "TESTE",
      email: "contato@fotonotabrasil.com.br",
      departamento: "FotoNotaBR (Brasil)",
      avatar: "T",
      ativo: false,
      telefone: "(11) 88888-8888",
      criadoEm: "10/01/2024",
      roles: ["Operador"],
    },
  ]

  const filteredUsuarios = usuarios.filter(
    (user) =>
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.departamento.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginação
  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredUsuarios.slice(startIndex, endIndex)

  // Estatísticas
  const totalUsers = usuarios.length
  const activeUsers = usuarios.filter((u) => u.ativo).length
  const inactiveUsers = usuarios.filter((u) => !u.ativo).length
  const totalRoles = new Set(usuarios.flatMap((u) => u.roles)).size

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleExportPDF = () => {
    console.log("Exportando para PDF...")
  }

  const handleExportExcel = () => {
    console.log("Exportando para Excel...")
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-4xl font-bold text-slate-800">Usuários</h1>
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
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportPDF}>
                  <FileText className="w-4 h-4 mr-2" />
                  Exportar PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportExcel}>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Exportar Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-slate-600 text-lg mt-3">Gerencie os usuários do sistema</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Total de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{totalUsers}</div>
            <p className="text-sm text-slate-500">usuários cadastrados</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <UserCheck className="w-4 h-4 mr-2" />
              Usuários Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{activeUsers}</div>
            <p className="text-sm text-slate-500">em atividade</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <UserX className="w-4 h-4 mr-2" />
              Usuários Inativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{inactiveUsers}</div>
            <p className="text-sm text-slate-500">desativados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Pesquisa */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar por usuário..."
              className="pl-10 h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
          <Button variant="outline" size="default" className="h-11">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Link href="/organizacao/usuarios/criar">
            <Button className="bg-blue-600 hover:bg-blue-700 h-11">
              <Plus className="w-4 h-4 mr-2" />
              Criar usuário
            </Button>
          </Link>
        </div>
        <div className="text-sm text-slate-600 font-medium">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredUsuarios.length)} de {filteredUsuarios.length}{" "}
          registros
        </div>
      </div>

      {/* Tabela de Usuários */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="font-semibold text-slate-700">Usuário</TableHead>
                <TableHead className="font-semibold text-slate-700">Email</TableHead>
                <TableHead className="font-semibold text-slate-700">Departamento</TableHead>
                <TableHead className="font-semibold text-slate-700">Funções</TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((usuario) => (
                <TableRow key={usuario.id} className="border-slate-200 hover:bg-slate-50/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">{usuario.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-800">{usuario.nome}</div>
                        <div className="text-sm text-slate-500">ID: {usuario.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-slate-600">{usuario.email}</div>
                      {usuario.telefone && <div className="text-sm text-slate-500">{usuario.telefone}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-600">{usuario.departamento}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {usuario.roles.map((role, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={usuario.ativo ? "default" : "secondary"}
                      className={usuario.ativo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {usuario.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <Link href={`/organizacao/usuarios/${usuario.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                          title="Ver detalhes"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-slate-600"
            >
              Anterior
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 p-0 ${
                      currentPage === pageNum
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="text-slate-600"
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
