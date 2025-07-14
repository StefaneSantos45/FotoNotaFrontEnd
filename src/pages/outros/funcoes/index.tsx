"use client"

import { useState } from "react"
import { Search, Filter, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { funcoesMock } from "@/data/mock-data"
import type { Funcao } from "@/types/funcoes"
import { PermissionGuard } from "@/components/auth/permission-guard"

export default function FuncoesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [funcoes] = useState<Funcao[]>(funcoesMock)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const filteredFuncoes = funcoes.filter(
    (funcao) =>
      funcao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcao.lesma.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginação
  const totalPages = Math.ceil(filteredFuncoes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredFuncoes.slice(startIndex, endIndex)

  const renderPermissoes = (permissoes: any[]) => {
    return (
      <div className="flex gap-1">
        {permissoes.slice(0, 20).map((permissao, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${permissao.ativo ? "bg-green-500" : "bg-red-500"}`}
            title={permissao.nome}
          />
        ))}
        {permissoes.length > 20 && <span className="text-xs text-gray-500 ml-1">+{permissoes.length - 20}</span>}
      </div>
    )
  }

  return (
    <PermissionGuard resource="roles" action="view">
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Funções</h1>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Procurar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Button variant="outline" className="bg-white text-gray-700 border-gray-300">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <PermissionGuard
                resource="roles"
                action="create"
                fallback={<div className="text-gray-400">Sem permissão para criar</div>}
              >
                <Button>Nova Função</Button>
              </PermissionGuard>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EU IA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NOME
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LESMA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PERMISSÕES
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    USUÁRIOS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AÇÕES
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((funcao) => (
                  <tr key={funcao.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-600 font-medium">{funcao.euIa}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{funcao.nome}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-500">{funcao.lesma}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{renderPermissoes(funcao.permissoes)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{funcao.usuarios}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/outro/funcoes/${funcao.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="text-gray-600"
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
                          ? "bg-gray-900 text-white hover:bg-gray-800"
                          : "text-gray-600 hover:bg-gray-100"
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
                className="text-gray-600"
              >
                Próxima
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PermissionGuard>
  )
}
