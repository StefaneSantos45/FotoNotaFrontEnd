// STATUS

export interface QuiosqueStatusItem {
  type: string // "online", "offline", "printer", etc.
  value: boolean
}

// MEMÓRIA

export interface MemoryUsage {
  name: string
  used: string
  total: string
}

// DISPOSITIVOS

export interface DeviceProperty {
  label: string
  value: string | number | boolean | undefined
}

export interface DeviceStatus {
  status: string
  name: string
  properties: DeviceProperty[]
}

// CONFIGURAÇÕES

export interface FonteFotoGeral {
  instagram?: boolean
  telefone?: boolean
  facebook?: boolean
  identificacao?: boolean
  selfie?: boolean
  eventoInstagram?: boolean
}

export interface TipoUploadTelefone {
  rede?: boolean
  wifi?: boolean
  bluetooth?: boolean
}

export interface ConfiguracaoGeral {
  departamentoQuiosques?: string
  usarFonteFoto?: boolean
  fonteFoto?: FonteFotoGeral
  usarTipoUploadTelefone?: boolean
  tipoUploadTelefone?: TipoUploadTelefone
  predefinicaoLayout?: string
  predefinicaoAnuncio?: string
  predefinicaoDocPhoto?: string
}

export interface ConfiguracaoPagamento {
  preco?: number
  precoFotoIdentificacao?: number
  usarPrecoFlexivel?: boolean
  oFlexPriceE?: boolean
  usarCodigoPromocionalTroco?: boolean
  codigoPromocionalAlteracao?: boolean
  tipoPromocaoErroImpressao?: string
  valorMinimoImpressao?: number
  usarPagamentosCodigoQr?: boolean
  pagamentosCodigoQr?: Record<string, boolean>
  usarNotasAceitas?: boolean
  aceitandoNotas?: boolean
  usarMoedasAceitam?: boolean
  aceitandoMoedas?: boolean
}

export interface ConfiguracaoAvancada {
  atrasoReinicializacao?: string
  redefinirExibicaoAtraso?: string
  taxaPrincipalAtrasoReinicializacao?: string
  imprimirRendaVitalicia?: string
  reiniciarQuiosqueAposErros?: string
  usarFotosPbAtencao?: boolean
  fotosPbAtencoes?: boolean
  usarLimiteFolhasImpressas?: boolean
  limiteFolhasImpressao?: string
  limiteMeoriaRenderizacao?: string
  usarMargem?: boolean
  margem?: {
    left: string
    right: string
    top: string
    bottom: string
  }
}

export interface ConfiguracaoLocalidade {
  usarLocalidades?: boolean
  localidadePadrao?: string
  locais?: string[]
}

export interface ConfiguracaoHardware {
  usarRegiao?: boolean
  regiao?: string
  usarAceitadorMoedas?: boolean
  aceitadorMoedas?: string
  usarHopper?: boolean
  funii?: string
  qualidadeMoedaHopper?: string
  usarControlador?: boolean
  controlador?: string
  usarAceitadorNotas?: boolean
  aceitadorNotas?: string
  usarCashless?: boolean
  semDinheiro?: string
  portoSemDinheiro?: string
  serieSemDinheiro?: string
}

export interface HorarioFuncionamento {
  dia: string
  inicio: string
  fim: string
  ativo: boolean
}

export interface ConfiguracaoLocalizacao {
  usarHorarioFuncionamento?: boolean
  horarioFuncionamento?: HorarioFuncionamento[]
}

export interface ConfiguracoesQuiosque {
  nome: string
  idQuiosque: string
  idLegado?: string
  departamento: string
  fonteFoto: {
    instagram: boolean
    doTelefone: boolean
    facebook: boolean
    fotoIdentificacao: boolean
  }
  predefinicaoLayout: string
  predefinicaoAnuncio: string
  predefinicaoDocPhoto: string

  configuracaoGeral?: ConfiguracaoGeral
  configuracaoPagamento?: ConfiguracaoPagamento
  configuracaoAvancada?: ConfiguracaoAvancada
  configuracaoLocalidade?: ConfiguracaoLocalidade
  configuracaoHardware?: ConfiguracaoHardware
  configuracaoLocalizacao?: ConfiguracaoLocalizacao
}

// QUIOSQUE PRINCIPAL

export interface Quiosque {
  id: string
  nome: string
  status: QuiosqueStatusItem[]
  monitorMemoria?: {
    value: string
    timeAgo: string
  }
  quantidade: string
  papel: number
  funil: number
  departamento: string
  predefinicaoLayout: string
  predefinicaoAnuncio: string
  predefinicaoDocPhoto: string

  sessao?: string
  ultimaTela?: string

  statusDispositivo: {
    aceitadorMoedas: DeviceStatus & {
      moeda: string
      moedaInibirStr: string
      debugPollCount: number
      codigosCaminho: { code: string; moeda: string }[]
    }
    validadorBillet: DeviceStatus & {
      moeda: string
      moedaInibirStr: string
      debugPollCount: number
      codigosCaminho: { code: string; moeda: string }[]
    }
    funil: DeviceStatus & {
      optoEstados: number
      dispanceGlobalCounter: number
      valorMoeda: number
    }
    cortador: DeviceStatus & {
      tipoConexao: string
      estaCortandoAgora: boolean
    }
    controladorDispositivo: DeviceStatus & {
      ultimoPing: number
      revisaoSoftware: string
    }
    impressoraDnp: DeviceStatus & {
      statusNativo: string
      contagemMidia: number
    }
    monitorMemoria: DeviceStatus & {
      memoriaDetalhes: MemoryUsage[]
      rss: string
      heapTotal: string
      pilhaUsada: string
      externo: string
      buffersArray: string
    }
    leitorCartaoBancario: DeviceStatus & {
      tipoConexao: string
    }
    navegador: DeviceStatus & {
      versao: string
      versaoPrincipal: number
      protecaoDisco: string
      chave: string
    }
  }

  configuracoes: ConfiguracoesQuiosque

  registroSessao: any[]
  colecoes: any[]
  comandos: {
    tipo: string
    status: string
    criadoEm: string
    usuario: string
  }[]
}
