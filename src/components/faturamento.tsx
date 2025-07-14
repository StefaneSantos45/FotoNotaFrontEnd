"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye } from "lucide-react"

export default function Faturamento() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const faturamento = [
    {
      mes: "Novembro de 2024",
      imprimir: 4,
      receita: "0,00 EUR",
      receitaSemDinheiro: "0,00 EUR",
      receitaEmDinheiro: "0,00 EUR",
      sessao: 3,
      sessaoImpressa: 0,
    },
    {
      mes: "Agosto de 2024",
      imprimir: 4,
      receita: "0,00 EUR",
      receitaSemDinheiro: "0,00 EUR",
      receitaEmDinheiro: "0,00 EUR",
      sessao: 2,
      sessaoImpressa: 0,
    },
    {
      mes: "Abril de 2024",
      imprimir: 2,
      receita: "0,00 EUR",
      receitaSemDinheiro: "0,00 EUR",
      receitaEmDinheiro: "0,00 EUR",
      sessao: 2,
      sessaoImpressa: 0,
    },
    {
      mes: "Janeiro de 2024",
      imprimir: 868,
      receita: "1 681,11 euros",
      receitaSemDinheiro: "0,00 EUR",
      receitaEmDinheiro: "0,00 EUR",
      sessao: 976,
      sessaoImpressa: 248,
    },
    {
      mes: "Dezembro de 2023",
      imprimir: 1196,
      receita: "2 336,21 euros",
      receitaSemDinheiro: "0,00 EUR",
      receitaEmDinheiro: "0,00 EUR",
      sessao: 1531,
      sessaoImpressa: 361,
    },
  ]

  const filteredFaturamento = faturamento.filter((item) => item.mes.toLowerCase().includes(searchTerm.toLowerCase()))

  const itemsPerPage = 10
  const totalItems = filteredFaturamento.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentItems = filteredFaturamento.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Faturamento</h1>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Procurar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white">
          <h2 className="text-lg font-semibold">Faturamento</h2>
          <p className="text-blue-100 text-sm">Relatório mensal de faturamento e estatísticas</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white">
                <th className="px-6 py-4 text-left text-blue-600 font-medium">MÊS</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">IMPRIMIR</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">RECEITA</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">RECEITA SEM DINHEIRO</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">RECEITA EM DINHEIRO</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">SESSÃO</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">SESSÃO IMPRESSA</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className="border-t border-gray-100 hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{item.mes}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{item.imprimir}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{item.receita}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{item.receitaSemDinheiro}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{item.receitaEmDinheiro}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{item.sessao}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{item.sessaoImpressa}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 text-xs font-medium">
                        Baixar Estatísticas de Faturamento Detalhadas
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600 p-1">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              <span className="text-lg">«</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              <span className="text-lg">‹</span>
            </Button>

            <div className="flex items-center space-x-1 mx-4">
              {(() => {
                const pages = []
                const maxVisiblePages = 5
                let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
                const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

                if (endPage - startPage + 1 < maxVisiblePages) {
                  startPage = Math.max(1, endPage - maxVisiblePages + 1)
                }

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <Button
                      key={i}
                      variant={currentPage === i ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(i)}
                      className={`h-8 w-8 p-0 text-sm ${
                        currentPage === i
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {i}
                    </Button>,
                  )
                }

                return pages
              })()}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              <span className="text-lg">›</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              <span className="text-lg">»</span>
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            {startIndex + 1}-{endIndex} de {totalItems}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="text-sm text-pink-500">
          <span>FnPix © 2020 - 2025</span>
        </div>
      </footer>
    </div>
  )
}
