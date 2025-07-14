"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Eye } from "lucide-react"

export default function Avisos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const avisos = [
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      sessao: "—",
      tipo: "quiosque offline",
      nivel: 90,
      criado: "2024-11-11 11:15:01",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      sessao: "—",
      tipo: "quiosque offline",
      nivel: 90,
      criado: "2024-11-08 17:35:01",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      sessao: "—",
      tipo: "quiosque offline",
      nivel: 90,
      criado: "2024-11-06 17:35:01",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      sessao: "sessão - 8276543",
      tipo: "printTimeError",
      nivel: 100,
      criado: "2024-11-04 18:10:51",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      sessao: "—",
      tipo: "quiosqueFreeze",
      nivel: 30,
      criado: "2024-11-04 18:10:50",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      sessao: "—",
      tipo: "quiosque offline",
      nivel: 90,
      criado: "2024-11-04 12:20:02",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      sessao: "—",
      tipo: "quiosque offline",
      nivel: 90,
      criado: "2024-11-01 18:55:02",
    },
    {
      quiosque: { id: "10200", nome: "Loja Recife" },
      sessao: "—",
      tipo: "quiosque offline",
      nivel: 90,
      criado: "2024-09-20 15:20:01",
    },
  ]

  const filteredAvisos = avisos.filter(
    (aviso) =>
      aviso.quiosque.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aviso.quiosque.id.includes(searchTerm) ||
      aviso.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aviso.sessao.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const itemsPerPage = 8
  const totalItems = filteredAvisos.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentItems = filteredAvisos.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Avisos</h1>
        </div>
      </div>

      {/* Search */}
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
          <h2 className="text-lg font-semibold">Avisos</h2>
          <p className="text-blue-100 text-sm">Alertas e notificações do sistema</p>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="bg-white">
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Quiosque</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Sessão</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Tipo</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Nível</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Criado</th>
              <th className="px-6 py-4 text-left text-blue-600 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((aviso, index) => (
              <tr key={index} className="border-t border-gray-100 hover:bg-blue-50/30 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-base font-bold text-pink-500">
                    {aviso.quiosque.id} ({aviso.quiosque.nome})
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm ${aviso.sessao === "—" ? "text-gray-400" : "text-pink-500 font-medium"}`}>
                    {aviso.sessao}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {aviso.tipo}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      aviso.nivel >= 100
                        ? "bg-red-100 text-red-800"
                        : aviso.nivel >= 90
                          ? "bg-orange-100 text-orange-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {aviso.nivel}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{aviso.criado}</span>
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
