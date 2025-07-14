"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Upload, RotateCw } from "lucide-react"
import { NovamolduraForm } from "@/modules/molduras/types/moluras"
import { gruposData } from "@/modules/grupos/data/gruposData"

interface NovaMolduraModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (moldura: NovamolduraForm) => void
}

export function NovaMolduraModal({ isOpen, onClose, onSave }: NovaMolduraModalProps) {
  const [form, setForm] = useState<NovamolduraForm>({
    descricao: "",
    grupoId: 1,
    backgroundColor: "#dc2626",
    posicaoX: 0,
    posicaoY: 0,
    tamanhoImagem: 60,
    rotacaoImagem: 0,
  })

  const [backgroundFile, setBackgroundFile] = useState<File | null>(null)
  const [foregroundFile, setForegroundFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string>("/images/moldura-preview.png")

  const handleBackgroundFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setBackgroundFile(file)
      setForm((prev) => ({ ...prev, backgroundFile: file }))
    }
  }

  const handleForegroundFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setForegroundFile(file)
      setForm((prev) => ({ ...prev, foregroundFile: file }))

      // Criar preview da imagem
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (!form.descricao.trim()) return

    onSave(form)
    handleClose()
  }

  const handleClose = () => {
    setForm({
      descricao: "",
      grupoId: 1,
      backgroundColor: "#dc2626",
      posicaoX: 0,
      posicaoY: 0,
      tamanhoImagem: 60,
      rotacaoImagem: 0,
    })
    setBackgroundFile(null)
    setForegroundFile(null)
    setPreviewImage("/images/moldura-preview.png")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">Cadastrar nova moldura</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
          {/* Coluna Esquerda - Formulário */}
          <div className="space-y-6">
            {/* Nome da moldura */}
            <div className="space-y-2">
              <Label htmlFor="nome-moldura" className="text-sm font-medium text-slate-700">
                Nome da moldura
              </Label>
              <Input
                id="nome-moldura"
                placeholder="Digite o nome da moldura"
                value={form.descricao}
                onChange={(e) => setForm((prev) => ({ ...prev, descricao: e.target.value }))}
                className="bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>

            {/* Grupo da moldura */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Grupo da moldura</Label>
              <Select
                value={form.grupoId.toString()}
                onValueChange={(value) => setForm((prev) => ({ ...prev, grupoId: Number.parseInt(value) }))}
              >
                <SelectTrigger className="bg-white border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gruposData.map((grupo) => (
                    <SelectItem key={grupo.id} value={grupo.id.toString()}>
                      {grupo.icone} {grupo.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fundo */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">Fundo</Label>
              <div className="flex items-center space-x-3">
                <input
                  id="background-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundFileChange}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("background-upload")?.click()}
                  className="flex items-center space-x-2 text-pink-600 border-pink-200 hover:bg-pink-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Selecionar arquivo</span>
                </Button>
                <span className="text-sm text-slate-500">
                  {backgroundFile ? backgroundFile.name : "Nenhum arquivo escolhido"}
                </span>
              </div>

              {/* Seletor de cor de fundo */}
              <div className="flex items-center space-x-3">
                <Label className="text-sm text-slate-600">Cor de fundo:</Label>
                <input
                  type="color"
                  value={form.backgroundColor}
                  onChange={(e) => setForm((prev) => ({ ...prev, backgroundColor: e.target.value }))}
                  className="w-12 h-8 rounded border border-slate-200 cursor-pointer"
                />
                <span className="text-sm text-slate-500">{form.backgroundColor}</span>
              </div>
            </div>

            {/* Primeiro plano */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">Primeiro plano</Label>
              <div className="flex items-center space-x-3">
                <input
                  id="foreground-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleForegroundFileChange}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("foreground-upload")?.click()}
                  className="flex items-center space-x-2 text-pink-600 border-pink-200 hover:bg-pink-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Selecionar arquivo</span>
                </Button>
                <span className="text-sm text-slate-500">
                  {foregroundFile ? foregroundFile.name : "Nenhum arquivo escolhido"}
                </span>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Preview e Controles */}
          <div className="space-y-6">
            {/* Visualização da moldura */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">Visualização da moldura</Label>
              <div
                className="w-full h-64 rounded-lg border-2 border-slate-200 flex items-center justify-center overflow-hidden relative"
                style={{ backgroundColor: form.backgroundColor }}
              >
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Preview da moldura"
                  className="max-w-full max-h-full object-contain"
                  style={{
                    transform: `translate(${form.posicaoX}px, ${form.posicaoY}px) rotate(${form.rotacaoImagem}deg) scale(${form.tamanhoImagem / 100})`,
                  }}
                />
              </div>
            </div>

            {/* Tamanho da imagem */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">Tamanho da imagem</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{form.tamanhoImagem}%</span>
                </div>
                <Slider
                  value={[form.tamanhoImagem]}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, tamanhoImagem: value[0] }))}
                  max={200}
                  min={10}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>

            {/* Posicionamento da imagem */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700">Posicionamento da imagem</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">Posição X</Label>
                  <Input
                    type="number"
                    value={form.posicaoX}
                    onChange={(e) => setForm((prev) => ({ ...prev, posicaoX: Number.parseInt(e.target.value) || 0 }))}
                    className="bg-white border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-slate-600">Posição Y</Label>
                  <Input
                    type="number"
                    value={form.posicaoY}
                    onChange={(e) => setForm((prev) => ({ ...prev, posicaoY: Number.parseInt(e.target.value) || 0 }))}
                    className="bg-white border-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Rotação da imagem */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700 flex items-center">
                <RotateCw className="w-4 h-4 mr-2" />
                Rotação da imagem
              </Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{form.rotacaoImagem}°</span>
                </div>
                <Slider
                  value={[form.rotacaoImagem]}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, rotacaoImagem: value[0] }))}
                  max={360}
                  min={-360}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botão Cadastrar */}
        <div className="flex justify-end pt-6 border-t border-slate-200">
          <Button
            onClick={handleSave}
            disabled={!form.descricao.trim()}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8"
          >
            Cadastrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
