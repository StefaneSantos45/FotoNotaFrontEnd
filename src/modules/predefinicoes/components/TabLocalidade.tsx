"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { ConfiguracaoLocalidade } from "../types"

interface TabLocalidadeProps {
  data: ConfiguracaoLocalidade
  onChange: (data: ConfiguracaoLocalidade) => void
}

const idiomas = [
  "Inglês",
  "catalão",
  "Espanhol",
  "italiano",
  "Francês",
  "Português",
  "coreano",
  "romeno",
  "tailandês",
  "Chinês simplificado",
  "malaio",
  "Laos",
  "Brasileiro",
]

export default function TabLocalidade({ data, onChange }: TabLocalidadeProps) {
  const updateData = (updates: Partial<ConfiguracaoLocalidade>) => {
    onChange({ ...data, ...updates })
  }

  const updateLocais = (idioma: string, checked: boolean) => {
    const novosLocais = checked ? [...data.locais, idioma] : data.locais.filter((l) => l !== idioma)
    updateData({ locais: novosLocais })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="usar-localidades"
          checked={data.usarLocalidades}
          onCheckedChange={(checked) => updateData({ usarLocalidades: !!checked })}
        />
        <Label htmlFor="usar-localidades">*Usar Localidades</Label>
      </div>

      <div>
        <Label htmlFor="localidade-padrao">Localidade padrão</Label>
        <Select value={data.localidadePadrao} onValueChange={(value) => updateData({ localidadePadrao: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Escolha uma opção" />
          </SelectTrigger>
          <SelectContent>
            {idiomas.map((idioma) => (
              <SelectItem key={idioma} value={idioma.toLowerCase()}>
                {idioma}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Locais</Label>
        <div className="space-y-2">
          {idiomas.map((idioma) => (
            <div key={idioma} className="flex items-center space-x-2">
              <Checkbox
                id={`local-${idioma.toLowerCase()}`}
                checked={data.locais.includes(idioma)}
                onCheckedChange={(checked) => updateLocais(idioma, !!checked)}
              />
              <Label htmlFor={`local-${idioma.toLowerCase()}`}>{idioma}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
