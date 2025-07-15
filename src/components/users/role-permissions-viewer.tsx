"use client"

import { Shield, Check, X, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"


import { permissionCategories } from "../../../data/permissions-data"
import { Role } from "../../../types/user-management"

interface RolePermissionsViewerProps {
  role: Role
}

export function RolePermissionsViewer({ role }: RolePermissionsViewerProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const groupedPermissions = permissionCategories
    .map((category) => ({
      ...category,
      permissions: role.permissions.filter((p) => p.category === category.id),
    }))
    .filter((group) => group.permissions.length > 0)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const getCategoryColor = (categoryId: string) => {
    const category = permissionCategories.find((c) => c.id === categoryId)
    return category?.color || "gray"
  }

  const activePermissions = role.permissions.filter((p) => p.active).length
  const totalPermissions = role.permissions.length

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-medium">Permissões da Função: {role.name}</h3>
        <Badge variant="outline" className="ml-2">
          {activePermissions} de {totalPermissions} ativas
        </Badge>
      </div>

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
                    <div className="space-y-2">
                      {group.permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
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
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs font-mono">
                            {permission.resource}.{permission.action}
                          </Badge>
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
              <p>Nenhuma permissão encontrada para esta função</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
