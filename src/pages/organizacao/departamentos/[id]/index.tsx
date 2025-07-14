"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Edit, Phone, MessageCircle, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { departmentsFullMock } from "@/data/departments-full-data"
import type { Department } from "@/types/departments-full"

export default function DetalhesDepartamentoPage() {
  const params = useParams()
  const departmentId = Number.parseInt(params.id as string)
  const [department] = useState<Department | null>(departmentsFullMock.find((d) => d.id === departmentId) || null)

  if (!department) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Departamento não encontrado</h1>
          <p className="text-slate-600 mb-4">O departamento solicitado não existe.</p>
          <Link href="/organizacao/departamentos">
            <Button>Voltar para Departamentos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/organizacao/departamentos">
                <Button variant="ghost" size="sm" className="p-2 hover:bg-slate-100 rounded-full">
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-slate-800">Detalhes do departamento: {department.name}</h1>
            </div>
            <Link href={`/organizacao/departamentos/${department.id}/editar`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </Link>
          </div>
        </div>

        {/* Detalhes do Departamento */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            {/* Informações Básicas */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">EU IA</span>
                <span className="text-slate-800 font-medium">{department.id}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">nome</span>
                <span className="text-slate-800 font-medium">{department.name}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">País</span>
                <span className="text-slate-800 font-medium">{department.country}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Fuso horário</span>
                <span className="text-slate-800 font-medium">{department.timezone}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Horário de corte diurno</span>
                <span className="text-slate-800 font-medium">{department.cutoffTime}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Contato de suporte</span>
                <span className="text-slate-800 font-medium">{department.supportContact || "—"}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Tipo de contato de suporte</span>
                <div className="flex items-center gap-2">
                  {department.supportContactType === "whatsapp" ? (
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Phone className="w-4 h-4 text-blue-600" />
                  )}
                  <span className="text-slate-800 font-medium">{department.supportContactType}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Suporte ao Tempo de Trabalho</span>
                <span className="text-slate-800 font-medium">{department.workTimeSupport || "—"}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">ID do comerciante Ksher</span>
                <span className="text-slate-800 font-medium">{department.ksherMerchantId || "—"}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600">Chave Ksher</span>
                <span className="text-slate-800 font-medium">{department.ksherKey || "—"}</span>
              </div>

              {/* Lista de códigos promocionais rápidos */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600">Lista de códigos promocionais rápidos</span>
                </div>

                {department.promoCodesList.length > 0 ? (
                  <div className="space-y-4">
                    {department.promoCodesList.map((promo, index) => (
                      <div key={promo.id} className="space-y-2">
                        <div className="flex justify-between items-center py-2">
                          <div className="flex items-center gap-3">
                            <span className="text-pink-600 font-medium">#{index + 1}</span>
                            <span className="text-slate-600">Código promocional rápido</span>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                            {promo.code}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center py-2 pl-8">
                          <span className="text-slate-600">Valor</span>
                          <span className="text-slate-800 font-medium">{promo.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <Tag className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-500 text-sm">Nenhum código promocional cadastrado</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
