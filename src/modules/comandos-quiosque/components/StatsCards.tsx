"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Terminal, Clock, Loader, CheckCircle, AlertCircle } from "lucide-react"
import type { ComandoStats } from "../types"

interface StatsCardsProps {
  stats: ComandoStats
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: "Total de Comandos",
      value: stats.total,
      description: "comandos registrados",
      icon: Terminal,
      color: "text-slate-800",
    },
    {
      title: "Pendentes",
      value: stats.pendentes,
      description: "aguardando execução",
      icon: Clock,
      color: "text-amber-600",
    },
    {
      title: "Executando",
      value: stats.executando,
      description: "em andamento",
      icon: Loader,
      color: "text-blue-600",
    },
    {
      title: "Concluídos",
      value: stats.feitos,
      description: "executados com sucesso",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      title: "Com Erro",
      value: stats.comErro,
      description: "falharam na execução",
      icon: AlertCircle,
      color: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      {cards.map((card) => (
        <Card key={card.title} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-600 flex items-center">
              <card.icon className="w-4 h-4 mr-2" />
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
            <p className="text-sm text-slate-500">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
