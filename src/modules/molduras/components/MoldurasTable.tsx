"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Frame, Edit, Trash2 } from "lucide-react"
import { MolduraCompleta } from "../types/moluras"

interface MoldurasTableProps {
  currentData: MolduraCompleta[]
  onEdit: (moldura: MolduraCompleta) => void
  onDelete: (moldura: MolduraCompleta) => void
}

export function MoldurasTable({ currentData, onEdit, onDelete }: MoldurasTableProps) {
  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-slate-800 flex items-center">
          <Frame className="w-5 h-5 mr-2" />
          Lista de Molduras ({currentData.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200">
              <TableHead className="font-semibold text-slate-700 w-16">#</TableHead>
              <TableHead className="font-semibold text-slate-700">Descrição</TableHead>
              <TableHead className="font-semibold text-slate-700">Grupo da Moldura</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Background</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Foreground</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Posição X</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Posição Y</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Status</TableHead>
              <TableHead className="font-semibold text-slate-700 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((moldura) => (
              <TableRow key={moldura.id} className="border-slate-200 hover:bg-slate-50/50">
                <TableCell>
                  <div className="font-semibold text-blue-600">{moldura.id}</div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-slate-800">{moldura.descricao}</div>
                  <div className="text-sm text-slate-500">
                    Criada em {new Date(moldura.dataCriacao).toLocaleDateString("pt-BR")}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-slate-600">
                    {moldura.grupoNome}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div
                    className="w-8 h-8 rounded mx-auto border border-slate-200"
                    style={{ backgroundColor: moldura.backgroundColor }}
                    title={`Cor: ${moldura.backgroundColor}`}
                  />
                </TableCell>
                <TableCell className="text-center">
                  {moldura.foregroundImage ? (
                    <div className="w-8 h-8 mx-auto bg-slate-100 rounded border border-slate-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={moldura.foregroundImage || "/placeholder.svg"}
                        alt="Foreground"
                        className="w-full h-full object-cover"
                        style={{
                          transform: `rotate(${moldura.rotacaoImagem}deg) scale(${moldura.tamanhoImagem / 100})`,
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 mx-auto bg-slate-100 rounded border border-slate-200" />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <div className="font-semibold text-slate-800">{moldura.posicaoX}</div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="font-semibold text-slate-800">{moldura.posicaoY}</div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={moldura.ativa ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {moldura.ativa ? "Ativa" : "Inativa"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Editar moldura"
                      onClick={() => onEdit(moldura)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Excluir moldura"
                      onClick={() => onDelete(moldura)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
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
