"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Monitor,
  Camera,
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Search,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Download,
  Filter,
  FileText,
  FileSpreadsheet,
} from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AtividadeQuiosquesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1), // 1 de janeiro de 2024
    to: new Date(), // hoje
  })

  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: "todos",
    impressoesMin: "",
    impressoesMax: "",
    sessoesMin: "",
    sessoesMax: "",
    localizacao: "todas",
  })

  // Simulando dados de muitos quiosques
  const generateQuiosqueData = () => {
    const locations = [
      "Shopping Guararapes - Piso 2",
      "Shopping Tacaruna - Praça Central",
      "Shopping Recife - Área de Lazer",
      "Shopping RioMar - Entrada Principal",
      "Plaza Shopping - Food Court",
      "Shopping Boa Vista - Piso 1",
      "Shopping Paço Alfândega - Térreo",
      "Shopping Costa Dourada - Piso 2",
      "Shopping Camará - Praça de Eventos",
      "Shopping Ilha do Leite - Entrada Sul",
    ]

    const cities = [
      "Recife",
      "Olinda",
      "Jaboatão",
      "Caruaru",
      "Petrolina",
      "Garanhuns",
      "Vitória",
      "Cabo",
      "Paulista",
      "Igarassu",
    ]

    const data = []
    for (let i = 1; i <= 50; i++) {
      const locationIndex = (i - 1) % locations.length
      const cityIndex = (i - 1) % cities.length
      data.push({
        id: `${10199 + i}`,
        nome: `${cities[cityIndex]} ${Math.floor(i / 10) + 1}`,
        localizacao: locations[locationIndex],
        impressoHoje: Math.floor(Math.random() * 50),
        impressoOntem: Math.floor(Math.random() * 50),
        sessoesHoje: Math.floor(Math.random() * 80),
        sessoesOntem: Math.floor(Math.random() * 80),
        status: Math.random() > 0.3 ? "online" : "offline",
        ultimaAtividade: `${Math.floor(Math.random() * 24)} horas atrás`,
      })
    }
    return data
  }

  const quiosquesData = generateQuiosqueData()

  // Função para aplicar filtros avançados
  const applyFilters = (data: any[]) => {
    return data.filter((quiosque) => {
      // Filtro por status
      if (filters.status !== "todos" && quiosque.status !== filters.status) {
        return false
      }

      // Filtro por impressões mínimas
      if (filters.impressoesMin && quiosque.impressoHoje < Number.parseInt(filters.impressoesMin)) {
        return false
      }

      // Filtro por impressões máximas
      if (filters.impressoesMax && quiosque.impressoHoje > Number.parseInt(filters.impressoesMax)) {
        return false
      }

      // Filtro por sessões mínimas
      if (filters.sessoesMin && quiosque.sessoesHoje < Number.parseInt(filters.sessoesMin)) {
        return false
      }

      // Filtro por sessões máximas
      if (filters.sessoesMax && quiosque.sessoesHoje > Number.parseInt(filters.sessoesMax)) {
        return false
      }

      // Filtro por localização
      if (
        filters.localizacao !== "todas" &&
        !quiosque.localizacao.toLowerCase().includes(filters.localizacao.toLowerCase())
      ) {
        return false
      }

      return true
    })
  }

  // Aplicar pesquisa e filtros avançados
  const searchFilteredData = quiosquesData.filter(
    (quiosque) =>
      quiosque.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiosque.id.includes(searchTerm) ||
      quiosque.localizacao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredData = applyFilters(searchFilteredData)

  // Paginação
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  // Função para atualizar dados
  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simular chamada à API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    // Aqui você faria a chamada real para atualizar os dados
    console.log("Dados atualizados!")
  }

  // Função para exportar PDF
  const exportToPDF = () => {
    // Preparar dados para exportação
    const exportData = {
      titulo: "Relatório de Atividade de Quiosques",
      periodo: formatDateRange(),
      dataGeracao: format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR }),
      resumo: {
        totalQuiosques: filteredData.length,
        quiosquesOnline: filteredData.filter((q) => q.status === "online").length,
        totalImpressoes: filteredData.reduce((sum, q) => sum + q.impressoHoje, 0),
        totalSessoes: filteredData.reduce((sum, q) => sum + q.sessoesHoje, 0),
      },
      dados: filteredData,
    }

    // Aqui você implementaria a geração do PDF
    // Exemplo usando jsPDF ou similar
    console.log("Exportando para PDF:", exportData)

    // Simular download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `atividade-quiosques-${format(new Date(), "yyyy-MM-dd")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Função para exportar Excel
  const exportToExcel = () => {
    // Preparar dados para Excel
    const excelData = filteredData.map((quiosque) => ({
      ID: quiosque.id,
      Nome: quiosque.nome,
      Localização: quiosque.localizacao,
      Status: quiosque.status,
      "Impressões Hoje": quiosque.impressoHoje,
      "Impressões Ontem": quiosque.impressoOntem,
      "Variação Impressões": getTrendPercentage(quiosque.impressoHoje, quiosque.impressoOntem),
      "Sessões Hoje": quiosque.sessoesHoje,
      "Sessões Ontem": quiosque.sessoesOntem,
      "Variação Sessões": getTrendPercentage(quiosque.sessoesHoje, quiosque.sessoesOntem),
      "Última Atividade": quiosque.ultimaAtividade,
    }))

    // Aqui você implementaria a geração do Excel
    // Exemplo usando SheetJS ou similar
    console.log("Exportando para Excel:", excelData)

    // Simular download
    const csvContent = [
      Object.keys(excelData[0]).join(","),
      ...excelData.map((row) => Object.values(row).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `atividade-quiosques-${format(new Date(), "yyyy-MM-dd")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Online</Badge>
      case "offline":
        return <Badge variant="secondary">Offline</Badge>
      case "manutencao":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Manutenção</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getTrendIcon = (hoje: number, ontem: number) => {
    if (hoje > ontem) return <TrendingUp className="w-4 h-4 text-emerald-500" />
    if (hoje < ontem) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-slate-400" />
  }

  const getTrendPercentage = (hoje: number, ontem: number) => {
    if (ontem === 0) return hoje > 0 ? "+100%" : "0%"
    const percentage = ((hoje - ontem) / ontem) * 100
    return percentage > 0 ? `+${percentage.toFixed(1)}%` : `${percentage.toFixed(1)}%`
  }

  const getTrendColor = (hoje: number, ontem: number) => {
    if (hoje > ontem) return "text-emerald-600"
    if (hoje < ontem) return "text-red-600"
    return "text-slate-500"
  }

  const totalImpressoHoje = filteredData.reduce((sum, q) => sum + q.impressoHoje, 0)
  const totalSessoesHoje = filteredData.reduce((sum, q) => sum + q.sessoesHoje, 0)
  const quiosquesOnline = filteredData.filter((q) => q.status === "online").length

  const formatDateRange = () => {
    if (!dateRange?.from) return "Selecionar período"
    if (!dateRange.to) return format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
    return `${format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}`
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-4xl font-bold text-slate-800">Atividade de Quiosques</h1>
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-64 justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportToPDF}>
                  <FileText className="w-4 h-4 mr-2" />
                  Exportar PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToExcel}>
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Exportar Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-slate-600 text-lg mt-3">Monitoramento da atividade dos quiosques</p>
      </div>

      {/* Resumo geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <Monitor className="w-4 h-4 mr-2" />
              Quiosques Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{quiosquesOnline}</div>
            <p className="text-sm text-slate-500">de {filteredData.length} total</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <Camera className="w-4 h-4 mr-2" />
              Impressões no Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{totalImpressoHoje}</div>
            <p className="text-sm text-slate-500">fotos impressas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Sessões no Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{totalSessoesHoje}</div>
            <p className="text-sm text-slate-500">sessões ativas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Pesquisa */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar por ID, nome ou localização..."
              className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset para primeira página ao pesquisar
              }}
            />
          </div>
          <Button variant={showFilters ? "default" : "outline"} size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            Filtros {Object.values(filters).some((v) => v !== "todos" && v !== "todas" && v !== "") && "(Ativos)"}
          </Button>
        </div>
        <div className="text-sm text-slate-600">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredData.length)} de {filteredData.length} quiosques
        </div>
      </div>

      {/* Painel de Filtros Avançados */}
      {showFilters && (
        <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center justify-between">
              <span>Filtros Avançados</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilters({
                    status: "todos",
                    impressoesMin: "",
                    impressoesMax: "",
                    sessoesMin: "",
                    sessoesMax: "",
                    localizacao: "todas",
                  })
                  setCurrentPage(1)
                }}
              >
                Limpar Filtros
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Filtro por Status */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => {
                    setFilters((prev) => ({ ...prev, status: value }))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro por Impressões */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Impressões Hoje</label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Mín"
                    type="number"
                    value={filters.impressoesMin}
                    onChange={(e) => {
                      setFilters((prev) => ({ ...prev, impressoesMin: e.target.value }))
                      setCurrentPage(1)
                    }}
                    className="w-20"
                  />
                  <span className="text-slate-500 self-center">até</span>
                  <Input
                    placeholder="Máx"
                    type="number"
                    value={filters.impressoesMax}
                    onChange={(e) => {
                      setFilters((prev) => ({ ...prev, impressoesMax: e.target.value }))
                      setCurrentPage(1)
                    }}
                    className="w-20"
                  />
                </div>
              </div>

              {/* Filtro por Sessões */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Sessões Hoje</label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Mín"
                    type="number"
                    value={filters.sessoesMin}
                    onChange={(e) => {
                      setFilters((prev) => ({ ...prev, sessoesMin: e.target.value }))
                      setCurrentPage(1)
                    }}
                    className="w-20"
                  />
                  <span className="text-slate-500 self-center">até</span>
                  <Input
                    placeholder="Máx"
                    type="number"
                    value={filters.sessoesMax}
                    onChange={(e) => {
                      setFilters((prev) => ({ ...prev, sessoesMax: e.target.value }))
                      setCurrentPage(1)
                    }}
                    className="w-20"
                  />
                </div>
              </div>

              {/* Filtro por Localização */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Localização</label>
                <Select
                  value={filters.localizacao}
                  onValueChange={(value) => {
                    setFilters((prev) => ({ ...prev, localizacao: value }))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as Localizações</SelectItem>
                    <SelectItem value="shopping guararapes">Shopping Guararapes</SelectItem>
                    <SelectItem value="shopping tacaruna">Shopping Tacaruna</SelectItem>
                    <SelectItem value="shopping recife">Shopping Recife</SelectItem>
                    <SelectItem value="shopping riomar">Shopping RioMar</SelectItem>
                    <SelectItem value="plaza shopping">Plaza Shopping</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtros Rápidos */}
              <div className="md:col-span-2 lg:col-span-1">
                <label className="text-sm font-medium text-slate-700 mb-2 block">Filtros Rápidos</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, status: "offline" }))
                      setCurrentPage(1)
                    }}
                  >
                    Apenas Offline
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, impressoesMin: "10" }))
                      setCurrentPage(1)
                    }}
                  >
                    Alta Atividade
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, impressoesMax: "5", sessoesMax: "10" }))
                      setCurrentPage(1)
                    }}
                  >
                    Baixa Performance
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabela de Quiosques */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">Lista de Quiosques</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="font-semibold text-slate-700">Quiosque</TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Impresso Hoje</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Impresso Ontem</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Sessões Hoje</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Sessões Ontem</TableHead>
                <TableHead className="font-semibold text-slate-700">Última Atividade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((quiosque) => (
                <TableRow key={quiosque.id} className="border-slate-200 hover:bg-slate-50/50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Monitor className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">
                          {quiosque.id} ({quiosque.nome})
                        </div>
                        <div className="text-sm text-slate-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {quiosque.localizacao}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(quiosque.status)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-semibold text-slate-800">{quiosque.impressoHoje}</span>
                      {getTrendIcon(quiosque.impressoHoje, quiosque.impressoOntem)}
                    </div>
                    <div className={`text-xs ${getTrendColor(quiosque.impressoHoje, quiosque.impressoOntem)}`}>
                      {getTrendPercentage(quiosque.impressoHoje, quiosque.impressoOntem)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-slate-600">{quiosque.impressoOntem}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-semibold text-slate-800">{quiosque.sessoesHoje}</span>
                      {getTrendIcon(quiosque.sessoesHoje, quiosque.sessoesOntem)}
                    </div>
                    <div className={`text-xs ${getTrendColor(quiosque.sessoesHoje, quiosque.sessoesOntem)}`}>
                      {getTrendPercentage(quiosque.sessoesHoje, quiosque.sessoesOntem)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-slate-600">{quiosque.sessoesOntem}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{quiosque.ultimaAtividade}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginação */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </Button>

          {/* Números das páginas */}
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
                  className="w-8 h-8 p-0"
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
          >
            Próxima
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
