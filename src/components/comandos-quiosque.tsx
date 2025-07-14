"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye } from "lucide-react"

export default function ComandosQuiosque() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const comandos = [
    {
      quiosque: { id: "10199", nome: "Guararapes" },
      tipo: "reiniciarAplicativo",
      status: "pendente",
      criadoEm: "08:19 14 de novembro de 2024",
      usuario: "Alexandre Morozov",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      tipo: "reiniciarAplicativo",
      status: "pendente",
      criadoEm: "08:19 14 de novembro de 2024",
      usuario: "Alexandre Morozov",
    },
    {
      quiosque: { id: "10201", nome: "Tacaruna" },
      tipo: "reiniciarAplicativo",
      status: "pendente",
      criadoEm: "08:19 14 de novembro de 2024",
      usuario: "Alexandre Morozov",
    },
    {
      quiosque: { id: "10202", nome: "RioMar" },
      tipo: "reiniciarAplicativo",
      status: "pendente",
      criadoEm: "08:19 14 de novembro de 2024",
      usuario: "Alexandre Morozov",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      tipo: "carregarAplicacao",
      status: "feito",
      criadoEm: "05:01 11 de novembro de 2024",
      usuario: "—",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      tipo: "reinicio",
      status: "feito",
      criadoEm: "05:00 11 de novembro de 2024",
      usuario: "—",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      tipo: "carregarAplicacao",
      status: "feito",
      criadoEm: "05:01 10 de novembro de 2024",
      usuario: "—",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      tipo: "reinicio",
      status: "feito",
      criadoEm: "05:00 10 de novembro de 2024",
      usuario: "—",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      tipo: "carregarAplicacao",
      status: "feito",
      criadoEm: "08:07 09 de novembro de 2024",
      usuario: "—",
    },
  ]

  const filteredComandos = comandos.filter(
    (comando) =>
      comando.quiosque.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comando.quiosque.id.includes(searchTerm) ||
      comando.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comando.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const itemsPerPage = 8
  const totalItems = filteredComandos.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentItems = filteredComandos.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Comandos do quiosque</h1>
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
          <h2 className="text-lg font-semibold">Comandos do Quiosque</h2>
          <p className="text-blue-100 text-sm">Histórico de comandos enviados aos quiosques</p>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-white">
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Quiosque</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Tipo</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Status</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Criado Em</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Usuário</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((comando, index) => (
              <tr key={index} className="border-t border-gray-100 hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-base font-bold text-pink-500">
                    {comando.quiosque.id} ({comando.quiosque.nome})
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {comando.tipo}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {comando.status === "pendente" ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-orange-600 font-medium">pendente</span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      feito
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{comando.criadoEm}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{comando.usuario}</span>
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600 p-1">
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
