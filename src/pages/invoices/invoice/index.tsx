"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Search,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  FileText,
  FileSpreadsheet,
  Printer,
  Users,
  Eye,
  BarChart3,
} from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function FaturamentoPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 10, 1), // Novembro 2023
    to: new Date(), // hoje
  })

  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    receitaMin: "",
    receitaMax: "",
    impressoesMin: "",
    impressoesMax: "",
    sessoesMin: "",
    sessoesMax: "",
    tipoReceita: "todas",
  })

  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Dados baseados na imagem fornecida, convertidos para BRL
  const faturamentoData = [
    {
      id: 1,
      mes: "Novembro de 2024",
      ano: 2024,
      mesNumero: 11,
      impressoes: 4,
      impressoesStat: 0,
      receita: 0.0,
      receitaStat: 0.0,
      receitaSemDinheiro: 0.0,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 0.0,
      receitaEmDinheiroStat: 0.0,
      sessoes: 3,
      sessoesStat: 0,
      sessoesImpressas: 0,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 2,
      mes: "Outubro de 2024",
      ano: 2024,
      mesNumero: 10,
      impressoes: 8,
      impressoesStat: 0,
      receita: 45.5,
      receitaStat: 0.0,
      receitaSemDinheiro: 25.5,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 20.0,
      receitaEmDinheiroStat: 0.0,
      sessoes: 12,
      sessoesStat: 0,
      sessoesImpressas: 6,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 3,
      mes: "Setembro de 2024",
      ano: 2024,
      mesNumero: 9,
      impressoes: 15,
      impressoesStat: 0,
      receita: 89.75,
      receitaStat: 0.0,
      receitaSemDinheiro: 60.25,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 29.5,
      receitaEmDinheiroStat: 0.0,
      sessoes: 25,
      sessoesStat: 0,
      sessoesImpressas: 12,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 4,
      mes: "Agosto de 2024",
      ano: 2024,
      mesNumero: 8,
      impressoes: 4,
      impressoesStat: 0,
      receita: 0.0,
      receitaStat: 0.0,
      receitaSemDinheiro: 0.0,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 0.0,
      receitaEmDinheiroStat: 0.0,
      sessoes: 2,
      sessoesStat: 0,
      sessoesImpressas: 0,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 5,
      mes: "Julho de 2024",
      ano: 2024,
      mesNumero: 7,
      impressoes: 22,
      impressoesStat: 0,
      receita: 134.8,
      receitaStat: 0.0,
      receitaSemDinheiro: 89.3,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 45.5,
      receitaEmDinheiroStat: 0.0,
      sessoes: 35,
      sessoesStat: 0,
      sessoesImpressas: 18,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 6,
      mes: "Junho de 2024",
      ano: 2024,
      mesNumero: 6,
      impressoes: 31,
      impressoesStat: 0,
      receita: 187.25,
      receitaStat: 0.0,
      receitaSemDinheiro: 125.75,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 61.5,
      receitaEmDinheiroStat: 0.0,
      sessoes: 48,
      sessoesStat: 0,
      sessoesImpressas: 25,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 7,
      mes: "Maio de 2024",
      ano: 2024,
      mesNumero: 5,
      impressoes: 18,
      impressoesStat: 0,
      receita: 108.9,
      receitaStat: 0.0,
      receitaSemDinheiro: 72.4,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 36.5,
      receitaEmDinheiroStat: 0.0,
      sessoes: 28,
      sessoesStat: 0,
      sessoesImpressas: 15,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 8,
      mes: "Abril de 2024",
      ano: 2024,
      mesNumero: 4,
      impressoes: 2,
      impressoesStat: 0,
      receita: 0.0,
      receitaStat: 0.0,
      receitaSemDinheiro: 0.0,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 0.0,
      receitaEmDinheiroStat: 0.0,
      sessoes: 2,
      sessoesStat: 0,
      sessoesImpressas: 0,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 9,
      mes: "Março de 2024",
      ano: 2024,
      mesNumero: 3,
      impressoes: 45,
      impressoesStat: 0,
      receita: 267.5,
      receitaStat: 0.0,
      receitaSemDinheiro: 178.25,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 89.25,
      receitaEmDinheiroStat: 0.0,
      sessoes: 68,
      sessoesStat: 0,
      sessoesImpressas: 35,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 10,
      mes: "Fevereiro de 2024",
      ano: 2024,
      mesNumero: 2,
      impressoes: 38,
      impressoesStat: 0,
      receita: 225.8,
      receitaStat: 0.0,
      receitaSemDinheiro: 150.3,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 75.5,
      receitaEmDinheiroStat: 0.0,
      sessoes: 58,
      sessoesStat: 0,
      sessoesImpressas: 30,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 11,
      mes: "Janeiro de 2024",
      ano: 2024,
      mesNumero: 1,
      impressoes: 868,
      impressoesStat: 0,
      receita: 8956.85, // Convertido de 1.681,11 euros
      receitaStat: 0.0,
      receitaSemDinheiro: 5967.25,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 2989.6,
      receitaEmDinheiroStat: 0.0,
      sessoes: 976,
      sessoesStat: 0,
      sessoesImpressas: 248,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 12,
      mes: "Dezembro de 2023",
      ano: 2023,
      mesNumero: 12,
      impressoes: 1196,
      impressoesStat: 0,
      receita: 12445.12, // Convertido de 2.336,21 euros
      receitaStat: 0.0,
      receitaSemDinheiro: 8296.75,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 4148.37,
      receitaEmDinheiroStat: 0.0,
      sessoes: 1531,
      sessoesStat: 0,
      sessoesImpressas: 361,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
    {
      id: 13,
      mes: "Novembro de 2023",
      ano: 2023,
      mesNumero: 11,
      impressoes: 916,
      impressoesStat: 0,
      receita: 9607.78, // Convertido de 1.801,46 euros
      receitaStat: 0.0,
      receitaSemDinheiro: 6405.19,
      receitaSemDinheiroStat: 0.0,
      receitaEmDinheiro: 3202.59,
      receitaEmDinheiroStat: 0.0,
      sessoes: 1173,
      sessoesStat: 0,
      sessoesImpressas: 270,
      sessoesImpressasStat: 0,
      // Breakdown por fonte - Impressões
      impressoInstagram: 4,
      impressoInstagramStat: 0,
      impressoFacebook: 0,
      impressoFacebookStat: 0,
      impressoTelefone: 0,
      impressoTelefoneStat: 0,
      fotosIdentificacao: 0,
      fotosIdentificacaoStat: 0,
      selfieImpressa: 0,
      selfieImpressaStat: 0,
      // Breakdown por fonte - Sessões
      sessaoInstagram: 1,
      sessaoInstagramStat: 0,
      sessaoFacebook: 0,
      sessaoFacebookStat: 0,
      sessaoTelefone: 0,
      sessaoTelefoneStat: 0,
      sessaoFotosId: 0,
      sessaoFotosIdStat: 0,
      sessaoSelfie: 0,
      sessaoSelfieStat: 0,
      carregarFotos: 0,
      carregarFotosStat: 0,
      // Detalhes da receita
      detalhesReceita: [{ chave: "BRL", valor: "0,00" }],
    },
  ]

  // Função para aplicar filtros
  const applyFilters = (data: any[]) => {
    return data.filter((item) => {
      // Filtro por receita mínima
      if (filters.receitaMin && item.receita < Number.parseFloat(filters.receitaMin)) {
        return false
      }

      // Filtro por receita máxima
      if (filters.receitaMax && item.receita > Number.parseFloat(filters.receitaMax)) {
        return false
      }

      // Filtro por impressões mínimas
      if (filters.impressoesMin && item.impressoes < Number.parseInt(filters.impressoesMin)) {
        return false
      }

      // Filtro por impressões máximas
      if (filters.impressoesMax && item.impressoes > Number.parseInt(filters.impressoesMax)) {
        return false
      }

      // Filtro por sessões mínimas
      if (filters.sessoesMin && item.sessoes < Number.parseInt(filters.sessoesMin)) {
        return false
      }

      // Filtro por sessões máximas
      if (filters.sessoesMax && item.sessoes > Number.parseInt(filters.sessoesMax)) {
        return false
      }

      // Filtro por tipo de receita
      if (filters.tipoReceita === "apenas-dinheiro" && item.receitaEmDinheiro === 0) {
        return false
      }
      if (filters.tipoReceita === "sem-dinheiro" && item.receitaSemDinheiro === 0) {
        return false
      }

      return true
    })
  }

  // Aplicar pesquisa e filtros
  const searchFilteredData = faturamentoData.filter((item) => item.mes.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredData = applyFilters(searchFilteredData)

  // Paginação
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  // Cálculos para os cards de resumo
  const totalReceita = filteredData.reduce((sum, item) => sum + item.receita, 0)
  const totalImpressoes = filteredData.reduce((sum, item) => sum + item.impressoes, 0)
  const totalSessoes = filteredData.reduce((sum, item) => sum + item.sessoes, 0)
  const totalSessoesImpressas = filteredData.reduce((sum, item) => sum + item.sessoesImpressas, 0)
  const taxaConversao = totalSessoes > 0 ? (totalSessoesImpressas / totalSessoes) * 100 : 0
  const receitaMedia = filteredData.length > 0 ? totalReceita / filteredData.length : 0

  // Função para atualizar dados
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    console.log("Dados atualizados!")
  }

  // Função para exportar PDF
  const exportToPDF = () => {
    const exportData = {
      titulo: "Relatório de Faturamento",
      periodo: formatDateRange(),
      dataGeracao: format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR }),
      resumo: {
        totalReceita: formatCurrency(totalReceita),
        totalImpressoes,
        totalSessoes,
        taxaConversao: `${taxaConversao.toFixed(1)}%`,
      },
      dados: filteredData,
    }

    console.log("Exportando para PDF:", exportData)

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `faturamento-${format(new Date(), "yyyy-MM-dd")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Função para exportar Excel
  const exportToExcel = () => {
    const excelData = filteredData.map((item) => ({
      Mês: item.mes,
      Impressões: item.impressoes,
      "Receita Total": formatCurrency(item.receita),
      "Receita sem Dinheiro": formatCurrency(item.receitaSemDinheiro),
      "Receita em Dinheiro": formatCurrency(item.receitaEmDinheiro),
      Sessões: item.sessoes,
      "Sessões Impressas": item.sessoesImpressas,
      "Taxa de Conversão": item.sessoes > 0 ? `${((item.sessoesImpressas / item.sessoes) * 100).toFixed(1)}%` : "0%",
    }))

    console.log("Exportando para Excel:", excelData)

    const csvContent = [
      Object.keys(excelData[0]).join(","),
      ...excelData.map((row) => Object.values(row).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `faturamento-${format(new Date(), "yyyy-MM-dd")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDateRange = () => {
    if (!dateRange?.from) return "Selecionar período"
    if (!dateRange.to) return format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
    return `${format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(dateRange.to, "dd/MM/yyyy", { locale: ptBR })}`
  }

  const getTrendIcon = (atual: number, anterior: number) => {
    if (atual > anterior) return <TrendingUp className="w-4 h-4 text-emerald-500" />
    if (atual < anterior) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-slate-400" />
  }

  const getTrendPercentage = (atual: number, anterior: number) => {
    if (anterior === 0) return atual > 0 ? "+100%" : "0%"
    const percentage = ((atual - anterior) / anterior) * 100
    return percentage > 0 ? `+${percentage.toFixed(1)}%` : `${percentage.toFixed(1)}%`
  }

  const getTrendColor = (atual: number, anterior: number) => {
    if (atual > anterior) return "text-emerald-600"
    if (atual < anterior) return "text-red-600"
    return "text-slate-500"
  }

  const handleViewDetails = (item: any) => {
    setSelectedItem(item)
    setShowDetailsModal(true)
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-4xl font-bold text-slate-800">Faturamento</h1>
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
        <p className="text-slate-600 text-lg mt-3">Análise detalhada da receita e performance financeira</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Receita Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{formatCurrency(totalReceita)}</div>
            <p className="text-sm text-slate-500">{filteredData.length} meses</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <Printer className="w-4 h-4 mr-2" />
              Total de Impressões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{totalImpressoes.toLocaleString()}</div>
            <p className="text-sm text-slate-500">fotos impressas</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Taxa de Conversão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{taxaConversao.toFixed(1)}%</div>
            <p className="text-sm text-slate-500">
              {totalSessoesImpressas} de {totalSessoes} sessões
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Receita Média
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{formatCurrency(receitaMedia)}</div>
            <p className="text-sm text-slate-500">por mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Pesquisa */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Pesquisar por mês..."
              className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
          <Button variant={showFilters ? "default" : "outline"} size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 mr-2" />
            Filtros {Object.values(filters).some((v) => v !== "todas" && v !== "") && "(Ativos)"}
          </Button>
        </div>
        <div className="text-sm text-slate-600">
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredData.length)} de {filteredData.length} registros
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
                    receitaMin: "",
                    receitaMax: "",
                    impressoesMin: "",
                    impressoesMax: "",
                    sessoesMin: "",
                    sessoesMax: "",
                    tipoReceita: "todas",
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
              {/* Filtro por Receita */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Receita (R$)</label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Mín"
                    type="number"
                    value={filters.receitaMin}
                    onChange={(e) => {
                      setFilters((prev) => ({ ...prev, receitaMin: e.target.value }))
                      setCurrentPage(1)
                    }}
                    className="w-24"
                  />
                  <span className="text-slate-500 self-center">até</span>
                  <Input
                    placeholder="Máx"
                    type="number"
                    value={filters.receitaMax}
                    onChange={(e) => {
                      setFilters((prev) => ({ ...prev, receitaMax: e.target.value }))
                      setCurrentPage(1)
                    }}
                    className="w-24"
                  />
                </div>
              </div>

              {/* Filtro por Impressões */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Impressões</label>
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
                <label className="text-sm font-medium text-slate-700 mb-2 block">Sessões</label>
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

              {/* Filtro por Tipo de Receita */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Tipo de Receita</label>
                <Select
                  value={filters.tipoReceita}
                  onValueChange={(value) => {
                    setFilters((prev) => ({ ...prev, tipoReceita: value }))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as Receitas</SelectItem>
                    <SelectItem value="apenas-dinheiro">Apenas Dinheiro</SelectItem>
                    <SelectItem value="sem-dinheiro">Sem Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtros Rápidos */}
              <div className="md:col-span-2 lg:col-span-2">
                <label className="text-sm font-medium text-slate-700 mb-2 block">Filtros Rápidos</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, receitaMin: "1000" }))
                      setCurrentPage(1)
                    }}
                  >
                    Alta Receita
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, impressoesMin: "100" }))
                      setCurrentPage(1)
                    }}
                  >
                    Muitas Impressões
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, receitaMax: "50" }))
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

      {/* Tabela de Faturamento */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">Histórico de Faturamento</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="font-semibold text-slate-700">Mês</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Impressões</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Receita Total</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Receita Digital</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Receita Dinheiro</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Sessões</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Taxa Conversão</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((item, index) => {
                const itemAnterior = currentData[index + 1]
                const taxaConversaoItem = item.sessoes > 0 ? (item.sessoesImpressas / item.sessoes) * 100 : 0

                return (
                  <TableRow key={item.id} className="border-slate-200 hover:bg-slate-50/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{item.mes}</div>
                          <div className="text-sm text-slate-500">{item.ano}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-semibold text-slate-800">{item.impressoes}</span>
                        {itemAnterior && getTrendIcon(item.impressoes, itemAnterior.impressoes)}
                      </div>
                      {itemAnterior && (
                        <div className={`text-xs ${getTrendColor(item.impressoes, itemAnterior.impressoes)}`}>
                          {getTrendPercentage(item.impressoes, itemAnterior.impressoes)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <span className="font-semibold text-slate-800">{formatCurrency(item.receita)}</span>
                        {itemAnterior && getTrendIcon(item.receita, itemAnterior.receita)}
                      </div>
                      {itemAnterior && (
                        <div className={`text-xs ${getTrendColor(item.receita, itemAnterior.receita)}`}>
                          {getTrendPercentage(item.receita, itemAnterior.receita)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-slate-600">{formatCurrency(item.receitaSemDinheiro)}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-slate-600">{formatCurrency(item.receitaEmDinheiro)}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="font-semibold text-slate-800">{item.sessoes}</span>
                        {itemAnterior && getTrendIcon(item.sessoes, itemAnterior.sessoes)}
                      </div>
                      <div className="text-xs text-slate-500">{item.sessoesImpressas} impressas</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <div
                          className={`text-sm font-semibold ${
                            taxaConversaoItem >= 50
                              ? "text-emerald-600"
                              : taxaConversaoItem >= 25
                                ? "text-amber-600"
                                : "text-red-600"
                          }`}
                        >
                          {taxaConversaoItem.toFixed(1)}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="ghost" size="sm" title="Ver detalhes" onClick={() => handleViewDetails(item)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Baixar estatísticas detalhadas">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginação */}
      {totalPages > 1 && (
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
      )}

      {/* Modal de Detalhes */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Detalhes de cobrança: {selectedItem?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6">
              {/* Informações Básicas */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Informações Básicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-slate-600">Mês</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedItem.mes}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-slate-600">Imprimir</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedItem.impressoes}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-slate-600">Imprimir (De Stat)</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedItem.impressoesStat}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Receitas */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Receitas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Receita</p>
                        <p className="text-lg font-semibold text-slate-800">{formatCurrency(selectedItem.receita)}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Receita sem dinheiro</p>
                        <p className="text-lg font-semibold text-slate-800">
                          {formatCurrency(selectedItem.receitaSemDinheiro)}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Receita em dinheiro</p>
                        <p className="text-lg font-semibold text-slate-800">
                          {formatCurrency(selectedItem.receitaEmDinheiro)}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Receita (de estatísticas)</p>
                        <p className="text-lg font-semibold text-slate-800">
                          {formatCurrency(selectedItem.receitaStat)}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Receita sem dinheiro (de Stat)</p>
                        <p className="text-lg font-semibold text-slate-800">
                          {formatCurrency(selectedItem.receitaSemDinheiroStat)}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Receita em dinheiro (do Estado)</p>
                        <p className="text-lg font-semibold text-slate-800">
                          {formatCurrency(selectedItem.receitaEmDinheiroStat)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sessões */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-violet-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Sessões
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-slate-600">Sessão</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedItem.sessoes}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-slate-600">Sessão (De Stat)</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedItem.sessoesStat}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-slate-600">Sessão Impressa</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedItem.sessoesImpressas}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-slate-600">Sessão impressa (do Stat)</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedItem.sessoesImpressasStat}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Impressões por Fonte */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-50 to-rose-50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                    <Printer className="w-5 h-5 mr-2" />
                    Impressões por Fonte
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">Impresso do Instagram</p>
                          <p className="text-lg font-semibold text-slate-800">{selectedItem.impressoInstagram}</p>
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">IG</span>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">Impresso do Facebook</p>
                          <p className="text-lg font-semibold text-slate-800">{selectedItem.impressoFacebook}</p>
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">FB</span>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">Impresso do telefone</p>
                          <p className="text-lg font-semibold text-slate-800">{selectedItem.impressoTelefone}</p>
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">📱</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Impresso do Instagram (do Stat)</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.impressoInstagramStat}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Impresso do Facebook (do Stat)</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.impressoFacebookStat}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Impresso do telefone (do Stat)</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.impressoTelefoneStat}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-slate-600">Fotos de identificação impressas</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedItem.fotosIdentificacao}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-slate-600">Fotos de identificação impressas (da Stat)</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedItem.fotosIdentificacaoStat}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-slate-600">Selfie impressa</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedItem.selfieImpressa}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm text-slate-600">Selfie impressa (da Stat)</p>
                      <p className="text-lg font-semibold text-slate-800">{selectedItem.selfieImpressaStat}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sessões por Fonte */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Sessões por Fonte
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Sessão Instagram</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.sessaoInstagram}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Sessão Facebook</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.sessaoFacebook}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Telefone de sessão</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.sessaoTelefone}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Foto de identificação da sessão</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.sessaoFotosId}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Sessão de Selfie</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.sessaoSelfie}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Carregar fotos</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.carregarFotos}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Sessão Instagram (De Stat)</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.sessaoInstagramStat}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Sessão Facebook (De Stat)</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.sessaoFacebookStat}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Telefone da sessão (do Stat)</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.sessaoTelefoneStat}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Foto de identificação da sessão (do Stat)</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.sessaoFotosIdStat}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Selfie da sessão (de Stat)</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.sessaoSelfieStat}</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-slate-600">Carregar fotos (do Stat)</p>
                        <p className="text-lg font-semibold text-slate-800">{selectedItem.carregarFotosStat}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detalhes da Receita */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Detalhes da Receita
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">Chave</TableHead>
                          <TableHead className="font-semibold">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedItem.detalhesReceita?.map((detalhe: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{detalhe.chave}</TableCell>
                            <TableCell>{detalhe.valor}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
