"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Grid3X3 } from "lucide-react"

export default function Predefinicoes() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Predefinições de quiosque</h1>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Procurar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg">
            Criar predefinição de quiosque
          </Button>

          <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-20">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            {/* Icon */}
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
              <Grid3X3 className="w-12 h-12 text-gray-400" />
            </div>

            {/* Message */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-800">Nenhuma predefinição encontrada</h3>
              <p className="text-gray-600 max-w-md">
                Nenhuma predefinição de quiosque corresponde aos critérios fornecidos.
              </p>
            </div>

            {/* Action Button */}
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg">
            Criar predefinição de quiosque
          </Button>

          
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="text-sm text-pink-500">
          <span>FnPix © 2020 - 2025</span>
        </div>
      </footer>
    </div>
  )
}
