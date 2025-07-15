"use client"

import { useState } from "react"
import { Search, Shield, Check, X, ChevronDown, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Role } from "../../../types/user-management"
import { permissionCategories } from "../../../data/permissions-data"

interface UserPermissionEditorProps {
  role: Role
  onSave: (permissions: any[]) => void
  onCancel: () => void
}

export function UserPermissionEditor({ role, onSave, onCancel }: UserPermissionEditorProps) {
  const [permissions, setPermissions] = useState(role.permissions)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const groupedPermissions = permissionCategories
    .map((category) => ({
      ...category,
      permissions: filteredPermissions.filter((p) => p.category === category.id),
    }))
    .filter((group) => group.permissions.length > 0)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handlePermissionToggle = (permissionId: string, active: boolean) => {
    setPermissions((prev) =>
      prev.map((permission) => (permission.id === permissionId ? { ...permission, active } : permission)),
    )
  }

  const handleSave = () => {
    onSave(permissions)
  }

  const activePermissions = permissions.filter((p) => p.active).length
  const totalPermissions = permissions.length

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-lg font-medium">Editar Permissões</h3>
            <p className="text-sm text-gray-600">
              {activePermissions} de {totalPermissions} permissões ativas
            </p>
          </div>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
          {role.name}
        </Badge>
      </div>

      {/* Campo de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar permissões..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Lista de permissões por categoria */}
      <ScrollArea className="h-[500px] border rounded-lg">
        <div className="p-4 space-y-3">
          {groupedPermissions.map((group) => (
            <Card key={group.id} className="border border-gray-200">
              <Collapsible open={expandedCategories.includes(group.id)} onOpenChange={() => toggleCategory(group.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${group.color}-500`} />
                        {group.name}
                        <Badge variant="secondary" className="ml-2">
                          {group.permissions.length}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {group.permissions.filter((p) => p.active).length} ativas
                        </Badge>
                      </div>
                      {expandedCategories.includes(group.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {group.permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex-shrink-0">
                              {permission.active ? (
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                  <Check className="w-4 h-4 text-green-600" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                                  <X className="w-4 h-4 text-red-600" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-medium text-gray-900">{permission.name}</span>
                              <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
                              <Badge variant="outline" className="text-xs font-mono mt-1">
                                {permission.resource}.{permission.action}
                              </Badge>
                            </div>
                          </div>
                          <Switch
                            checked={permission.active}
                            onCheckedChange={(checked) => handlePermissionToggle(permission.id, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}

          {groupedPermissions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma permissão encontrada</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Ações */}
      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-gray-600">
          {activePermissions} de {totalPermissions} permissões ativas
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  )
}
