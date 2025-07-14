"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ComandoFilters } from "../types"

interface AdvancedFiltersProps {
  filters: ComandoFilters
  onFiltersChange: (filters: ComandoFilters) => void
  onClearFilters: () => void
}

export const AdvancedFilters = ({ filters, onFiltersChange, onClearFilters }: AdvancedFiltersProps) => {
  const updateFilter = (key: keyof ComandoFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800 flex items-center justify-between">
          <span>Filtros Avançados</span>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Limpar Filtros
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtro por Status */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
            <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="executando">Executando</SelectItem>
                <SelectItem value="feito">Feito</SelectItem>
                <SelectItem value="erro">Erro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por Tipo */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Tipo de Comando</label>
            <Select value={filters.tipo} onValueChange={(value) => updateFilter("tipo", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="reiniciarAplicativo">Reiniciar Aplicativo</SelectItem>
                <SelectItem value="carregarAplicação">Carregar Aplicação</SelectItem>
                <SelectItem value="reinício">Reinício</SelectItem>
                <SelectItem value="limparCache">Limpar Cache</SelectItem>
                <SelectItem value="atualizarSoftware">Atualizar Software</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por Quiosque */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Quiosque</label>
            <Select value={filters.quiosque} onValueChange={(value) => updateFilter("quiosque", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Quiosques</SelectItem>
                <SelectItem value="10199">10199 (Guararapes)</SelectItem>
                <SelectItem value="10200">10200 (Loja Recife)</SelectItem>
                <SelectItem value="10201">10201 (Tacaruna)</SelectItem>
                <SelectItem value="10202">10202 (RioMar)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por Usuário */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Usuário</label>
            <Select value={filters.usuario} onValueChange={(value) => updateFilter("usuario", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="com_usuario">Com Usuário</SelectItem>
                <SelectItem value="sem_usuario">Automático</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
