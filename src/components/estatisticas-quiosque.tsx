"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

export default function EstatisticasQuiosque() {
  const [activeTab, setActiveTab] = useState("quiosques")
  const [selectedMonth, setSelectedMonth] = useState("junho-2025")
  const [selectedRegion, setSelectedRegion] = useState("fotonotabr-brasil")
  const [selectedMetric, setSelectedMetric] = useState("renda")
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number
    y: number
    date: string
    value: string
    show: boolean
  }>({ x: 0, y: 0, date: "", value: "", show: false })

  const statsCards = [
    {
      title: "Renda",
      value: "161",
      subtitle: "por dia",
      color: "bg-blue-500",
    },
    {
      title: "Imprimir",
      value: "23",
      subtitle: "por dia",
      color: "bg-emerald-500",
    },
    {
      title: "Sessões de impressão",
      value: "18",
      subtitle: "por dia",
      color: "bg-orange-500",
    },
    {
      title: "Sessões",
      value: "31",
      subtitle: "por dia",
      color: "bg-pink-500",
    },
  ]

  const generateDaysInMonth = (pattern: "high" | "medium" | "low") => {
    return Array.from({ length: 30 }, (_, i) => {
      const day = i + 1
      let baseValue = 0

      // Simular diferentes padrões de atividade
      if (pattern === "high") {
        // Quiosque com boa performance
        baseValue = Math.random() * 150 + 50 // R$50 a R$200
        // Fins de semana com mais movimento
        if (day % 7 === 0 || day % 7 === 6) {
          baseValue *= 1.5
        }
      } else if (pattern === "medium") {
        // Quiosque com performance média
        baseValue = Math.random() * 80 + 20 // R$20 a R$100
        // Alguns dias sem movimento
        if (Math.random() < 0.2) baseValue = 0
      } else {
        // Quiosque com baixa performance
        baseValue = Math.random() * 40 + 5 // R$5 a R$45
        // Muitos dias sem movimento
        if (Math.random() < 0.4) baseValue = 0
      }

      return {
        day,
        value: Math.round(baseValue * 100) / 100,
        date: `${String(day).padStart(2, "0")}/06/2025`,
        displayDate: `${String(day).padStart(2, "0")}/06`,
      }
    })
  }

  const quiosquesData = [
    {
      id: "10199",
      name: "Guararapes",
      total: "R$2.847,50",
      data: generateDaysInMonth("high"),
    },
    {
      id: "10201",
      name: "Tacaruna",
      total: "R$1.523,80",
      data: generateDaysInMonth("medium"),
    },
    {
      id: "10200",
      name: "Shop Recife",
      total: "R$456,20",
      data: generateDaysInMonth("low"),
    },
  ]

  const departamentosData = [
    {
      name: "FotoNotaBR (Brasil)",
      total: "R$4.827,50",
      data: generateDaysInMonth("high"),
    },
  ]

  const proprietariosData = [
    {
      name: "Brasil",
      total: "R$4.827,50",
      data: generateDaysInMonth("high"),
    },
  ]

  const getCurrentData = () => {
    switch (activeTab) {
      case "departamentos":
        return departamentosData
      case "proprietarios":
        return proprietariosData
      default:
        return quiosquesData
    }
  }

  const handleMouseEnter = (event: React.MouseEvent, date: string, value: number) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const scrollY = window.scrollY
    setHoveredPoint({
      x: rect.left + rect.width / 2,
      y: rect.top + scrollY - 10,
      date,
      value: activeTab === "proprietarios" ? `Income: R$ ${value.toFixed(2)}` : `Renda: R$ ${value.toFixed(2)}`,
      show: true,
    })
  }

  const handleMouseLeave = () => {
    setHoveredPoint((prev) => ({ ...prev, show: false }))
  }

  const tabs = [
    { id: "quiosques", label: "Quiosques" },
    { id: "departamentos", label: "Departamentos" },
    { id: "proprietarios", label: "Proprietários" },
  ]

  return (
    <div className="space-y-6">
      {/* Tooltip */}
      {hoveredPoint.show && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none"
          style={{
            left: hoveredPoint.x - 60,
            top: hoveredPoint.y - 80,
          }}
        >
          <div className="text-sm text-gray-600 mb-1">{hoveredPoint.date}</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium">{hoveredPoint.value}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">Estatísticas do Quiosque</h1>
        <p className="text-slate-600 text-lg">Histórico de desempenho dos seus quiosques</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <Card key={index} className={`overflow-hidden border-0 shadow-lg ${card.color} text-white`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <div className="text-sm text-white/80">{card.subtitle}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{card.value}</div>
                  <div className="text-xl font-bold">{card.value}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg bg-white">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-40 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junho-2025">Junho de 2025</SelectItem>
                  <SelectItem value="maio-2025">Maio de 2025</SelectItem>
                  <SelectItem value="abril-2025">Abril de 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fotonotabr-brasil">FotoNotaBR (Brasil)</SelectItem>
                  <SelectItem value="fotonotabr-sp">FotoNotaBR (São Paulo)</SelectItem>
                  <SelectItem value="fotonotabr-rj">FotoNotaBR (Rio de Janeiro)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-32 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="renda">Renda</SelectItem>
                <SelectItem value="impressoes">Impressões</SelectItem>
                <SelectItem value="sessoes">Sessões</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-sm hover:bg-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Data Charts */}
      <div className="space-y-8">
        {getCurrentData().map((item, itemIndex) => (
          <Card key={itemIndex} className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {activeTab === "quiosques" && (
                    <Badge variant="outline" className="text-sm font-mono border-gray-300">
                      {(item as any).id}
                    </Badge>
                  )}
                  <h3 className="text-xl font-bold text-gray-800">
                    {activeTab === "quiosques" ? (item as any).name : item.name}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">total</p>
                  <p className="text-lg font-bold text-gray-800">{item.total}</p>
                </div>
              </div>

              {/* Chart Container */}
              <div className="relative bg-gray-50 rounded-lg p-4">
                {/* Y-axis labels */}
                <div className="absolute left-2 top-4 bottom-16 flex flex-col justify-between text-xs text-gray-500">
                  {(() => {
                    const maxValue = Math.max(...item.data.map((d) => d.value))
                    return [
                      <span key="max">R${maxValue.toFixed(0)}</span>,
                      <span key="75">R${(maxValue * 0.75).toFixed(0)}</span>,
                      <span key="50">R${(maxValue * 0.5).toFixed(0)}</span>,
                      <span key="25">R${(maxValue * 0.25).toFixed(0)}</span>,
                      <span key="0">R$0</span>,
                    ]
                  })()}
                </div>

                {/* Chart area */}
                <div className="ml-12 mr-4">
                  {/* Grid lines */}
                  <div className="relative h-40">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="border-t border-gray-300" />
                      ))}
                    </div>

                    {/* Line Chart */}
                    <svg className="w-full h-full absolute inset-0">
                      {/* Linha conectando os pontos */}
                      <path
                        d={(() => {
                          const maxValue = Math.max(...item.data.map((d) => d.value)) || 1
                          const points = item.data
                            .map((dataPoint, index) => {
                              const x = (index * 100) / (item.data.length - 1)
                              const y = 100 - (dataPoint.value / maxValue) * 80 // 80% da altura disponível
                              return `${index === 0 ? "M" : "L"} ${x}% ${y}%`
                            })
                            .join(" ")
                          return points
                        })()}
                        stroke="#3b82f6"
                        strokeWidth="2"
                        fill="none"
                      />

                      {/* Data points */}
                      {item.data.map((dataPoint, index) => {
                        const maxValue = Math.max(...item.data.map((d) => d.value)) || 1
                        const x = (index * 100) / (item.data.length - 1)
                        const y = 100 - (dataPoint.value / maxValue) * 80

                        return (
                          <circle
                            key={index}
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="4"
                            fill={dataPoint.value > 0 ? "#3b82f6" : "#94a3b8"}
                            className="cursor-pointer"
                            onMouseEnter={(e) => handleMouseEnter(e, dataPoint.date, dataPoint.value)}
                            onMouseLeave={handleMouseLeave}
                          />
                        )
                      })}
                    </svg>
                  </div>

                  {/* X-axis labels - melhorado */}
                  <div className="mt-4 relative">
                    <div className="flex justify-between text-xs text-gray-600">
                      {item.data.map((dataPoint, index) => (
                        <span
                          key={index}
                          className={`text-center ${index % 5 === 0 ? "font-medium" : "text-gray-400"}`}
                          style={{
                            width: `${100 / item.data.length}%`,
                            display: index % 5 === 0 ? "block" : "none",
                          }}
                        >
                          {dataPoint.displayDate}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Values row - melhorado */}
              <div className="mt-4 bg-blue-50 rounded-lg p-3">
                <div className="flex justify-between items-center text-xs text-blue-700 font-medium overflow-x-auto">
                  <span className="text-sm text-gray-600 mr-4">Valores diários:</span>
                  <div className="flex space-x-2">
                    {item.data.slice(0, 10).map((dataPoint, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs ${
                          dataPoint.value > 0 ? "bg-white text-blue-600 font-medium" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        R${dataPoint.value.toFixed(2)}
                      </span>
                    ))}
                    {item.data.length > 10 && <span className="text-gray-500">... +{item.data.length - 10} dias</span>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {(activeTab === "departamentos" || activeTab === "proprietarios") && (
        <div className="flex justify-center space-x-4">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2">Página anterior</Button>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2">Próxima página</Button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="text-sm text-pink-500">
          <span>FnPix © 2020 - 2025</span>
        </div>
      </footer>
    </div>
  )
}
