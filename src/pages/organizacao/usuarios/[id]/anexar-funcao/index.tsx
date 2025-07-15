"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Search, Shield, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { rolesMock } from "../../../../../../data/users-data"
import type { Role } from "../../../../../../types/user-management"
import { RolePermissionsViewer } from "@/components/users/role-permissions-viewer"

export default function AnexarFuncaoPage() {
  const params = useParams()
  const router = useRouter()

  const userId = typeof params?.id === "string" ? Number.parseInt(params.id) : NaN

  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewingRole, setViewingRole] = useState<Role | null>(null)

  if (isNaN(userId)) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-red-600">ID do usuário inválido</h1>
      </div>
    )
  }

  const user = {
    id: userId,
    name: userId === 175 ? "WTotem" : "TESTE",
    roles: userId === 175 ? [rolesMock[0]] : [rolesMock[3]],
  }

  const filteredRoles = rolesMock.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRoleToggle = (role: Role, checked: boolean) => {
    if (checked) {
      setSelectedRoles((prev) => [...prev, role])
    } else {
      setSelectedRoles((prev) => prev.filter((r) => r.id !== role.id))
    }
  }

  const isRoleSelected = (roleId: number) => {
    return selectedRoles.some((role) => role.id === roleId)
  }

  const handleSave = () => {
    console.log("Salvando funções:", selectedRoles)
    router.push(`/organizacao/usuarios/${userId}`)
  }

  const handleCancel = () => {
    router.push(`/organizacao/usuarios/${userId}`)
  }

  const getRoleColor = (color: string) => {
    const colors = {
      red: "bg-red-100 text-red-800 border-red-200",
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
    }
    return colors[color as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Link href={`/organizacao/usuarios/${userId}`}>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Anexar função</h1>
              <p className="text-slate-600">Atribua funções ao usuário {user.name}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Funções Selecionadas</h3>
            <div className="min-h-[60px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              {selectedRoles.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedRoles.map((role) => (
                    <Badge
                      key={role.id}
                      variant="outline"
                      className={`${getRoleColor(role.color)} flex items-center gap-1`}
                    >
                      <Shield className="w-3 h-3" />
                      {role.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma função selecionada</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Funções Disponíveis</h2>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar funções..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 w-12"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Função</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permissões</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuários</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRoles.map((role) => {
                  const isSelected = isRoleSelected(role.id)
                  return (
                    <tr
                      key={role.id}
                      className={`hover:bg-gray-50 cursor-pointer ${isSelected ? "bg-blue-50" : ""}`}
                      onClick={() => handleRoleToggle(role, !isSelected)}
                    >
                      <td className="px-6 py-4">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleRoleToggle(role, checked as boolean)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Shield className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{role.name}</div>
                            <div className="text-sm text-gray-500">ID: {role.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{role.description}</td>
                      <td className="px-6 py-4 text-sm">
                        {role.permissions.filter((p) => p.active).length} de {role.permissions.length}
                      </td>
                      <td className="px-6 py-4 text-sm">{role.userCount}</td>
                      <td className="px-6 py-4">
                        {isSelected ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Selecionada</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            Disponível
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setViewingRole(role)
                          }}
                          className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                          title="Ver permissões"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>«</Button>
              <Button variant="outline" size="sm" disabled>‹</Button>
              <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600 border-blue-200">1</Button>
              <Button variant="outline" size="sm" disabled>›</Button>
              <Button variant="outline" size="sm" disabled>»</Button>
            </div>
            <span className="text-sm text-gray-500">
              1-{filteredRoles.length} de {filteredRoles.length}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">{selectedRoles.length} função(ões) selecionada(s)</div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Salvar Funções</Button>
          </div>
        </div>
      </div>

      <Dialog open={!!viewingRole} onOpenChange={() => setViewingRole(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Permissões da Função</DialogTitle>
          </DialogHeader>
          {viewingRole && <RolePermissionsViewer role={viewingRole} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// 👇 Esta função impede o Next.js de tentar pré-renderizar a página durante o build
export async function getServerSideProps() {
  return {
    props: {},
  }
}
