"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Terminal, Monitor, User, Eye, CheckCircle, AlertCircle, Clock, Loader } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Comando } from "../types"

interface ComandosTableProps {
  comandos: Comando[]
  onViewDetails: (comando: Comando) => void
}

export const ComandosTable = ({ comandos, onViewDetails }: ComandosTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "feito":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Feito</Badge>
      case "pendente":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pendente</Badge>
      case "executando":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Executando</Badge>
      case "erro":
        return <Badge variant="destructive">Erro</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "feito":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case "pendente":
        return <Clock className="w-4 h-4 text-amber-500" />
      case "executando":
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />
      case "erro":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-slate-500" />
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "reiniciarAplicativo":
        return "from-blue-500 to-cyan-500"
      case "carregarAplicação":
        return "from-emerald-500 to-teal-500"
      case "reinício":
        return "from-violet-500 to-purple-500"
      case "limparCache":
        return "from-amber-500 to-orange-500"
      case "atualizarSoftware":
        return "from-pink-500 to-rose-500"
      default:
        return "from-slate-500 to-slate-600"
    }
  }

  const formatTipo = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      reiniciarAplicativo: "Reiniciar Aplicativo",
      carregarAplicação: "Carregar Aplicação",
      reinício: "Reinício",
      limparCache: "Limpar Cache",
      atualizarSoftware: "Atualizar Software",
    }
    return tipos[tipo] || tipo
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800">Lista de Comandos</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200">
              <TableHead className="font-semibold text-slate-700">Quiosque</TableHead>
              <TableHead className="font-semibold text-slate-700">Tipo</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Status</TableHead>
              <TableHead className="font-semibold text-slate-700">Criado Em</TableHead>
              <TableHead className="font-semibold text-slate-700">Usuário</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comandos.map((comando) => (
              <TableRow key={comando.id} className="border-slate-200 hover:bg-slate-50/50">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-pink-600">
                        {comando.quiosque} ({comando.nomeQuiosque})
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-6 h-6 bg-gradient-to-r ${getTipoColor(comando.tipo)} rounded-md flex items-center justify-center`}
                    >
                      <Terminal className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{formatTipo(comando.tipo)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon(comando.status)}
                    {getStatusBadge(comando.status)}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium text-slate-800">
                      {format(new Date(comando.criadoEm), "HH:mm dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </div>
                    {comando.duracao && <div className="text-sm text-slate-500">Duração: {comando.duracao}</div>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {comando.usuario ? (
                      <>
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-700">{comando.usuario}</span>
                      </>
                    ) : (
                      <span className="text-sm text-slate-500">—</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <Button variant="ghost" size="sm" title="Ver detalhes" onClick={() => onViewDetails(comando)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
