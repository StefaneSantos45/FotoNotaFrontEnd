"use client"

import { Table, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onCreateClick: () => void
}

export default function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Table className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma predefinição encontrada</h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        Nenhuma predefinição de quiosque corresponde aos critérios fornecidos.
      </p>
      <Button onClick={onCreateClick} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg">
        <Plus className="w-4 h-4 mr-2" />
        Criar predefinição de quiosque
      </Button>
     
    </div>
  )
}
