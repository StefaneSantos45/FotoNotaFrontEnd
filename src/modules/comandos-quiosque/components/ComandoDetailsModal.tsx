"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Clock, Loader } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { Comando } from "../types"

interface ComandoDetailsModalProps {
  comando: Comando | null
  isOpen: boolean
  onClose: () => void
}

export const ComandoDetailsModal = ({ comando, isOpen, onClose }: ComandoDetailsModalProps) => {
  if (!comando) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "feito":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case "pendente":
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
            <div className="w-2 h-2 bg-amber-200 rounded-full"></div>
          </div>
        )
      case "executando":
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />
      case "erro":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-slate-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Detalhes do comando do quiosque: {comando.comandoId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Quiosque */}
                <div className="flex items-start justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Quiosque</span>
                  <span className="text-pink-600 font-semibold text-lg">
                    {comando.quiosque} ({comando.nomeQuiosque})
                  </span>
                </div>

                {/* Tipo */}
                <div className="flex items-start justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Tipo</span>
                  <span className="text-slate-800 font-medium">{comando.tipo}</span>
                </div>

                {/* Status */}
                <div className="flex items-start justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Status</span>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(comando.status)}
                    <span className="text-slate-700 font-medium">{comando.status}</span>
                  </div>
                </div>

                {/* Criado em */}
                <div className="flex items-start justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Criado em</span>
                  <span className="text-slate-800 font-medium">
                    {format(new Date(comando.criadoEm), "HH:mm dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </div>

                {/* Usuário */}
                <div className="flex items-start justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Usuário</span>
                  <span className="text-slate-800 font-medium">{comando.usuario || "—"}</span>
                </div>

                {/* Descrição */}
                <div className="flex items-start justify-between py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Descrição</span>
                  <span className="text-slate-800 font-medium text-right max-w-md">{comando.descricao}</span>
                </div>

                {/* Duração */}
                {comando.duracao && (
                  <div className="flex items-start justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Duração</span>
                    <span className="text-slate-800 font-medium">{comando.duracao}</span>
                  </div>
                )}

                {/* Resultado */}
                {comando.resultado && (
                  <div className="flex items-start justify-between py-3">
                    <span className="text-slate-600 font-medium">Resultado</span>
                    <span className="text-slate-800 font-medium text-right max-w-md">{comando.resultado}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center py-4">
            <span className="text-pink-600 font-semibold">FnPix</span>
            <span className="text-slate-500 ml-2">© 2020 - 2025</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
