"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import type { ConfiguracaoHardware } from "../types"

interface TabHardwareProps {
  data: ConfiguracaoHardware
  onChange: (data: ConfiguracaoHardware) => void
}

const regioes = [
  "Australia",
  "Brazil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Dominican Republic",
  "European Union",
  "Honduras",
  "Hong Kong",
  "Kazakhstan",
  "Korea",
  "Laos",
  "Malaysia",
  "Mexico",
  "Panama",
  "Peru",
  "Romania",
  "Russian Federation",
  "Singapore",
  "Taiwan",
  "Thailand",
  "United Kingdom",
  "United States",
]

export default function TabHardware({ data, onChange }: TabHardwareProps) {
  const updateData = (updates: Partial<ConfiguracaoHardware>) => {
    onChange({ ...data, ...updates })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="usar-regiao"
            checked={data.usarRegiao}
            onCheckedChange={(checked) => updateData({ usarRegiao: !!checked })}
          />
          <Label htmlFor="usar-regiao">*Usar região</Label>
        </div>

        <div>
          <Label htmlFor="regiao">Região *</Label>
          <Select value={data.regiao} onValueChange={(value) => updateData({ regiao: value })}>
            <SelectTrigger>
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {regioes.map((regiao) => (
                <SelectItem key={regiao} value={regiao}>
                  {regiao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="usar-aceitador-moedas"
            checked={data.usarAceitadorMoedas}
            onCheckedChange={(checked) => updateData({ usarAceitadorMoedas: !!checked })}
          />
          <Label htmlFor="usar-aceitador-moedas">*Use o aceitador de moedas</Label>
        </div>

        <div>
          <Label htmlFor="aceitador-moedas">Aceitador de moedas</Label>
          <Select value={data.aceitadorMoedas} onValueChange={(value) => updateData({ aceitadorMoedas: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fenix">fênix</SelectItem>
              <SelectItem value="azkoyan">azkoyan</SelectItem>
              <SelectItem value="alberici">alberici</SelectItem>
              <SelectItem value="nri">NRI</SelectItem>
              <SelectItem value="micromoeda">micromoeda</SelectItem>
              <SelectItem value="azkoyan_1">azkoyan_1</SelectItem>
              <SelectItem value="phenix_1">phenix_1</SelectItem>
              <SelectItem value="nrisem50">nriSem50</SelectItem>
              <SelectItem value="nriv3">nriv3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="usar-hopper"
            checked={data.usarHopper}
            onCheckedChange={(checked) => updateData({ usarHopper: !!checked })}
          />
          <Label htmlFor="usar-hopper">*Use Hopper</Label>
        </div>

        <div>
          <Label htmlFor="funil">Funil</Label>
          <Select value={data.funii} onValueChange={(value) => updateData({ funii: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cubo">cubo</SelectItem>
              <SelectItem value="tic">TIC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="qualidade-moeda">Qualidade da moeda Hopper</Label>
          <Input
            id="qualidade-moeda"
            value={data.qualidadeMoedaHopper}
            onChange={(e) => updateData({ qualidadeMoedaHopper: e.target.value })}
            placeholder="Qualidade da moeda Hopper"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="usar-controlador"
            checked={data.usarControlador}
            onCheckedChange={(checked) => updateData({ usarControlador: !!checked })}
          />
          <Label htmlFor="usar-controlador">*Usar controlador</Label>
        </div>

        <div>
          <Label htmlFor="controlador">Controlador</Label>
          <Select value={data.controlador} onValueChange={(value) => updateData({ controlador: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fotonota">fotonota</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="usar-aceitador-notas"
            checked={data.usarAceitadorNotas}
            onCheckedChange={(checked) => updateData({ usarAceitadorNotas: !!checked })}
          />
          <Label htmlFor="usar-aceitador-notas">*Use o aceitador de notas</Label>
        </div>

        <div>
          <Label htmlFor="aceitador-notas">aceitador de notas</Label>
          <Select value={data.aceitadorNotas} onValueChange={(value) => updateData({ aceitadorNotas: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inovador">inovador</SelectItem>
              <SelectItem value="l-70">L-70</SelectItem>
              <SelectItem value="tic">TIC</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="usar-cashless"
            checked={data.usarCashless}
            onCheckedChange={(checked) => updateData({ usarCashless: !!checked })}
          />
          <Label htmlFor="usar-cashless">*Use Cashless</Label>
        </div>

        <div>
          <Label htmlFor="sem-dinheiro">Sem dinheiro</Label>
          <Select value={data.semDinheiro} onValueChange={(value) => updateData({ semDinheiro: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nayax">nayax</SelectItem>
              <SelectItem value="auttar">Auttar</SelectItem>
              <SelectItem value="coleta">Coleta</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="porto-sem-dinheiro">Porto sem dinheiro</Label>
          <Input
            id="porto-sem-dinheiro"
            value={data.portoSemDinheiro}
            onChange={(e) => updateData({ portoSemDinheiro: e.target.value })}
            placeholder="Porto sem dinheiro"
          />
        </div>

        <div>
          <Label htmlFor="serie-sem-dinheiro">Série sem dinheiro</Label>
          <Input
            id="serie-sem-dinheiro"
            value={data.serieSemDinheiro}
            onChange={(e) => updateData({ serieSemDinheiro: e.target.value })}
            placeholder="Série sem dinheiro"
          />
        </div>
      </div>
    </div>
  )
}
