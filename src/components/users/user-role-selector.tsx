"use client"

import { useState } from "react"
import { Search, Shield, X, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RolePermissionsViewer } from "./role-permissions-viewer"
import { Role, User } from "../../../types/user-management"

interface UserRoleSelectorProps {
  user: User
  availableRoles: Role[]
  onSave: (roles: Role[]) => void
  onCancel: () => void
}

export function UserRoleSelector({ user, availableRoles, onSave, onCancel }: UserRoleSelectorProps) {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>(user.roles)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewingRole, setViewingRole] = useState<Role | null>(null)

  const filteredRoles = availableRoles.filter(
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

  const getTotalPermissions = (roles: Role[]) => {
    const uniquePermissions = new Set()
    roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        if (permission.active) {
          uniquePermissions.add(permission.id)
        }
      })
    })
    return uniquePermissions.size
  }

  return (
    <div className="space-y-6">
      {/* Funções Selecionadas */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Funções Selecionadas</h3>
        <div className="min-h-[60px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          {selectedRoles.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedRoles.map((role) => (
                <div key={role.id} className="flex items-center gap-1">
                  <Badge variant="outline" className={`${getRoleColor(role.color)} flex items-center gap-1`}>
                    <Shield className="w-3 h-3" />
                    {role.name}
                    <button
                      onClick={() => handleRoleToggle(role, false)}
                      className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewingRole(role)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    title="Ver permissões"
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Nenhuma função selecionada</p>
            </div>
          )}
        </div>

        {selectedRoles.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            <strong>{getTotalPermissions(selectedRoles)}</strong> permissões únicas serão concedidas
          </div>
        )}
      </div>

      <Separator />

      {/* Busca */}
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar funções disponíveis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Lista de Funções Disponíveis */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Funções Disponíveis</h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <ScrollArea className="h-[400px]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Função
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descrição
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permissões
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuários
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
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
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) => handleRoleToggle(role, checked as boolean)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
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
                        <td className="px-4 py-4">
                          <span className="text-gray-600 text-sm">{role.description}</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">{role.permissions.filter((p) => p.active).length}</span>
                            <span className="text-gray-500 text-sm">de {role.permissions.length}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-gray-900">{role.userCount}</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {isSelected ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">Selecionada</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                              Disponível
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
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
          </ScrollArea>

          {filteredRoles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma função encontrada</p>
            </div>
          )}
        </div>
      </div>

      {/* Ações */}
      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-gray-600">{selectedRoles.length} função(ões) selecionada(s)</div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(selectedRoles)} className="bg-blue-600 hover:bg-blue-700">
            Salvar Funções
          </Button>
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
    </div>
  )
}
