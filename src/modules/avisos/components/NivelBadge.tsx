"use client"

import { Badge } from "@/components/ui/badge"

interface NivelBadgeProps {
  nivel: number
}

export default function NivelBadge({ nivel }: NivelBadgeProps) {
  const getNivelConfig = (nivel: number) => {
    if (nivel >= 90) {
      return {
        variant: "destructive" as const,
        className: "bg-red-500 hover:bg-red-600",
        label: "Crítico",
      }
    } else if (nivel >= 50) {
      return {
        variant: "default" as const,
        className: "bg-yellow-500 hover:bg-yellow-600",
        label: "Alerta",
      }
    } else {
      return {
        variant: "secondary" as const,
        className: "bg-blue-500 hover:bg-blue-600 text-white",
        label: "Info",
      }
    }
  }

  const config = getNivelConfig(nivel)

  return (
    <Badge variant={config.variant} className={config.className}>
      {nivel} - {config.label}
    </Badge>
  )
}
