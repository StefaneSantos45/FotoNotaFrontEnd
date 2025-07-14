"use client"

import { Minus, Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import type { ConfiguracaoLocalizacao, HorarioFuncionamento } from "../types"

interface TabLocalizacaoProps {
  data: ConfiguracaoLocalizacao
  onChange: (data: ConfiguracaoLocalizacao) => void
}

export default function TabLocalizacao({ data, onChange }: TabLocalizacaoProps) {
  const updateData = (updates: Partial<ConfiguracaoLocalizacao>) => {
    onChange({ ...data, ...updates })
  }

  const updateHorario = (index: number, updates: Partial<HorarioFuncionamento>) => {
    const novosHorarios = [...data.horarioFuncionamento]
    novosHorarios[index] = { ...novosHorarios[index], ...updates }
    updateData({ horarioFuncionamento: novosHorarios })
  }

  const diasSemana = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo",
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="usar-horario-funcionamento"
          checked={data.usarHorarioFuncionamento}
          onCheckedChange={(checked) => updateData({ usarHorarioFuncionamento: !!checked })}
        />
        <Label htmlFor="usar-horario-funcionamento">*Use o horário de funcionamento</Label>
      </div>

      {data.usarHorarioFuncionamento && (
        <div className="space-y-4">
          <Label>Horário de funcionamento</Label>
          <div className="space-y-3">
            {diasSemana.map((dia, index) => {
              const horario = data.horarioFuncionamento[index] || {
                dia,
                inicio: "09:00",
                fim: "01:00",
                ativo: true,
              }

              return (
                <div key={dia} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-24 text-sm font-medium">{dia}</div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={horario.inicio}
                      onChange={(e) => updateHorario(index, { inicio: e.target.value })}
                      className="w-24"
                    />
                    <span>-</span>
                    <Input
                      type="time"
                      value={horario.fim}
                      onChange={(e) => updateHorario(index, { fim: e.target.value })}
                      className="w-24"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 p-0 bg-red-500 hover:bg-red-600 text-white border-red-500"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 p-0 bg-pink-500 hover:bg-pink-600 text-white border-pink-500"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
