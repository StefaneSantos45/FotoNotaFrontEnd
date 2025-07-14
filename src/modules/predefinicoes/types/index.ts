export interface Departamento {
  id: string
  nome: string
}

export interface HorarioFuncionamento {
  dia: string
  inicio: string
  fim: string
  ativo: boolean
}

export interface PrecoEspecial {
  id: string
  quantidade: number
  preco: number
}

export interface FonteFoto {
  instagram: boolean
  telefone: boolean
  facebook: boolean
  identificacao: boolean
  selfie: boolean
  eventoInstagram: boolean
}

export interface TipoUploadTelefone {
  rede: boolean
  wifi?: boolean // se você não usa ainda, pode manter opcional
  bluetooth?: boolean
}

export interface MetodosPagamento {
  ksherPromptPay: boolean
  ksherAlipay: boolean
  ksherTruemoney: boolean
  rmTng: boolean
  rmGrabPay: boolean
  maybankQrPay: boolean
  impulsionar: boolean
  mostroReceita: boolean
  bcelLaos: boolean
}

export interface ConfiguracaoLocalidade {
  usarLocalidades: boolean
  localidadePadrao: string
  locais: string[]
}

export interface ConfiguracaoHardware {
  usarRegiao: boolean
  regiao: string
  usarAceitadorMoedas: boolean
  aceitadorMoedas: string
  usarHopper: boolean
  funii: string
  qualidadeMoedaHopper: string
  usarControlador: boolean
  controlador: string
  usarAceitadorNotas: boolean
  aceitadorNotas: string
  usarCashless: boolean
  semDinheiro: string
  portoSemDinheiro: string
  serieSemDinheiro: string
}

export interface ConfiguracaoGeral {
  departamentoQuiosques: string
  usarFonteFoto: boolean
  fonteFoto: FonteFoto
  usarTipoUploadTelefone: boolean
  tipoUploadTelefone: TipoUploadTelefone
  predefinicaoLayout: string
  predefinicaoAnuncio: string
  predefinicaoDocPhoto: string
}

export interface ConfiguracaoPagamento {
  preco: string
  precoFotoIdentificacao: string
  usarPrecoFlexivel: boolean
  oFlexPriceE: boolean
  precosEspeciais: PrecoEspecial[]
  usarCodigoPromocionalTroco: boolean
  codigoPromocionalAlteracao: boolean
  tipoPromocaoErroImpressao: string
  valorMinimoImpressao: string
  usarPagamentosCodigoQr: boolean
  pagamentosCodigoQr: MetodosPagamento
  usarNotasAceitas: boolean
  aceitandoNotas: boolean
  usarMoedasAceitam: boolean
  aceitandoMoedas: boolean
}

export interface ConfiguracaoLocalizacao {
  usarHorarioFuncionamento: boolean
  horarioFuncionamento: HorarioFuncionamento[]
}

export interface Margem {
  left: number
  right: number
  top: number
  bottom: number
}

export interface ConfiguracaoAvancada {
  atrasoReinicializacao: string
  redefinirExibicaoAtraso: string
  taxaPrincipalAtrasoReinicializacao: string
  imprimirRendaVitalicia: string
  reiniciarQuiosqueAposErros: string
  usarFotosPbAtencao: boolean
  fotosPbAtencoes: boolean
  usarLimiteFolhasImpressas: boolean
  limiteFolhasImpressao: string
  limiteMeoriaRenderizacao: string
  usarMargem: boolean
  margem: Margem
}

export interface PredefinicaoQuiosque {
  id: string
  nome: string
  departamento: string
  configuracaoGeral: ConfiguracaoGeral
  configuracaoPagamento: ConfiguracaoPagamento
  configuracaoLocalizacao: ConfiguracaoLocalizacao
  configuracaoAvancada: ConfiguracaoAvancada
  configuracaoLocalidade: ConfiguracaoLocalidade
  configuracaoHardware: ConfiguracaoHardware
  criadoEm: string
  atualizadoEm: string
}
export interface PredefinicaoFormData {
  nome: string
  departamento: string
  configuracaoGeral: ConfiguracaoGeral
  configuracaoPagamento: ConfiguracaoPagamento
  configuracaoLocalidade: ConfiguracaoLocalidade
  configuracaoHardware: ConfiguracaoHardware
  configuracaoLocalizacao: ConfiguracaoLocalizacao
  configuracaoAvancada: ConfiguracaoAvancada
}
