"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye, Edit, ChevronLeft, ChevronRight } from "lucide-react"

export default function Departamentos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const departamentos = [
    {
      id: 120,
      nome: "FotoNotaBR",
      pais: "padrão (Brasil)",
      fusoHorario: "América/Recife",
      horarioCorte: "05:00",
    },
  ]

  const filteredDepartamentos = departamentos.filter(
    (dept) =>
      dept.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.pais.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalItems = filteredDepartamentos.length
  const itemsPerPage = 10
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentItems = filteredDepartamentos.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Departamentos</h1>
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
          <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 font-medium">Criar departamento</Button>

          <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  EU IA
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  NOME
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  PAÍS
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  FUSO HORÁRIO
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  HORÁRIO DE CORTE DIURNO
                </th>
                <th className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  AÇÕES
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {currentItems.map((departamento, index) => (
                <tr key={departamento.id} className="hover:bg-gray-50/50 transition-all duration-200 group">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-lg font-bold text-pink-500">{departamento.id}</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{departamento.nome}</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{departamento.pais}</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{departamento.fusoHorario}</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{departamento.horarioCorte}</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-green-600 hover:bg-green-50 p-2 rounded-lg"
                      >
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <span className="text-sm text-gray-600">
            {startIndex + 1} - {endIndex} de {totalItems}
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="text-gray-500 hover:text-gray-700"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
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
