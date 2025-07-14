"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Phone, MessageCircle, X, Plus, Tag, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { countriesMock, departmentsFullMock } from "@/data/departments-full-data"
import type { CreateDepartmentData, PromoCode } from "@/types/departments-full"

export default function EditarDepartamentoPage() {
  const params = useParams()
  const router = useRouter()
  const departmentId = Number.parseInt(params.id as string)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false)
  const [newPromoCode, setNewPromoCode] = useState({ code: "", value: "" })

  const [formData, setFormData] = useState<CreateDepartmentData>({
    name: "",
    country: "",
    timezone: "Europe/Madrid",
    cutoffTime: "05:00",
    supportContact: "",
    supportContactType: "telefone",
    workTimeSupport: "",
    ksherMerchantId: "",
    ksherKey: "",
    promoCodesList: [],
  })

  // Carregar dados do departamento
  useEffect(() => {
    const department = departmentsFullMock.find((d) => d.id === departmentId)
    if (department) {
      setFormData({
        name: department.name,
        country: department.country,
        timezone: department.timezone,
        cutoffTime: department.cutoffTime,
        supportContact: department.supportContact,
        supportContactType: department.supportContactType,
        workTimeSupport: department.workTimeSupport,
        ksherMerchantId: department.ksherMerchantId,
        ksherKey: department.ksherKey,
        promoCodesList: department.promoCodesList,
      })
    }
  }, [departmentId])

  const selectedCountry = countriesMock.find((c) => c.name === formData.country)

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.country) {
      newErrors.country = "País é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Atualizando departamento:", formData)
      router.push(`/organizacao/departamentos/${departmentId}`)
    } catch (error) {
      console.error("Erro ao atualizar departamento:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof CreateDepartmentData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleAddPromoCode = () => {
    if (newPromoCode.code && newPromoCode.value) {
      const promoCode: PromoCode = {
        id: Date.now().toString(),
        code: newPromoCode.code,
        value: Number.parseFloat(newPromoCode.value),
      }
      setFormData((prev) => ({
        ...prev,
        promoCodesList: [...prev.promoCodesList, promoCode],
      }))
      setNewPromoCode({ code: "", value: "" })
      setIsPromoModalOpen(false)
    }
  }

  const handleRemovePromoCode = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      promoCodesList: prev.promoCodesList.filter((code) => code.id !== id),
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/organizacao/departamentos/${departmentId}`}>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Editar departamento</h1>
            <p className="text-slate-600">Atualize as informações do departamento</p>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="bg-gray-50/80 border-b">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Building2 className="w-5 h-5" />
              Informações do Departamento
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome do departamento"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* País */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium text-slate-700">
                  País <span className="text-pink-600">*</span>
                </Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger
                    className={`bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 ${
                      errors.country ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Selecione um país" />
                  </SelectTrigger>
                  <SelectContent>
                    {countriesMock.map((country) => (
                      <SelectItem key={country.code} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
              </div>

              {/* Fuso horário */}
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-sm font-medium text-slate-700">
                  Fuso horário
                </Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => handleInputChange("timezone", value)}
                  disabled={!selectedCountry}
                >
                  <SelectTrigger className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20">
                    <SelectValue placeholder="Selecione um fuso horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCountry?.timezones.map((timezone) => (
                      <SelectItem key={timezone} value={timezone}>
                        {timezone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Horário de corte diurno */}
              <div className="space-y-2">
                <Label htmlFor="cutoffTime" className="text-sm font-medium text-slate-700">
                  Horário de corte diurno
                </Label>
                <Input
                  id="cutoffTime"
                  type="time"
                  value={formData.cutoffTime}
                  onChange={(e) => handleInputChange("cutoffTime", e.target.value)}
                  className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20"
                />
              </div>

              {/* Contato de suporte */}
              <div className="space-y-2">
                <Label htmlFor="supportContact" className="text-sm font-medium text-slate-700">
                  Contato de suporte
                </Label>
                <Input
                  id="supportContact"
                  type="text"
                  placeholder="Contato de suporte"
                  value={formData.supportContact}
                  onChange={(e) => handleInputChange("supportContact", e.target.value)}
                  className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20"
                />
              </div>

              {/* Tipo do contato de suporte */}
              <div className="space-y-2">
                <Label htmlFor="supportContactType" className="text-sm font-medium text-slate-700">
                  Tipo do contato de suporte
                </Label>
                <Select
                  value={formData.supportContactType}
                  onValueChange={(value: "telefone" | "whatsapp") => handleInputChange("supportContactType", value)}
                >
                  <SelectTrigger className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20">
                    <SelectValue placeholder="Escolha uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telefone">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        telefone
                      </div>
                    </SelectItem>
                    <SelectItem value="whatsapp">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Suporte ao Tempo de Trabalho */}
            <div className="space-y-2">
              <Label htmlFor="workTimeSupport" className="text-sm font-medium text-slate-700">
                Suporte ao Tempo de Trabalho
              </Label>
              <Input
                id="workTimeSupport"
                type="text"
                placeholder="Ex: 08:00 - 18:00"
                value={formData.workTimeSupport}
                onChange={(e) => handleInputChange("workTimeSupport", e.target.value)}
                className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ID do comerciante Ksher */}
              <div className="space-y-2">
                <Label htmlFor="ksherMerchantId" className="text-sm font-medium text-slate-700">
                  ID do comerciante Ksher
                </Label>
                <Input
                  id="ksherMerchantId"
                  type="text"
                  placeholder="ID do comerciante Ksher"
                  value={formData.ksherMerchantId}
                  onChange={(e) => handleInputChange("ksherMerchantId", e.target.value)}
                  className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20"
                />
              </div>
            </div>

            {/* Chave Ksher */}
            <div className="space-y-2">
              <Label htmlFor="ksherKey" className="text-sm font-medium text-slate-700">
                Chave Ksher
              </Label>
              <Textarea
                id="ksherKey"
                placeholder="Chave Ksher"
                value={formData.ksherKey}
                onChange={(e) => handleInputChange("ksherKey", e.target.value)}
                className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 min-h-[100px]"
              />
            </div>

            {/* Lista de códigos promocionais rápidos */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700">Lista de códigos promocionais rápidos</Label>
                <Button
                  type="button"
                  onClick={() => setIsPromoModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar código
                </Button>
              </div>

              {formData.promoCodesList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {formData.promoCodesList.map((promo) => (
                    <div key={promo.id} className="relative group">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Tag className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <Badge variant="outline" className="bg-white text-blue-700 border-blue-300 font-medium">
                              {promo.code}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">Valor: {promo.value}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemovePromoCode(promo.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  <Tag className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500 text-sm">Nenhum código promocional adicionado</p>
                  <p className="text-gray-400 text-xs">Clique em "Adicionar código" para começar</p>
                </div>
              )}
            </div>
          </CardContent>

          {/* Actions */}
          <div className="px-8 pb-8">
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Link href={`/organizacao/departamentos/${departmentId}`}>
                <Button variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-600">
                  Cancelar
                </Button>
              </Link>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium shadow-sm"
              >
                {isLoading ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Modal de Código Promocional */}
        <Dialog open={isPromoModalOpen} onOpenChange={setIsPromoModalOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-600" />
                Adicionar Código Promocional
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="promoCode" className="text-sm font-medium text-slate-700">
                  Código promocional rápido
                </Label>
                <Input
                  id="promoCode"
                  type="text"
                  placeholder="Ex: DESCONTO10"
                  value={newPromoCode.code}
                  onChange={(e) => setNewPromoCode({ ...newPromoCode, code: e.target.value.toUpperCase() })}
                  className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="promoValue" className="text-sm font-medium text-slate-700">
                  Valor <span className="text-pink-600">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="promoValue"
                    type="number"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    value={newPromoCode.value}
                    onChange={(e) => setNewPromoCode({ ...newPromoCode, value: e.target.value })}
                    className="bg-white border-slate-200 focus:border-blue-600 focus:ring-blue-600/20 pr-12"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                </div>
              </div>

              {newPromoCode.code && newPromoCode.value && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">Preview:</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-blue-600 text-white">{newPromoCode.code}</Badge>
                    <span className="text-sm text-blue-700">- {newPromoCode.value}% de desconto</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsPromoModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleAddPromoCode}
                disabled={!newPromoCode.code || !newPromoCode.value}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar código
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
