"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "@/components/ui/select"
import { BarChart3, TrendingUp, Printer, Users, Camera } from "lucide-react"

export default function DashboardContent() {
  const statsCards = [
    {
      title: "Receita de quiosque",
      value: "0",
      unit: "BRLs",
      subtitle: "Sem dados",
      color: "from-blue-500 to-cyan-500",
      icon: TrendingUp,
    },
    {
      title: "Impressão de quiosque",
      value: "0",
      unit: "fotos",
      subtitle: "Sem dados",
      color: "from-emerald-500 to-teal-500",
      icon: Printer,
    },
    {
      title: "Sessão de quiosque",
      value: "0",
      unit: "sessões",
      subtitle: "Sem dados",
      color: "from-violet-500 to-purple-500",
      icon: Users,
    },
  ]

  const printSources = [
    { name: "Instagram", value: "0 - 0%", color: "bg-pink-500" },
    { name: "Facebook", value: "0 - 0%", color: "bg-blue-600" },
    { name: "Do telefone", value: "0 - 0%", color: "bg-slate-500" },
    { name: "Telefone Doc", value: "0 - 0%", color: "bg-emerald-500" },
    { name: "Selfie", value: "0 - 0%", color: "bg-violet-500" },
  ]

  const kioskStatus = [
    { name: "on-line", value: "0 - 0.00%", color: "bg-emerald-500" },
    { name: "off-line", value: "4 - 100.00%", color: "bg-red-500" },
    { name: "começar", value: "0 - 0.00%", color: "bg-blue-500" },
    { name: "quebrado", value: "0 - 0.00%", color: "bg-amber-500" },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Painel de Controle</h1>
        <p className="text-slate-600 text-lg">Visão geral das suas estatísticas e atividades em tempo real</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <Card
            key={index}
            className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
          >
            <div className={`h-1 bg-gradient-to-r ${card.color}`} />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}
                  >
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-sm font-semibold text-slate-600">{card.title}</CardTitle>
                </div>
                <Select defaultValue="hoje">
                  <SelectTrigger className="w-24 h-8 text-xs border-slate-200 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hoje">Hoje</SelectItem>
                    <SelectItem value="semana">Semana</SelectItem>
                    <SelectItem value="mes">Mês</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-slate-800">{card.value}</span>
                <span className="text-sm text-slate-500 font-medium">{card.unit}</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-slate-800">Receita Detalhada</CardTitle>
              <Select defaultValue="hoje">
                <SelectTrigger className="w-24 h-8 text-xs border-slate-200 focus:border-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoje">Hoje</SelectItem>
                  <SelectItem value="semana">Semana</SelectItem>
                  <SelectItem value="mes">Mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32 text-slate-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <BarChart3 className="w-8 h-8 text-slate-400" />
                </div>
                <span className="text-2xl font-bold text-slate-400">0</span>
                <p className="text-sm font-medium">BRLs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Print Sources */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-slate-800">Fontes de Impressão</CardTitle>
              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">(0 total)</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {printSources.map((source, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className={`w-4 h-4 rounded-full ${source.color} shadow-sm`} />
                  <span className="text-sm text-slate-700 flex-1 font-medium">{source.name}</span>
                  <span className="text-sm text-slate-500 font-mono">{source.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Kiosk Status */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-slate-800">Status dos Quiosques</CardTitle>
              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">(4 total)</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
              {/* Lista de status - lado esquerdo */}
              <div className="space-y-4 flex-1">
                {kioskStatus.map((status, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className={`w-4 h-4 rounded-full ${status.color} shadow-sm`} />
                    <span className="text-sm text-slate-700 flex-1 font-medium capitalize">{status.name}</span>
                    <span className="text-sm text-slate-500 font-mono">{status.value}</span>
                  </div>
                ))}
              </div>

              {/* Gráfico de rosca - lado direito */}
              <div className="flex items-center justify-center ml-6">
                <div className="relative w-20 h-20">
                  {/* Círculo de fundo */}
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Círculo preenchido (100% off-line = laranja) */}
                    <path
                      className="text-orange-500"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray="100, 100"
                      d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  {/* Texto central */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-600">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-slate-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
          <Camera className="w-4 h-4" />
          <span>FnPix © 2020 - 2025 • Todos os direitos reservados</span>
        </div>
      </footer>
    </>
  )
}
