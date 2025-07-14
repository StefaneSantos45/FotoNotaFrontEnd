"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Eye, Edit, RefreshCw } from "lucide-react"

export default function Quiosques() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedQuiosques, setSelectedQuiosques] = useState<string[]>([])
  const [hoveredIcon, setHoveredIcon] = useState<{ index: number; iconIndex: number; name: string } | null>(null)

  const statusIcons = [
    { name: "Aceitador de moedas", color: "bg-green-500", status: "ok" },
    { name: "Validador de Billet", color: "bg-gray-400", status: "inactive" },
    { name: "Funil", color: "bg-green-500", status: "ok" },
    { name: "Cortador", color: "bg-red-500", status: "error" },
    { name: "Controlador de dispositivo", color: "bg-green-500", status: "ok" },
    { name: "Impressora Dnp", color: "bg-gray-400", status: "inactive" },
    { name: "Monitor de memória", color: "bg-green-500", status: "ok" },
    { name: "Leitor de cartão bancário", color: "bg-green-500", status: "ok" },
    { name: "Navegador", color: "bg-green-500", status: "ok" },
    { name: "Instagram biscoitos vazios", color: "bg-purple-500", status: "warning" },
  ]

  const quiosques = [
    {
      id: "10202",
      nome: "RioMar",
      quantia: "51 270,60",
      moeda: "BRL",
      papel: 87,
      funil: 75,
      departamento: "FotoNotaBR (Brasil)",
      layoutPredefinicao: "ATUALIZADOS",
      anuncioPredefinicao: "falso",
      docphotoPredefinicao: "DOC BR",
      tempoAtras: "1 ano atrás",
      statusIcons: statusIcons,
    },
    {
      id: "10201",
      nome: "Tacaruna",
      quantia: "5 637,00",
      moeda: "BRL",
      papel: 68,
      funil: 86,
      departamento: "FotoNotaBR (Brasil)",
      layoutPredefinicao: "ATUALIZADOS",
      anuncioPredefinicao: "falso",
      docphotoPredefinicao: "DOC BR",
      tempoAtras: "2 anos atrás",
      statusIcons: statusIcons,
    },
    {
      id: "10200",
      nome: "Loja Recife",
      quantia: "48 420,00",
      moeda: "BRL",
      papel: 6666,
      funil: 63,
      departamento: "FotoNotaBR (Brasil)",
      layoutPredefinicao: "ATUALIZADOS",
      anuncioPredefinicao: "falso",
      docphotoPredefinicao: "DOC BR",
      tempoAtras: "7 meses atrás",
      statusIcons: statusIcons,
    },
    {
      id: "10199",
      nome: "Guararapes",
      quantia: "2 731,00",
      moeda: "BRL",
      papel: 25,
      funil: 49,
      departamento: "FotoNotaBR (Brasil)",
      layoutPredefinicao: "ATUALIZADOS",
      anuncioPredefinicao: "falso",
      docphotoPredefinicao: "DOC BR",
      tempoAtras: "2 anos atrás",
      statusIcons: statusIcons,
    },
  ]

  const filteredQuiosques = quiosques.filter(
    (quiosque) =>
      quiosque.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiosque.id.includes(searchTerm) ||
      quiosque.departamento.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const itemsPerPage = 10
  const totalItems = filteredQuiosques.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentItems = filteredQuiosques.slice(startIndex, endIndex)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedQuiosques(currentItems.map((q) => q.id))
    } else {
      setSelectedQuiosques([])
    }
  }

  const handleSelectQuiosque = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedQuiosques([...selectedQuiosques, id])
    } else {
      setSelectedQuiosques(selectedQuiosques.filter((qId) => qId !== id))
    }
  }

  const acoes = [
    "Ações",
    "Quiosque de congelamento",
    "Quiosque Un Freeze",
    "Quiosque de reinicialização",
    "Adicionar quiosque de cookies do Instagram",
    "Menu de serviço aberto",
    "Baixar Estatísticas do Quiosque de Detalhes",
    "Conectar ao Team Viewer",
    "Conecte-se a qualquer mesa",
  ]

  return (
    <div className="space-y-6">
      {/* Tooltip */}
      {hoveredIcon && (
        <div
          className="fixed z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none"
          style={{
            left: hoveredIcon.index * 100 + 200,
            top: 200 + hoveredIcon.index * 60,
          }}
        >
          {hoveredIcon.name}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Quiosques</h1>
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
            <RefreshCw className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white">
          <h2 className="text-lg font-semibold">Quiosques</h2>
          <p className="text-blue-100 text-sm">Gestão e monitoramento dos quiosques</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white">
                <th className="px-6 py-4 text-left">
                  <Checkbox
                    checked={selectedQuiosques.length === currentItems.length && currentItems.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">ID do Quiosque</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">Status</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">Quantia</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">Papel</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">Funil</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">Departamento</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">Layout</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">Anúncio</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">DocPhoto</th>
                <th className="px-6 py-4 text-left text-blue-600 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((quiosque, index) => (
                <tr key={quiosque.id} className="border-t border-gray-100 hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedQuiosques.includes(quiosque.id)}
                      onCheckedChange={(checked) => handleSelectQuiosque(quiosque.id, checked as boolean)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-base font-bold text-blue-600">{quiosque.id}</span>
                      <div className="text-sm text-gray-600 font-medium">{quiosque.nome}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-1">
                        {quiosque.statusIcons.map((icon, iconIndex) => (
                          <div
                            key={iconIndex}
                            className={`w-4 h-4 rounded-sm ${icon.color} cursor-pointer shadow-sm`}
                            onMouseEnter={(e) => {
                              setHoveredIcon({
                                index,
                                iconIndex,
                                name: icon.name,
                              })
                            }}
                            onMouseLeave={() => setHoveredIcon(null)}
                            title={icon.name}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">{quiosque.tempoAtras}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-lg font-bold text-pink-500">{quiosque.quantia}</div>
                      <div className="text-sm text-pink-400 font-medium">{quiosque.moeda}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 font-medium">
                      {quiosque.papel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 font-medium">
                      {quiosque.funil}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-pink-500">{quiosque.departamento}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {quiosque.layoutPredefinicao}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{quiosque.anuncioPredefinicao}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {quiosque.docphotoPredefinicao}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Select>
                        <SelectTrigger className="w-24 h-8 text-xs border-gray-200 rounded-lg">
                          <SelectValue placeholder="Ações" />
                        </SelectTrigger>
                        <SelectContent>
                          {acoes.map((acao, idx) => (
                            <SelectItem key={idx} value={acao.toLowerCase().replace(/\s+/g, "-")} disabled={idx === 0}>
                              {acao}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600 p-1">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-600 p-1">
                        <Edit className="w-4 h-4" />
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
