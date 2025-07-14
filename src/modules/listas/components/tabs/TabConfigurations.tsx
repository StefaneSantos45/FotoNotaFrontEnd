"use client"

import { Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Quiosque } from "../../types"

interface TabConfigurationsProps {
  quiosque: Quiosque
}

export default function TabConfigurations({ quiosque }: TabConfigurationsProps) {
  const { configuracoes } = quiosque

  const renderBoolean = (value: boolean) => {
    return value ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />
  }

  return (
    <div className="space-y-8">
      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-600">Nome:</span>
            <span className="text-slate-800">{configuracoes.nome}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-600">ID do Quiosque:</span>
            <span className="text-slate-800">{configuracoes.idQuiosque}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-600">ID Legado:</span>
            <span className="text-slate-800">{configuracoes.idLegado || "—"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-600">Departamento:</span>
            <span className="text-slate-800">{configuracoes.departamento}</span>
          </div>
          <div className="md:col-span-2">
            <span className="font-medium text-slate-600">Fonte da Foto:</span>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div className="flex items-center space-x-2">
                {renderBoolean(configuracoes.fonteFoto.instagram)}
                <span>Instagram</span>
              </div>
              <div className="flex items-center space-x-2">
                {renderBoolean(configuracoes.fonteFoto.doTelefone)}
                <span>Do Telefone</span>
              </div>
              <div className="flex items-center space-x-2">
                {renderBoolean(configuracoes.fonteFoto.facebook)}
                <span>Facebook</span>
              </div>
              <div className="flex items-center space-x-2">
                {renderBoolean(configuracoes.fonteFoto.fotoIdentificacao)}
                <span>Foto para Identificação</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-600">Predefinição de Layout:</span>
            <span className="text-slate-800">{configuracoes.predefinicaoLayout}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-600">Predefinição de Anúncio:</span>
            <span className="text-slate-800">{configuracoes.predefinicaoAnuncio}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-slate-600">Predefinição DocPhoto:</span>
            <span className="text-slate-800">{configuracoes.predefinicaoDocPhoto}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">Abas de Configuração</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="geral">Em geral</TabsTrigger>
              <TabsTrigger value="pagamento">Pagamento</TabsTrigger>
              <TabsTrigger value="localidade">Localidade</TabsTrigger>
              <TabsTrigger value="adicional">Adicional</TabsTrigger>
              <TabsTrigger value="hardware">Hardware</TabsTrigger>
              <TabsTrigger value="localizacao">Localização</TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="p-6 text-sm text-slate-700">
              <h3 className="font-semibold text-slate-800 mb-4">Configurações Gerais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Departamento de Quiosques:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoGeral?.departamentoQuiosques || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Fonte da Foto:</span>
                  {renderBoolean(configuracoes.configuracaoGeral?.usarFonteFoto || false)}
                </div>
                {configuracoes.configuracaoGeral?.usarFonteFoto && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-slate-600">Fontes de Foto:</span>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div className="flex items-center space-x-2">
                        {renderBoolean(configuracoes.configuracaoGeral?.fonteFoto?.instagram ?? false)}

                        <span>Instagram</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderBoolean(configuracoes.configuracaoGeral?.fonteFoto?.telefone ?? false)}
                        <span>Do Telefone</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderBoolean(configuracoes.configuracaoGeral?.fonteFoto?.facebook ?? false)}
                        <span>Facebook</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderBoolean(configuracoes.configuracaoGeral?.fonteFoto?.identificacao ?? false)}
                        <span>Foto para Identificação</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderBoolean(configuracoes.configuracaoGeral?.fonteFoto?.selfie ?? false)}
                        <span>Selfie</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderBoolean(configuracoes.configuracaoGeral?.fonteFoto?.eventoInstagram ?? false)}
                        <span>Evento do Instagram</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Upload Telefone:</span>
                  {renderBoolean(configuracoes.configuracaoGeral?.usarTipoUploadTelefone || false)}
                </div>
                {configuracoes.configuracaoGeral?.usarTipoUploadTelefone && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-slate-600">Tipos de Upload Telefone:</span>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div className="flex items-center space-x-2">
                        {renderBoolean(configuracoes.configuracaoGeral?.tipoUploadTelefone?.rede ?? false)}
                        <span>Rede</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderBoolean(configuracoes.configuracaoGeral?.tipoUploadTelefone?.wifi ?? false)}
                        <span>Wi-fi</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderBoolean(configuracoes.configuracaoGeral?.tipoUploadTelefone?.bluetooth ?? false)}
                        <span>Bluetooth</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Predefinição de Layout:</span>
                  <span className="text-slate-800">{configuracoes.configuracaoGeral?.predefinicaoLayout || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Predefinição de Anúncio:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoGeral?.predefinicaoAnuncio || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Predefinição DocPhoto:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoGeral?.predefinicaoDocPhoto || "N/A"}
                  </span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pagamento" className="p-6 text-sm text-slate-700">
              <h3 className="font-semibold text-slate-800 mb-4">Configurações de Pagamento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Preço:</span>
                  <span className="text-slate-800">{configuracoes.configuracaoPagamento?.preco || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Preço Foto Identificação:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoPagamento?.precoFotoIdentificacao || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Preço Flexível:</span>
                  {renderBoolean(configuracoes.configuracaoPagamento?.usarPrecoFlexivel || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">O Flex Price é:</span>
                  {renderBoolean(configuracoes.configuracaoPagamento?.oFlexPriceE || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Código Promocional Troco:</span>
                  {renderBoolean(configuracoes.configuracaoPagamento?.usarCodigoPromocionalTroco || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Código Promocional Alteração:</span>
                  {renderBoolean(configuracoes.configuracaoPagamento?.codigoPromocionalAlteracao || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Tipo Promoção Erro Impressão:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoPagamento?.tipoPromocaoErroImpressao || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Valor Mínimo Impressão:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoPagamento?.valorMinimoImpressao || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Pagamentos QR:</span>
                  {renderBoolean(configuracoes.configuracaoPagamento?.usarPagamentosCodigoQr || false)}
                </div>
                {configuracoes.configuracaoPagamento?.usarPagamentosCodigoQr && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-slate-600">Métodos de Pagamento QR:</span>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      {Object.entries(configuracoes.configuracaoPagamento.pagamentosCodigoQr || {}).map(
                        ([key, value]) => (
                          <div key={key} className="flex items-center space-x-2">
                            {renderBoolean(!!value)}
                            <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Notas Aceitas:</span>
                  {renderBoolean(configuracoes.configuracaoPagamento?.usarNotasAceitas || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Aceitando Notas:</span>
                  {renderBoolean(configuracoes.configuracaoPagamento?.aceitandoNotas || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Moedas Aceitam:</span>
                  {renderBoolean(configuracoes.configuracaoPagamento?.usarMoedasAceitam || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Aceitando Moedas:</span>
                  {renderBoolean(configuracoes.configuracaoPagamento?.aceitandoMoedas || false)}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="localidade" className="p-6 text-sm text-slate-700">
              <h3 className="font-semibold text-slate-800 mb-4">Configurações de Localidade</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Localidades:</span>
                  {renderBoolean(configuracoes.configuracaoLocalidade?.usarLocalidades || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Localidade Padrão:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoLocalidade?.localidadePadrao || "N/A"}
                  </span>
                </div>
                {configuracoes.configuracaoLocalidade?.locais &&
                  configuracoes.configuracaoLocalidade.locais.length > 0 && (
                    <div className="md:col-span-2">
                      <span className="font-medium text-slate-600">Locais:</span>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                        {configuracoes.configuracaoLocalidade.locais.map((local, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>{local}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </TabsContent>

            <TabsContent value="adicional" className="p-6 text-sm text-slate-700">
              <h3 className="font-semibold text-slate-800 mb-4">Configurações Adicionais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Atraso Reinicialização:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoAvancada?.atrasoReinicializacao || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Redefinir Exibição Atraso:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoAvancada?.redefinirExibicaoAtraso || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Taxa Principal Atraso Reinicialização:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoAvancada?.taxaPrincipalAtrasoReinicializacao || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Imprimir Renda Vitalícia:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoAvancada?.imprimirRendaVitalicia || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Reiniciar Quiosque Após Erros:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoAvancada?.reiniciarQuiosqueAposErros || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Fotos P/B Atenção:</span>
                  {renderBoolean(configuracoes.configuracaoAvancada?.usarFotosPbAtencao || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Fotos P/B Atenções:</span>
                  {renderBoolean(configuracoes.configuracaoAvancada?.fotosPbAtencoes || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Limite Folhas Impressas:</span>
                  {renderBoolean(configuracoes.configuracaoAvancada?.usarLimiteFolhasImpressas || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Limite Folhas Impressão:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoAvancada?.limiteFolhasImpressao || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Limite Memória Renderização:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoAvancada?.limiteMeoriaRenderizacao || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Margem:</span>
                  {renderBoolean(configuracoes.configuracaoAvancada?.usarMargem || false)}
                </div>
                {configuracoes.configuracaoAvancada?.usarMargem && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-slate-600">Margem:</span>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Esquerda:</span>
                        <span className="text-slate-800">{configuracoes.configuracaoAvancada?.margem?.left}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Direita:</span>
                        <span className="text-slate-800">{configuracoes.configuracaoAvancada?.margem?.right}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Superior:</span>
                        <span className="text-slate-800">{configuracoes.configuracaoAvancada?.margem?.top}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Inferior:</span>
                        <span className="text-slate-800">{configuracoes.configuracaoAvancada?.margem?.bottom}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="hardware" className="p-6 text-sm text-slate-700">
              <h3 className="font-semibold text-slate-800 mb-4">Configurações de Hardware</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Região:</span>
                  {renderBoolean(configuracoes.configuracaoHardware?.usarRegiao || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Região:</span>
                  <span className="text-slate-800">{configuracoes.configuracaoHardware?.regiao || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Aceitador Moedas:</span>
                  {renderBoolean(configuracoes.configuracaoHardware?.usarAceitadorMoedas || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Aceitador Moedas:</span>
                  <span className="text-slate-800">{configuracoes.configuracaoHardware?.aceitadorMoedas || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Hopper:</span>
                  {renderBoolean(configuracoes.configuracaoHardware?.usarHopper || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Funil:</span>
                  <span className="text-slate-800">{configuracoes.configuracaoHardware?.funii || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Qualidade Moeda Hopper:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoHardware?.qualidadeMoedaHopper || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Controlador:</span>
                  {renderBoolean(configuracoes.configuracaoHardware?.usarControlador || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Controlador:</span>
                  <span className="text-slate-800">{configuracoes.configuracaoHardware?.controlador || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Aceitador Notas:</span>
                  {renderBoolean(configuracoes.configuracaoHardware?.usarAceitadorNotas || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Aceitador Notas:</span>
                  <span className="text-slate-800">{configuracoes.configuracaoHardware?.aceitadorNotas || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Cashless:</span>
                  {renderBoolean(configuracoes.configuracaoHardware?.usarCashless || false)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Sem Dinheiro:</span>
                  <span className="text-slate-800">{configuracoes.configuracaoHardware?.semDinheiro || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Porto Sem Dinheiro:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoHardware?.portoSemDinheiro || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Série Sem Dinheiro:</span>
                  <span className="text-slate-800">
                    {configuracoes.configuracaoHardware?.serieSemDinheiro || "N/A"}
                  </span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="localizacao" className="p-6 text-sm text-slate-700">
              <h3 className="font-semibold text-slate-800 mb-4">Configurações de Localização</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-600">Usar Horário Funcionamento:</span>
                  {renderBoolean(configuracoes.configuracaoLocalizacao?.usarHorarioFuncionamento || false)}
                </div>
                {configuracoes.configuracaoLocalizacao?.usarHorarioFuncionamento && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-slate-600">Horário de Funcionamento:</span>
                    <div className="space-y-2 mt-2 text-xs">
                      {configuracoes.configuracaoLocalizacao.horarioFuncionamento?.map((horario, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 border rounded-md bg-slate-50"
                        >
                          <span className="font-medium">{horario.dia}:</span>
                          <span>
                            {horario.inicio} - {horario.fim} ({horario.ativo ? "Ativo" : "Inativo"})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
