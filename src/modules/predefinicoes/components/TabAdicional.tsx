"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { ConfiguracaoAvancada } from "../types"

interface TabAdicionalProps {
  data: ConfiguracaoAvancada
  onChange: (data: ConfiguracaoAvancada) => void
}

export default function TabAdicional({ data, onChange }: TabAdicionalProps) {
  const updateData = (updates: Partial<ConfiguracaoAvancada>) => {
    onChange({ ...data, ...updates })
  }

  const updateMargem = (key: keyof typeof data.margem, value: number) => {
    updateData({
      margem: {
        ...data.margem,
        [key]: value,
      },
    })
  }

  return (
    <div className="space-y-8">
      {/* Configurações de Tempo */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Configurações de Tempo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="atraso-reinicializacao">Atraso de reinicialização</Label>
            <Input
              id="atraso-reinicializacao"
              value={data.atrasoReinicializacao}
              onChange={(e) => updateData({ atrasoReinicializacao: e.target.value })}
              placeholder="Atraso de reinicialização"
              className="bg-white border-slate-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="redefinir-exibicao">Redefinir exibição de atraso</Label>
            <Input
              id="redefinir-exibicao"
              value={data.redefinirExibicaoAtraso}
              onChange={(e) => updateData({ redefinirExibicaoAtraso: e.target.value })}
              placeholder="Redefinir exibição de atraso"
              className="bg-white border-slate-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tela-principal">Tela principal de atraso de reinicialização</Label>
            <Input
              id="tela-principal"
              value={data.taxaPrincipalAtrasoReinicializacao}
              onChange={(e) => updateData({ taxaPrincipalAtrasoReinicializacao: e.target.value })}
              placeholder="Tela principal de atraso"
              className="bg-white border-slate-200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imprimir-renda">Imprimir renda vitalícia</Label>
            <Select
              value={data.imprimirRendaVitalicia}
              onValueChange={(value) => updateData({ imprimirRendaVitalicia: value })}
            >
              <SelectTrigger className="bg-white border-slate-200">
                <SelectValue placeholder="Escolha uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sobre">sobre</SelectItem>
                <SelectItem value="desligado">desligado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Configurações de Sistema */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Configurações de Sistema</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reiniciar-quiosque">Reiniciar quiosque após erros</Label>
            <Select
              value={data.reiniciarQuiosqueAposErros}
              onValueChange={(value) => updateData({ reiniciarQuiosqueAposErros: value })}
            >
              <SelectTrigger className="bg-white border-slate-200">
                <SelectValue placeholder="Escolha uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sobre">sobre</SelectItem>
                <SelectItem value="desligado">desligado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="usar-fotos-pb"
                checked={data.usarFotosPbAtencao}
                onCheckedChange={(checked) => updateData({ usarFotosPbAtencao: !!checked })}
              />
              <Label htmlFor="usar-fotos-pb">*Use fotos em P/B com atenção</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="fotos-pb-atencoes"
                checked={data.fotosPbAtencoes}
                onCheckedChange={(checked) => updateData({ fotosPbAtencoes: !!checked })}
              />
              <Label htmlFor="fotos-pb-atencoes">Fotos P/B atenções</Label>
            </div>
          </div>
        </div>
      </div>

      {/* Configurações de Impressão */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Configurações de Impressão</h3>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="usar-limite-folhas"
                checked={data.usarLimiteFolhasImpressas}
                onCheckedChange={(checked) => updateData({ usarLimiteFolhasImpressas: !!checked })}
              />
              <Label htmlFor="usar-limite-folhas">*Usar limite de folhas impressas</Label>
            </div>

            {data.usarLimiteFolhasImpressas && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="limite-folhas">Limite de folhas de impressão</Label>
                <Input
                  id="limite-folhas"
                  value={data.limiteFolhasImpressao}
                  onChange={(e) => updateData({ limiteFolhasImpressao: e.target.value })}
                  placeholder="Limite de folhas de impressão"
                  className="bg-white border-slate-200"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="limite-memoria">Limite de memória de reinicialização</Label>
            <Input
              id="limite-memoria"
              value={data.limiteMeoriaRenderizacao}
              onChange={(e) => updateData({ limiteMeoriaRenderizacao: e.target.value })}
              placeholder="Limite de memória de reinicialização"
              className="bg-white border-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Configurações de Margem */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Configurações de Margem</h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="usar-margem"
              checked={data.usarMargem}
              onCheckedChange={(checked) => updateData({ usarMargem: !!checked })}
            />
            <Label htmlFor="usar-margem">*Usar Margem</Label>
          </div>

          {data.usarMargem && (
            <div className="ml-6">
              <Label className="text-sm font-medium text-slate-700 mb-3 block">Margem</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="margem-left" className="text-sm">
                    Lado Esquerdo
                  </Label>
                  <Input
                    id="margem-left"
                    type="number"
                    value={data.margem.left}
                    onChange={(e) => updateMargem("left", Number(e.target.value))}
                    className="bg-white border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margem-right" className="text-sm">
                    Lado Direito
                  </Label>
                  <Input
                    id="margem-right"
                    type="number"
                    value={data.margem.right}
                    onChange={(e) => updateMargem("right", Number(e.target.value))}
                    className="bg-white border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margem-top" className="text-sm">
                    Superior
                  </Label>
                  <Input
                    id="margem-top"
                    type="number"
                    value={data.margem.top}
                    onChange={(e) => updateMargem("top", Number(e.target.value))}
                    className="bg-white border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margem-bottom" className="text-sm">
                    Inferior
                  </Label>
                  <Input
                    id="margem-bottom"
                    type="number"
                    value={data.margem.bottom}
                    onChange={(e) => updateMargem("bottom", Number(e.target.value))}
                    className="bg-white border-slate-200"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
