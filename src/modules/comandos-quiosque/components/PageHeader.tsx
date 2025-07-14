"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface PageHeaderProps {
  isRefreshing: boolean
  onRefresh: () => void
}

export const PageHeader = ({ isRefreshing, onRefresh }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-4xl font-bold text-slate-800">Comandos do Quiosque</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 hover:bg-slate-100 rounded-full"
            title="Atualizar dados"
          >
            <RefreshCw className={`w-5 h-5 text-slate-600 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>
      <p className="text-slate-600 text-lg mt-3">Execute comandos remotos nos quiosques da sua rede</p>
    </div>
  )
}
