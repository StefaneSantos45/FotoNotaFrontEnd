"use client"

import { FolderOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Quiosque } from "../../types"

interface TabCollectionsProps {
  quiosque: Quiosque
}

export default function TabCollections({ quiosque }: TabCollectionsProps) {
  // Mock de dados de coleções, se houver
  const collections = quiosque.colecoes || []

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">Coleções</CardTitle>
        </CardHeader>
        <CardContent>
          {collections.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma coleção encontrada</h3>
              <p className="text-gray-500">Este quiosque não possui coleções associadas.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {collections.map((collection, index) => (
                <div key={index} className="p-4 border rounded-lg bg-slate-50">
                  <h4 className="font-semibold text-slate-800">{collection.name}</h4>
                  <p className="text-sm text-slate-600">Itens: {collection.items}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
