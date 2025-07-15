"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Shield, Users, Monitor, FileText, BarChart3, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Permission } from "@/modules/permissoes/types/permissions"
import { usePermissions } from "@/modules/permissoes/hooks/use-permissions"
import { permissionCategories } from "@/modules/permissoes/data/permissions-data"

const categoryIcons = {
  Users,
  Shield,
  Monitor,
  FileText,
  BarChart3,
  Settings,
}

export default function PermissoesPage() {
  const { permissions, createPermission, updatePermission, deletePermission } = usePermissions()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)

  const [newPermission, setNewPermission] = useState({
    name: "",
    description: "",
    category: "",
    resource: "",
    action: "",
    active: true,
  })

  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch =
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.resource.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || permission.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const groupedPermissions = permissionCategories.map((category) => ({
    ...category,
    permissions: filteredPermissions.filter((p) => p.category === category.id),
  }))

  const handleCreatePermission = () => {
    if (newPermission.name && newPermission.resource && newPermission.action) {
      createPermission(newPermission)
      setNewPermission({
        name: "",
        description: "",
        category: "",
        resource: "",
        action: "",
        active: true,
      })
      setIsCreateModalOpen(false)
    }
  }

  const handleUpdatePermission = () => {
    if (editingPermission) {
      updatePermission(editingPermission.id, editingPermission)
      setEditingPermission(null)
    }
  }

  const handleDeletePermission = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta permissão?")) {
      deletePermission(id)
    }
  }

  const getCategoryColor = (categoryId: string) => {
    const category = permissionCategories.find((c) => c.id === categoryId)
    return category?.color || "gray"
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = permissionCategories.find((c) => c.id === categoryId)
    const IconComponent = category ? categoryIcons[category.icon as keyof typeof categoryIcons] : Shield
    return IconComponent
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gerenciamento de Permissões</h1>
            <p className="text-gray-600">Crie e gerencie permissões do sistema</p>
          </div>

          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nova Permissão
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Criar Nova Permissão</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome da Permissão</Label>
                  <Input
                    id="name"
                    value={newPermission.name}
                    onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                    placeholder="Ex: Ver Relatórios"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newPermission.description}
                    onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
                    placeholder="Descreva o que esta permissão permite fazer"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={newPermission.category}
                    onValueChange={(value) => setNewPermission({ ...newPermission, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {permissionCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="resource">Recurso</Label>
                    <Input
                      id="resource"
                      value={newPermission.resource}
                      onChange={(e) => setNewPermission({ ...newPermission, resource: e.target.value })}
                      placeholder="Ex: reports"
                    />
                  </div>

                  <div>
                    <Label htmlFor="action">Ação</Label>
                    <Input
                      id="action"
                      value={newPermission.action}
                      onChange={(e) => setNewPermission({ ...newPermission, action: e.target.value })}
                      placeholder="Ex: view"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={newPermission.active}
                    onCheckedChange={(checked) => setNewPermission({ ...newPermission, active: checked })}
                  />
                  <Label htmlFor="active">Permissão ativa</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreatePermission} className="bg-blue-600 hover:bg-blue-700">
                  Criar Permissão
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar permissões..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {permissionCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total de Permissões</p>
                  <p className="text-xl font-semibold">{permissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div>
                  <p className="text-sm text-gray-600">Ativas</p>
                  <p className="text-xl font-semibold">{permissions.filter((p) => p.active).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div>
                  <p className="text-sm text-gray-600">Inativas</p>
                  <p className="text-xl font-semibold">{permissions.filter((p) => !p.active).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Categorias</p>
                  <p className="text-xl font-semibold">{permissionCategories.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lista de Permissões por Categoria */}
      <div className="space-y-6">
        {groupedPermissions.map((group) => {
          if (group.permissions.length === 0) return null

          const IconComponent = getCategoryIcon(group.id)

          return (
            <Card key={group.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconComponent className={`w-5 h-5 text-${group.color}-600`} />
                  {group.name}
                  <Badge variant="secondary" className="ml-2">
                    {group.permissions.length}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-gray-600">{group.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {group.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${permission.active ? "bg-green-500" : "bg-red-500"}`} />
                        <div>
                          <h4 className="font-medium text-gray-900">{permission.name}</h4>
                          <p className="text-sm text-gray-600">{permission.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {permission.resource}.{permission.action}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingPermission(permission)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePermission(permission.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Modal de Edição */}
      <Dialog open={!!editingPermission} onOpenChange={() => setEditingPermission(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Permissão</DialogTitle>
          </DialogHeader>
          {editingPermission && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nome da Permissão</Label>
                <Input
                  id="edit-name"
                  value={editingPermission.name}
                  onChange={(e) => setEditingPermission({ ...editingPermission, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={editingPermission.description}
                  onChange={(e) => setEditingPermission({ ...editingPermission, description: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={editingPermission.active}
                  onCheckedChange={(checked) => setEditingPermission({ ...editingPermission, active: checked })}
                />
                <Label htmlFor="edit-active">Permissão ativa</Label>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setEditingPermission(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdatePermission} className="bg-blue-600 hover:bg-blue-700">
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
