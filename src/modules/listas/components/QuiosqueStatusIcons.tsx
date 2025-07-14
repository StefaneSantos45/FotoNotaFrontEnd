"use client"

import { Printer, Wifi, DollarSign, HardDrive, Network, Droplet, BatteryCharging } from "lucide-react"
import type { QuiosqueStatusItem } from "../types"

interface QuiosqueStatusIconsProps {
  status: QuiosqueStatusItem[]
}

export default function QuiosqueStatusIcons({ status }: QuiosqueStatusIconsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "online":
        return Network
      case "printer":
        return Printer
      case "paper":
        return Droplet // Representa tinta/papel
      case "funnel":
        return HardDrive // Representa o funil/armazenamento
      case "coinAcceptor":
        return DollarSign
      case "billValidator":
        return DollarSign
      case "cardReader":
        return Wifi // Representa leitor de cartão/conexão
      case "network":
        return Network
      case "battery":
        return BatteryCharging
      default:
        return null
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {status.map((item, index) => {
        const Icon = getIcon(item.type)
        if (!Icon) return null
        return (
          <div key={index} className="relative group">
            <Icon
              className={`w-4 h-4 ${item.value ? "text-green-500" : "text-red-500"} transition-colors duration-200`}
            />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {item.type}: {item.value ? "OK" : "Problema"}
            </span>
          </div>
        )
      })}
    </div>
  )
}
