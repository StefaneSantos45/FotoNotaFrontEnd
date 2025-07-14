"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { ConfiguracaoGeral, Departamento } from "../types"

interface TabGeralProps {
  data: ConfiguracaoGeral
  departamentos: Departamento[]
  onChange: (data: ConfiguracaoGeral) => void
}

export default function TabGeral({ data, departamentos, onChange }: TabGeralProps) {
  const updateData = (updates: Partial<ConfiguracaoGeral>) => {
    onChange({ ...data, ...updates })
  }

  const updateFonteFoto = (key: keyof typeof data.fonteFoto, value: boolean) => {
    updateData({
      fonteFoto: {
        ...data.fonteFoto,
        [key]: value,
      },
    })
  }

  const updateTipoUpload = (key: keyof typeof data.tipoUploadTelefone, value: boolean) => {
    updateData({
      tipoUploadTelefone: {
        ...data.tipoUploadTelefone,
        [key]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="departamento-quiosques">Departamento de Quiosques</Label>
        <Select
          value={data.departamentoQuiosques}
          onValueChange={(value) => updateData({ departamentoQuiosques: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="—" />
          </SelectTrigger>
          <SelectContent>
            {departamentos.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="usar-fonte-foto"
            checked={data.usarFonteFoto}
            onCheckedChange={(checked) => updateData({ usarFonteFoto: !!checked })}
          />
          <Label htmlFor="usar-fonte-foto">*Use a fonte da foto</Label>
        </div>

        {data.usarFonteFoto && (
          <div className="ml-6 space-y-3">
            <Label>Fonte da foto</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="instagram"
                  checked={data.fonteFoto.instagram}
                  onCheckedChange={(checked) => updateFonteFoto("instagram", !!checked)}
                />
                <Label htmlFor="instagram">Instagram</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="telefone"
                  checked={data.fonteFoto.telefone}
                  onCheckedChange={(checked) => updateFonteFoto("telefone", !!checked)}
                />
                <Label htmlFor="telefone">Do telefone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="facebook"
                  checked={data.fonteFoto.facebook}
                  onCheckedChange={(checked) => updateFonteFoto("facebook", !!checked)}
                />
                <Label htmlFor="facebook">Facebook</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="identificacao"
                  checked={data.fonteFoto.identificacao}
                  onCheckedChange={(checked) => updateFonteFoto("identificacao", !!checked)}
                />
                <Label htmlFor="identificacao">Foto para identificação</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selfie"
                  checked={data.fonteFoto.selfie}
                  onCheckedChange={(checked) => updateFonteFoto("selfie", !!checked)}
                />
                <Label htmlFor="selfie">Selfie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="evento-instagram"
                  checked={data.fonteFoto.eventoInstagram}
                  onCheckedChange={(checked) => updateFonteFoto("eventoInstagram", !!checked)}
                />
                <Label htmlFor="evento-instagram">Evento do Instagram</Label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="usar-upload-telefone"
            checked={data.usarTipoUploadTelefone}
            onCheckedChange={(checked) => updateData({ usarTipoUploadTelefone: !!checked })}
          />
          <Label htmlFor="usar-upload-telefone">*Use tipos de upload de telefone</Label>
        </div>

        {data.usarTipoUploadTelefone && (
          <div className="ml-6 space-y-3">
            <Label>Tipos de upload de telefone</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rede"
                  checked={data.tipoUploadTelefone.rede}
                  onCheckedChange={(checked) => updateTipoUpload("rede", !!checked)}
                />
                <Label htmlFor="rede">Rede</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wifi"
                  checked={data.tipoUploadTelefone.wifi}
                  onCheckedChange={(checked) => updateTipoUpload("wifi", !!checked)}
                />
                <Label htmlFor="wifi">Wi-fi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bluetooth"
                  checked={data.tipoUploadTelefone.bluetooth}
                  onCheckedChange={(checked) => updateTipoUpload("bluetooth", !!checked)}
                />
                <Label htmlFor="bluetooth">Bluetooth</Label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="predefinicao-layout">Predefinição de layout</Label>
        <Select value={data.predefinicaoLayout} onValueChange={(value) => updateData({ predefinicaoLayout: value })}>
          <SelectTrigger>
            <SelectValue placeholder="—" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">ATUALIZADOS Início dafault teste stefane</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="predefinicao-anuncio">Predefinição de anúncio</Label>
        <Select value={data.predefinicaoAnuncio} onValueChange={(value) => updateData({ predefinicaoAnuncio: value })}>
          <SelectTrigger>
            <SelectValue placeholder="—" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fake">fake</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="predefinicao-docphoto">Predefinição DocPhoto</Label>
        <Select
          value={data.predefinicaoDocPhoto}
          onValueChange={(value) => updateData({ predefinicaoDocPhoto: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="—" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="docphoto">DocPhoto</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
