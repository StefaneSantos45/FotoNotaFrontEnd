"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Building2,
  Globe,
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
import { Department } from "@/modules/departamentos/types/departments-full"
import { departmentsFullMock } from "@/modules/departamentos/data/departments-full-data"

export default function DepartamentosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [departments] = useState<Department[]>(departmentsFullMock)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.timezone.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginação
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredDepartments.slice(startIndex, endIndex)

  // Estatísticas
  const totalDepartments = departments.length
  const uniqueCountries = new Set(departments.map((d) => d.country)).size
  const totalPromoCodes = departments.reduce((acc, dept) => acc + dept.promoCodesList.length, 0)
  const activeDepartments = departments.filter((d) => d.active).length

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
      {/* Todo o conteúdo existente permanece igual */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-4xl font-bold text-slate-800">Departamentos</h1>
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
        <p className="text-slate-600 text-lg mt-3">Gerencie os departamentos do sistema</p>
      </div>

      {/* Resto do conteúdo permanece igual */}
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Total de Departamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{totalDepartments}</div>
            <p className="text-sm text-slate-500">departamentos</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Países Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{uniqueCountries}</div>
            <p className="text-sm text-slate-500">países diferentes</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Códigos Promocionais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{totalPromoCodes}</div>
            <p className="text-sm text-slate-500">códigos ativos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Pesquisa */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar por departamento..."
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
          <Link href="/organizacao/departamentos/criar">
            <Button className="bg-blue-600 hover:bg-blue-700 h-11">
              <Plus className="w-4 h-4 mr-2" />
              Criar departamento
            </Button>
          </Link>
        </div>
        <div className="text-sm text-slate-600 font-medium">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredDepartments.length)} de {filteredDepartments.length}{" "}
          registros
        </div>
      </div>

      {/* Tabela de Departamentos */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">Lista de Departamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="font-semibold text-slate-700">Departamento</TableHead>
                <TableHead className="font-semibold text-slate-700">País</TableHead>
                <TableHead className="font-semibold text-slate-700">Fuso Horário</TableHead>
                <TableHead className="font-semibold text-slate-700">Horário de Corte</TableHead>
                <TableHead className="font-semibold text-slate-700">Códigos Promo</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((department) => (
                <TableRow key={department.id} className="border-slate-200 hover:bg-slate-50/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{department.name}</div>
                        <div className="text-sm text-slate-500">ID: {department.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-600">{department.country}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-600">{department.timezone}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-600">{department.cutoffTime}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-600">{department.promoCodesList.length}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <Link href={`/organizacao/departamentos/${department.id}`}>
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
