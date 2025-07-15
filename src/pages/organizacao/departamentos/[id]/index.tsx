"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Edit, Phone, MessageCircle, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { departmentsFullMock } from "@/modules/departamentos/data/departments-full-data"
import { Department } from "@/modules/departamentos/types/departments-full"

export default function DetalhesDepartamentoPage() {
  const params = useParams()
  const departmentId = params?.id ? Number(params.id) : null

  const [department, setDepartment] = useState<Department | null>(null)

  useEffect(() => {
    if (departmentId && departmentId > 0) {
      const found = departmentsFullMock.find((d) => d.id === departmentId) || null
      setDepartment(found)
    } else {
      setDepartment(null)
    }
  }, [departmentId])

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

  // Segurança extra para promoCodesList, caso seja opcional na interface
  const promoCodesList = department.promoCodesList ?? []

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
              <h1 className="text-2xl font-semibold text-slate-800">
                Detalhes do departamento: {department.name}
              </h1>
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
            <div className="max-w-2xl mx-auto space-y-4">
              <Item label="EU IA" value={department.id} />
              <Item label="nome" value={department.name} />
              <Item label="País" value={department.country} />
              <Item label="Fuso horário" value={department.timezone} />
              <Item label="Horário de corte diurno" value={department.cutoffTime} />
              <Item label="Contato de suporte" value={department.supportContact || "—"} />
              <Item
                label="Tipo de contato de suporte"
                value={
                  <div className="flex items-center gap-2">
                    {department.supportContactType === "whatsapp" ? (
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Phone className="w-4 h-4 text-blue-600" />
                    )}
                    <span className="text-slate-800 font-medium">{department.supportContactType}</span>
                  </div>
                }
              />
              <Item label="Suporte ao Tempo de Trabalho" value={department.workTimeSupport || "—"} />
              <Item label="ID do comerciante Ksher" value={department.ksherMerchantId || "—"} />
              <Item label="Chave Ksher" value={department.ksherKey || "—"} />

              {/* Lista de códigos promocionais rápidos */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600">Lista de códigos promocionais rápidos</span>
                </div>

                {promoCodesList.length > 0 ? (
                  <div className="space-y-4">
                    {promoCodesList.map((promo, index) => (
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

function Item({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-100">
      <span className="text-slate-600">{label}</span>
      <span className="text-slate-800 font-medium">{value}</span>
    </div>
  )
}
