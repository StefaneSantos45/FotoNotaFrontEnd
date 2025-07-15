"use client"

import { Search, Table } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table as ShadcnTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Quiosque } from "../../types"

interface TabSessionLogProps {
  quiosque: Quiosque
}

export default function TabSessionLog({ quiosque }: TabSessionLogProps) {
  // Mock de dados de log de sessão, se houver
  const sessionLogs = quiosque.registroSessao || []

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">Logs de sessão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Procurar..."
              className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          {sessionLogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Table className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum registro de sessão encontrado</h3>
              <p className="text-gray-500">Nenhum registro de sessão correspondeu aos critérios fornecidos.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <ShadcnTable>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      ID da Sessão
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      Início
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">Fim</TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      Duração
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessionLogs.map((log, index) => (
                    <TableRow key={index} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="font-medium">{log.id}</TableCell>
                      <TableCell>{log.start}</TableCell>
                      <TableCell>{log.end}</TableCell>
                      <TableCell>{log.duration}</TableCell>
                      <TableCell>{log.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </ShadcnTable>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
