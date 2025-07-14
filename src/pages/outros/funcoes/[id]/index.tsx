"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Search, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { funcoesMock, usuariosMock } from "../../../../../data/mock-data"

// Tipagens
interface Permissao {
  id: string | number
  nome: string
  ativo: boolean
}

interface Funcao {
  id: number
  nome: string
  lesma: string
  euIa: number
  permissoes: Permissao[]
}

interface Usuario {
  id: number
  nome: string
  email: string
}

export default function DetalheFuncaoPage() {
  const params = useParams()
  const funcaoId = Number.parseInt(params.id as string)

  const funcao: Funcao | undefined = funcoesMock.find((f) => f.id === funcaoId)
  const usuarios: Usuario[] = usuariosMock

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [anexedUsers, setAnexedUsers] = useState<Usuario[]>([])

  const [editablePermissions, setEditablePermissions] = useState<Record<string, boolean>>(
    funcao?.permissoes.reduce((acc, perm) => {
      acc[perm.id.toString()] = perm.ativo
      return acc
    }, {} as Record<string, boolean>) || {}
  )

  if (!funcao) {
    return <div>Função não encontrada</div>
  }

  const handleAnexarUsuario = () => {
    if (selectedUser) {
      const usuario = usuarios.find((u) => u.id.toString() === selectedUser)
      if (usuario && !anexedUsers.find((u) => u.id === usuario.id)) {
        setAnexedUsers((prev) => [...prev, usuario])
      }
      setIsModalOpen(false)
      setSelectedUser("")
    }
  }

  const handleAnexarEContinuar = () => {
    if (selectedUser) {
      const usuario = usuarios.find((u) => u.id.toString() === selectedUser)
      if (usuario && !anexedUsers.find((u) => u.id === usuario.id)) {
        setAnexedUsers((prev) => [...prev, usuario])
      }
      setSelectedUser("")
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/outro/funcoes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">
              Detalhes da função: {funcao.nome}
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">EU IA</label>
              <div className="text-lg font-semibold text-gray-900">{funcao.euIa}</div>
            </div>
            <div></div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <div className="text-gray-900">{funcao.nome}</div>
            </div>
            <div></div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lesma</label>
              <div className="text-gray-500">{funcao.lesma}</div>
            </div>
            <div></div>
          </div>

          {/* Permissões Editáveis */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Permissões</label>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto border rounded-lg p-4">
              {funcao.permissoes.map((permissao) => (
                <div key={permissao.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`perm-${permissao.id}`}
                    checked={editablePermissions[permissao.id.toString()] || false}
                    onChange={(e) =>
                      setEditablePermissions((prev) => ({
                        ...prev,
                        [permissao.id.toString()]: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label htmlFor={`perm-${permissao.id}`} className="text-sm text-gray-700 cursor-pointer">
                    {permissao.nome}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Salvar Permissões</Button>
            </div>
          </div>

          {/* Usuários */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Usuários</h2>

              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">Anexar usuário</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Anexar usuário</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Usuários</label>
                      <Select value={selectedUser} onValueChange={setSelectedUser}>
                        <SelectTrigger>
                          <SelectValue placeholder="Clique para escolher" />
                        </SelectTrigger>
                        <SelectContent>
                          {usuarios.map((usuario) => (
                            <SelectItem key={usuario.id} value={usuario.id.toString()}>
                              {usuario.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      className="bg-pink-600 hover:bg-pink-700 text-white"
                      onClick={handleAnexarEContinuar}
                      disabled={!selectedUser}
                    >
                      Anexar e anexar outro
                    </Button>
                    <Button
                      className="bg-pink-600 hover:bg-pink-700 text-white"
                      onClick={handleAnexarUsuario}
                      disabled={!selectedUser}
                    >
                      Anexar usuário
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="relative max-w-md mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Procurar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {anexedUsers.length > 0 ? (
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {anexedUsers
                      .filter((user) =>
                        user.nome.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.nome}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setAnexedUsers((prev) =>
                                  prev.filter((u) => u.id !== user.id)
                                )
                              }
                              className="text-red-600 hover:text-red-700"
                            >
                              Remover
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                </div>
                <p className="text-gray-500 text-sm">Nenhum usuário correspondeu aos critérios fornecidos.</p>
                <Button
                  className="mt-4 bg-pink-600 hover:bg-pink-700 text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  Anexar usuário
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 text-center">
          <div className="text-sm text-gray-500">
            <span className="text-pink-600 font-medium">FnPix</span>
            {" • © 2020 - 2025 • "}
          </div>
        </div>
      </div>
    </div>
  )
}
