"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Edit, Search, Eye, Trash2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { RolePermissionsViewer } from "@/components/users/role-permissions-viewer"
import { UserPermissionEditor } from "@/components/users/user-permission-editor"
import { Role } from "../../../../../types/user-management"

export default function DetalhesUsuarioPage() {
  const params = useParams()

  const usuariosMock = [
    {
      id: 175,
      name: "WTotem",
      email: "wilson.hora@wtotem.com.br",
      active: true,
      avatar: "W",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
      roles: [
        {
          id: 1,
          name: "Administrador",
          slug: "administrador",
          description: "Acesso total ao sistema",
          color: "blue",
          permissions: [
            {
              id: "users.view",
              name: "Ver Usuários",
              description: "Visualizar lista de usuários",
              category: "user-management",
              resource: "users",
              action: "view",
              active: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "users.create",
              name: "Criar Usuários",
              description: "Criar novos usuários",
              category: "user-management",
              resource: "users",
              action: "create",
              active: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "roles.manage",
              name: "Gerenciar Funções",
              description: "Gerenciar funções do sistema",
              category: "role-management",
              resource: "roles",
              action: "manage",
              active: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          userCount: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      directPermissions: [],
    },
    {
      id: 165,
      name: "TESTE",
      email: "contato@fotonotabrasil.com.br",
      active: false,
      avatar: "T",
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-10"),
      roles: [
        {
          id: 2,
          name: "Operador",
          slug: "operador",
          description: "Operação básica",
          color: "green",
          permissions: [
            {
              id: "users.view",
              name: "Ver Usuários",
              description: "Visualizar lista de usuários",
              category: "user-management",
              resource: "users",
              action: "view",
              active: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          userCount: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      directPermissions: [],
    },
  ]

  const [user, setUser] = useState<typeof usuariosMock[0] | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewingRole, setViewingRole] = useState<Role | null>(null)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  useEffect(() => {
    if (!params.id || Array.isArray(params.id)) {
      setUser(null)
      setLoading(false)
      return
    }

    const userId = Number.parseInt(params.id)
    if (isNaN(userId)) {
      setUser(null)
      setLoading(false)
      return
    }

    const foundUser = usuariosMock.find((u) => u.id === userId) || null
    setUser(foundUser)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-slate-600">Carregando detalhes do usuário...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Usuário não encontrado</h1>
          <p className="text-slate-600 mb-4">O usuário solicitado não existe.</p>
          <Link href="/organizacao/usuarios">
            <Button>Voltar para Usuários</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleRemoveRole = (roleId: number) => {
    if (confirm("Tem certeza que deseja remover esta função do usuário?")) {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              roles: prev.roles.filter((role) => role.id !== roleId),
              updatedAt: new Date(),
            }
          : null,
      )
    }
  }

  const handleUpdateRolePermissions = (roleId: number, updatedPermissions: any[]) => {
    setUser((prev) =>
      prev
        ? {
            ...prev,
            roles: prev.roles.map((role) =>
              role.id === roleId ? { ...role, permissions: updatedPermissions } : role,
            ),
            updatedAt: new Date(),
          }
        : null,
    )
    setEditingRole(null)
  }

  const renderPermissoes = (permissoes: any[]) => {
    return (
      <div className="flex gap-1">
        {permissoes.slice(0, 20).map((permissao, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${permissao.active ? "bg-green-500" : "bg-red-500"}`}
            title={permissao.name}
          />
        ))}
        {permissoes.length > 20 && (
          <span className="text-xs text-gray-500 ml-1">+{permissoes.length - 20}</span>
        )}
      </div>
    )
  }

  const filteredRoles = user.roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/organizacao/usuarios">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-100 rounded-full">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-slate-800">Detalhes do usuário: {user.name}</h1>
            </div>
            <Link href={`/organizacao/usuarios/${user.id}/editar`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </Link>
          </div>
        </div>

        {/* Informações do Usuário */}
        <Card className="border-0 shadow-sm bg-white mb-6">
          <CardContent className="p-6">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">EU IA</span>
                <span className="text-slate-800 font-medium">{user.id}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Avatar</span>
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {user.avatar ||
                      user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Nome</span>
                <span className="text-slate-800 font-medium">{user.name}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">E-mail</span>
                <span className="text-blue-600 font-medium">{user.email}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Número de telefone</span>
                <span className="text-slate-800 font-medium">551197644286</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Departamento</span>
                <span className="text-slate-800 font-medium">FotoNotaBR (Brasil)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção de Funções */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Funções</h2>
              <Link href={`/organizacao/usuarios/${user.id}/anexar-funcao`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Anexar função</Button>
              </Link>
            </div>

            {/* Campo de busca */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Procurar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabela de Funções */}
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
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-600 font-medium">{role.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{role.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-500">{role.slug}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{renderPermissoes(role.permissions)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900">{role.userCount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewingRole(role)}
                          className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                          title="Ver permissões"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingRole(role)}
                          className="w-8 h-8 p-0 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded-full"
                          title="Editar permissões"
                        >
                          <Shield className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveRole(role.id)}
                          className="w-8 h-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-full"
                          title="Remover função"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRoles.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      {searchTerm ? "Nenhuma função encontrada" : "Nenhuma função atribuída"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginação (fixa por enquanto) */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                «
              </Button>
              <Button variant="outline" size="sm" disabled>
                ‹
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                ›
              </Button>
              <Button variant="outline" size="sm" disabled>
                »
              </Button>
            </div>
            <span className="text-sm text-gray-500">
              1-{filteredRoles.length} de {filteredRoles.length}
            </span>
          </div>
        </div>
      </div>

      {/* Modal de Visualização de Permissões */}
      <Dialog open={!!viewingRole} onOpenChange={() => setViewingRole(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Permissões da Função</DialogTitle>
          </DialogHeader>
          {viewingRole && <RolePermissionsViewer role={viewingRole} />}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Permissões */}
      <Dialog open={!!editingRole} onOpenChange={() => setEditingRole(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Editar Permissões - {editingRole?.name}</DialogTitle>
          </DialogHeader>
          {editingRole && (
            <UserPermissionEditor
              role={editingRole}
              onSave={(updatedPermissions) => handleUpdateRolePermissions(editingRole.id, updatedPermissions)}
              onCancel={() => setEditingRole(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
export async function getServerSideProps() {
  return {
    props: {},
  }
}
