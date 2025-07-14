"use client"

import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import type { ConfiguracaoPagamento } from "../types"

interface TabPagamentoProps {
  data: ConfiguracaoPagamento
  onChange: (data: ConfiguracaoPagamento) => void
}

export default function TabPagamento({ data, onChange }: TabPagamentoProps) {
  const updateData = (updates: Partial<ConfiguracaoPagamento>) => {
    onChange({ ...data, ...updates })
  }

  const updateMetodosPagamento = (key: keyof typeof data.pagamentosCodigoQr, value: boolean) => {
    updateData({
      pagamentosCodigoQr: {
        ...data.pagamentosCodigoQr,
        [key]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="preco">Preço</Label>
        <Input
          id="preco"
          value={data.preco}
          onChange={(e) => updateData({ preco: e.target.value })}
          placeholder="Preço"
        />
      </div>

      <div>
        <Label htmlFor="preco-foto-identificacao">Preço da foto de identificação</Label>
        <Input
          id="preco-foto-identificacao"
          value={data.precoFotoIdentificacao}
          onChange={(e) => updateData({ precoFotoIdentificacao: e.target.value })}
          placeholder="Preço da foto de identificação"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="usar-preco-flexivel"
          checked={data.usarPrecoFlexivel}
          onCheckedChange={(checked) => updateData({ usarPrecoFlexivel: !!checked })}
        />
        <Label htmlFor="usar-preco-flexivel">*Use o Preço Flexível</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="flex-price-e"
          checked={data.oFlexPriceE}
          onCheckedChange={(checked) => updateData({ oFlexPriceE: !!checked })}
        />
        <Label htmlFor="flex-price-e">O Flex Price é</Label>
      </div>

      <div>
        <Label>Preço Flex</Label>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar preço especial
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="usar-codigo-promocional"
          checked={data.usarCodigoPromocionalTroco}
          onCheckedChange={(checked) => updateData({ usarCodigoPromocionalTroco: !!checked })}
        />
        <Label htmlFor="usar-codigo-promocional">*Use o código promocional como troco</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="codigo-promocional-alteracao"
          checked={data.codigoPromocionalAlteracao}
          onCheckedChange={(checked) => updateData({ codigoPromocionalAlteracao: !!checked })}
        />
        <Label htmlFor="codigo-promocional-alteracao">Código promocional como alteração</Label>
      </div>

      <div>
        <Label htmlFor="tipo-promocao">Tipo de promoção de erro de impressão</Label>
        <Select
          value={data.tipoPromocaoErroImpressao}
          onValueChange={(value) => updateData({ tipoPromocaoErroImpressao: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Escolha uma opção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quantidade-total-1">quantidade total +1</SelectItem>
            <SelectItem value="quantidade-total">quantidade total</SelectItem>
            <SelectItem value="quantidade-nao-impressa-1">quantidade não impressa +1</SelectItem>
            <SelectItem value="quantidade-nao-impressa">quantidade não impressa</SelectItem>
            <SelectItem value="desabilitar">desabilitar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="valor-minimo">Valor mínimo para impressão</Label>
        <Input
          id="valor-minimo"
          value={data.valorMinimoImpressao}
          onChange={(e) => updateData({ valorMinimoImpressao: e.target.value })}
          placeholder="Valor mínimo para impressão"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="usar-pagamentos-qr"
            checked={data.usarPagamentosCodigoQr}
            onCheckedChange={(checked) => updateData({ usarPagamentosCodigoQr: !!checked })}
          />
          <Label htmlFor="usar-pagamentos-qr">*Use pagamentos com código QR</Label>
        </div>

        {data.usarPagamentosCodigoQr && (
          <div className="ml-6 space-y-3">
            <Label>Pagamentos por código QR</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ksher-promptpay"
                  checked={data.pagamentosCodigoQr.ksherPromptPay}
                  onCheckedChange={(checked) => updateMetodosPagamento("ksherPromptPay", !!checked)}
                />
                <Label htmlFor="ksher-promptpay">Ksher Promptpay</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ksher-alipay"
                  checked={data.pagamentosCodigoQr.ksherAlipay}
                  onCheckedChange={(checked) => updateMetodosPagamento("ksherAlipay", !!checked)}
                />
                <Label htmlFor="ksher-alipay">Ksher Alipay</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ksher-truemoney"
                  checked={data.pagamentosCodigoQr.ksherTruemoney}
                  onCheckedChange={(checked) => updateMetodosPagamento("ksherTruemoney", !!checked)}
                />
                <Label htmlFor="ksher-truemoney">Ksher Truemoney</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rm-tng"
                  checked={data.pagamentosCodigoQr.rmTng}
                  onCheckedChange={(checked) => updateMetodosPagamento("rmTng", !!checked)}
                />
                <Label htmlFor="rm-tng">RM TNG</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rm-grabpay"
                  checked={data.pagamentosCodigoQr.rmGrabPay}
                  onCheckedChange={(checked) => updateMetodosPagamento("rmGrabPay", !!checked)}
                />
                <Label htmlFor="rm-grabpay">RM GrabPay</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="maybank-qrpay"
                  checked={data.pagamentosCodigoQr.maybankQrPay}
                  onCheckedChange={(checked) => updateMetodosPagamento("maybankQrPay", !!checked)}
                />
                <Label htmlFor="maybank-qrpay">Maybank QRPay</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="impulsionar"
                  checked={data.pagamentosCodigoQr.impulsionar}
                  onCheckedChange={(checked) => updateMetodosPagamento("impulsionar", !!checked)}
                />
                <Label htmlFor="impulsionar">Impulsionar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="monstro-receita"
                  checked={data.pagamentosCodigoQr.mostroReceita}
                  onCheckedChange={(checked) => updateMetodosPagamento("mostroReceita", !!checked)}
                />
                <Label htmlFor="monstro-receita">Monstro da Receita</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bcel-laos"
                  checked={data.pagamentosCodigoQr.bcelLaos}
                  onCheckedChange={(checked) => updateMetodosPagamento("bcelLaos", !!checked)}
                />
                <Label htmlFor="bcel-laos">Bcel Laos</Label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="usar-notas-aceitas"
          checked={data.usarNotasAceitas}
          onCheckedChange={(checked) => updateData({ usarNotasAceitas: !!checked })}
        />
        <Label htmlFor="usar-notas-aceitas">*Use notas aceitas</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="aceitando-notas"
          checked={data.aceitandoNotas}
          onCheckedChange={(checked) => updateData({ aceitandoNotas: !!checked })}
        />
        <Label htmlFor="aceitando-notas">Aceitando notas</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="usar-moedas-aceitam"
          checked={data.usarMoedasAceitam}
          onCheckedChange={(checked) => updateData({ usarMoedasAceitam: !!checked })}
        />
        <Label htmlFor="usar-moedas-aceitam">*Use moedas que aceitam</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="aceitando-moedas"
          checked={data.aceitandoMoedas}
          onCheckedChange={(checked) => updateData({ aceitandoMoedas: !!checked })}
        />
        <Label htmlFor="aceitando-moedas">Aceitando moedas</Label>
      </div>
    </div>
  )
}
