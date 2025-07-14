"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, Edit, Trash2, UsersRound, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { gruposData } from "@/modules/grupos/data/gruposData"
import { PermissionGuard } from "@/modules/auth/components/PermissionGuard"
import { ProtectedRoute } from "@/modules/auth/components/ProtectedRoute"


export default function GruposPage() {
  const [searchTerm, setSearchTerm] = useState("")
  // Atualizar os dados para usar os dados do serviço
  const [grupos] = useState(gruposData)
  const [showNewGroupModal, setShowNewGroupModal] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)

  // Adicionar o router no componente
  const router = useRouter()

  const filteredGrupos = grupos.filter((grupo) => grupo.nome.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedIcon(file)
    }
  }

  const handleCreateGroup = () => {
    // Lógica para criar novo grupo
    console.log("Criar grupo:", newGroupName, selectedIcon)
    setShowNewGroupModal(false)
    setNewGroupName("")
    setSelectedIcon(null)
  }

  // Adicionar função para navegar para detalhes
  const handleGroupClick = (grupoId: number) => {
    router.push(`/grupos/${grupoId}`)
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-slate-50">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            {/* Título */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h1 className="text-4xl font-bold text-slate-800 flex items-center">
                    <UsersRound className="w-10 h-10 mr-3 text-blue-600" />
                    Grupos de Molduras
                  </h1>
                </div>
                  <Dialog open={showNewGroupModal} onOpenChange={setShowNewGroupModal}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Grupo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-800">Novo grupo de molduras</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        {/* Upload de Ícone */}
                        <div className="space-y-3">
                          <Label htmlFor="icon-upload" className="text-sm font-medium text-slate-700">
                            Ícone do grupo
                          </Label>
                          <div className="flex items-center space-x-3">
                            <input
                              id="icon-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            <Button
                              variant="outline"
                              onClick={() => document.getElementById("icon-upload")?.click()}
                              className="flex items-center space-x-2"
                            >
                              <Upload className="w-4 h-4" />
                              <span>Escolher arquivos</span>
                            </Button>
                            <span className="text-sm text-slate-500">
                              {selectedIcon ? selectedIcon.name : "Nenhum arquivo escolhido"}
                            </span>
                          </div>
                        </div>

                        {/* Nome do Grupo */}
                        <div className="space-y-3">
                          <Label htmlFor="group-name" className="text-sm font-medium text-slate-700">
                            Nome do grupo
                          </Label>
                          <Input
                            id="group-name"
                            placeholder="Digite o nome do grupo"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                          />
                        </div>

                        {/* Botão Cadastrar */}
                        <Button
                          onClick={handleCreateGroup}
                          className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                          disabled={!newGroupName.trim()}
                        >
                          Cadastrar
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
              </div>
              <p className="text-slate-600 text-lg mt-3">Organize molduras em grupos temáticos</p>
            </div>

            {/* Barra de Pesquisa */}
            <div className="mb-6">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Pesquisar grupos..."
                  className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Grid de Grupos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGrupos.map((grupo) => (
                <Card
                  key={grupo.id}
                  className={`border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-200 cursor-pointer ${
                    !grupo.ativo ? "opacity-60" : ""
                  }`}
                  onClick={() => handleGroupClick(grupo.id)}
                >
                  <CardContent className="p-6 text-center">
                    {/* Ícone do Grupo */}
                    <div
                      className={`w-20 h-20 ${grupo.cor} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm`}
                    >
                      <span className="text-3xl">{grupo.icone}</span>
                    </div>

                    {/* Nome do Grupo */}
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{grupo.nome}</h3>

                    {/* Informações */}
                    <div className="text-sm text-slate-500 mb-4">
                      <p>{grupo.molduras} molduras</p>
                      <p>Criado em {new Date(grupo.dataCriacao).toLocaleDateString("pt-BR")}</p>
                    </div>

                    {/* Status */}
                    {!grupo.ativo && (
                      <div className="mb-4">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          Inativo
                        </span>
                      </div>
                    )}

                    {/* Ações */}
                    <div className="flex justify-center space-x-2">
                      <PermissionGuard resource="groups" action="edit">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                      </PermissionGuard>

                      <PermissionGuard resource="groups" action="delete">
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remover
                        </Button>
                      </PermissionGuard>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mensagem quando não há grupos */}
            {filteredGrupos.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersRound className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-600 mb-2">Nenhum grupo encontrado</h3>
                <p className="text-slate-500 mb-4">
                  {searchTerm ? "Tente ajustar sua pesquisa" : "Crie seu primeiro grupo de molduras"}
                </p>
                {!searchTerm && (
                  <PermissionGuard resource="groups" action="create">
                    <Button onClick={() => setShowNewGroupModal(true)} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Grupo
                    </Button>
                  </PermissionGuard>
                )}
              </div>
            )}

            {/* Estatísticas */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">Total de Grupos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">{grupos.length}</div>
                  <p className="text-sm text-slate-500">grupos criados</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">Grupos Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">{grupos.filter((g) => g.ativo).length}</div>
                  <p className="text-sm text-slate-500">em uso</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-violet-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-600">Total de Molduras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">
                    {grupos.reduce((acc, grupo) => acc + grupo.molduras, 0)}
                  </div>
                  <p className="text-sm text-slate-500">molduras organizadas</p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
