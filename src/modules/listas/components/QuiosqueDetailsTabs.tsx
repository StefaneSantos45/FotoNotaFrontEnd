"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, Activity, FolderOpen, Command, Monitor } from "lucide-react"
import type { Quiosque } from "../types"
import TabSessionLog from "./tabs/TabSessionLog"
import TabCollections from "./tabs/TabCollections"
import TabCommands from "./tabs/TabCommands"
import TabDeviceStatus from "./tabs/TabDeviceStatus"
import TabConfigurations from "./tabs/TabConfigurations"

interface QuiosqueDetailsTabsProps {
  quiosque: Quiosque
}

export default function QuiosqueDetailsTabs({ quiosque }: QuiosqueDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState("registro-sessao")

  const tabConfig = [
    { id: "registro-sessao", label: "Registro de sessão", icon: Activity, color: "from-pink-500 to-rose-500" },
    { id: "colecoes", label: "Coleções", icon: FolderOpen, color: "from-purple-500 to-indigo-500" },
    { id: "comandos", label: "Comandos", icon: Command, color: "from-orange-500 to-amber-500" },
    { id: "status-dispositivo", label: "Status do dispositivo", icon: Monitor, color: "from-blue-500 to-cyan-500" },
    { id: "configuracoes", label: "Configurações", icon: Settings, color: "from-emerald-500 to-teal-500" },
  ]

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {tabConfig.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative p-4 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r " + tab.color + " text-white shadow-lg transform scale-105"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive ? "bg-white/20" : "bg-white"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-600"}`} />
                      </div>
                      <span className="text-sm font-medium text-center">{tab.label}</span>
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl ring-2 ring-white/50 ring-offset-2 ring-offset-transparent" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="p-6">
            <TabsContent value="registro-sessao" className="mt-0">
              <TabSessionLog quiosque={quiosque} />
            </TabsContent>
            <TabsContent value="colecoes" className="mt-0">
              <TabCollections quiosque={quiosque} />
            </TabsContent>
            <TabsContent value="comandos" className="mt-0">
              <TabCommands quiosque={quiosque} />
            </TabsContent>
            <TabsContent value="status-dispositivo" className="mt-0">
              <TabDeviceStatus quiosque={quiosque} />
            </TabsContent>
            <TabsContent value="configuracoes" className="mt-0">
              <TabConfigurations quiosque={quiosque} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
