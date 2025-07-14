"use client"

import { Search, Command, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { Quiosque } from "../../types"

interface TabCommandsProps {
  quiosque: Quiosque
}

export default function TabCommands({ quiosque }: TabCommandsProps) {
  const commands = quiosque.comandos || []

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">Comandos de quiosque</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Procurar..."
              className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>

          {commands.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Command className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum comando encontrado</h3>
              <p className="text-gray-500">Nenhum comando correspondeu aos critérios fornecidos.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      TIPO
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      STATUS
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      CRIADO EM
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider">
                      USUÁRIO
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 uppercase text-xs tracking-wider text-right">
                      AÇÕES
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {commands.map((command, index) => (
                    <TableRow key={index} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="font-medium">{command.tipo}</TableCell>
                      <TableCell className="text-slate-600">{command.status}</TableCell>
                      <TableCell className="text-slate-600">{command.criadoEm}</TableCell>
                      <TableCell className="text-slate-600">{command.usuario}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-200 hover:border-blue-300 hover:text-blue-600 bg-transparent"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
