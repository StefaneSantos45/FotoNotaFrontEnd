"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, User, Mail, Phone, Lock, Building2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { departmentsMock } from "../../../../../../data/departments-data"
import { usersMock } from "../../../../../../data/users-data"

interface EditUserData {
  name: string
  email: string
  phoneNumber?: string
  departmentId: number
  active: boolean
  changePassword: boolean
  newPassword?: string
}

export default function EditarUsuarioPage() {
  const params = useParams()
  const router = useRouter()

  const idParam = typeof params?.id === "string" ? params.id : null
  const userId = idParam ? Number.parseInt(idParam) : null

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<EditUserData>({
    name: "",
    email: "",
    phoneNumber: "",
    departmentId: 0,
    active: true,
    changePassword: false,
    newPassword: "",
  })

  useEffect(() => {
    if (!userId) return

    const user = usersMock.find((u) => u.id === userId)
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phoneNumber: "", // se necessário, adicione no mock
        departmentId: 1,
        active: user.active,
        changePassword: false,
        newPassword: "",
      })
    }
  }, [userId])


  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (formData.changePassword && !formData.newPassword) {
      newErrors.newPassword = "Nova senha é obrigatória"
    } else if (formData.changePassword && formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = "Senha deve ter pelo menos 6 caracteres"
    }

    if (!formData.departmentId) {
      newErrors.departmentId = "Departamento é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Atualizando usuário:", formData)
      router.push(`/organizacao/usuarios/${userId}`)
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof EditUserData, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/organizacao/usuarios/${userId}`}>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Editar Usuário</h1>
            <p className="text-slate-600">Atualize as informações do usuário</p>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="bg-gray-50/80 border-b">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <User className="w-5 h-5" />
              Informações do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                Nome <span className="text-pink-600">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`pl-10 bg-white border-slate-200 focus:border-pink-600 focus:ring-pink-600/20 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email <span className="text-pink-600">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-10 bg-white border-slate-200 focus:border-pink-600 focus:ring-pink-600/20 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                Telefone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className="pl-10 bg-white border-slate-200 focus:border-pink-600 focus:ring-pink-600/20"
                />
              </div>
            </div>

            {/* Departamento */}
            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium text-slate-700">
                Departamento <span className="text-pink-600">*</span>
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                <Select
                  value={formData.departmentId.toString()}
                  onValueChange={(value) => handleInputChange("departmentId", Number.parseInt(value))}
                >
                  <SelectTrigger
                    className={`pl-10 bg-white border-slate-200 focus:border-pink-600 focus:ring-pink-600/20 ${
                      errors.departmentId ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Selecione um departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departmentsMock
                      .filter((dept) => dept.active)
                      .map((department) => (
                        <SelectItem key={department.id} value={department.id.toString()}>
                          {department.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.departmentId && <p className="text-sm text-red-500">{errors.departmentId}</p>}
            </div>

            {/* Status */}
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => handleInputChange("active", checked)}
              />
              <Label htmlFor="active" className="text-sm font-medium text-slate-700">
                Usuário ativo
              </Label>
            </div>

            {/* Alterar Senha */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="changePassword"
                  checked={formData.changePassword}
                  onCheckedChange={(checked) => handleInputChange("changePassword", checked)}
                />
                <Label htmlFor="changePassword" className="text-sm font-medium text-slate-700">
                  Alterar senha
                </Label>
              </div>

              {formData.changePassword && (
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-medium text-slate-700">
                    Nova senha <span className="text-pink-600">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nova senha"
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange("newPassword", e.target.value)}
                      className={`pl-10 pr-10 bg-white border-slate-200 focus:border-pink-600 focus:ring-pink-600/20 ${
                        errors.newPassword ? "border-red-500" : ""
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword}</p>}
                </div>
              )}
            </div>
          </CardContent>

          {/* Actions */}
          <div className="px-8 pb-8">
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Link href={`/organizacao/usuarios/${userId}`}>
                <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-600">
                  Cancelar
                </Button>
              </Link>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 font-medium shadow-sm"
              >
                {isLoading ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
