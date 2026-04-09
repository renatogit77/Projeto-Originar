export const modulos = [
  {
    nome: 'Levantamentos',
    seletor: 'a[href*="/originar/"]',
    url: '/originar/#/',
    api: '**levantamentoSafra**',
    tipo: 'externo'
  },
  {
    nome: 'Delimitar Fazenda',
    seletor: 'a[href*="/fazenda/"]',
    url: '/fazenda/',
    api: '**fazendas**',
    tipo: 'externo'
  },
  {
    nome: 'Sustentabilidade',
    seletor: 'a[href*="/sustentabilidade/"]',
    url: '/sustentabilidade/caixaentrada',
    api: '**StatusSolicitacao**',
    tipo: 'externo'
  },
  {
    nome: 'Inteligência',
    seletor: 'a[href*="/inteligencia/"]',
    url: '/inteligencia/',
    api: '**mapa/camadas**',
    tipo: 'externo'
  },
  {
    nome: 'Monitoramento',
    seletor: 'a[href*="/monitoramento/"]',
    url: '/monitoramento/#/',
    api: '**levantamentoSafra**',
    tipo: 'externo',
    elementoChave: '.leaflet-container'
  },
  {
    nome: 'Farmer Selling',
    seletor: 'a[href*="/farmer"]',
    url: '/farmer-selling/dashboard',
    api: '**buscarDadosQuantitativos**',
    tipo: 'externo'
  },
  {
    nome: 'Informativo Semanal',
    seletor: 'a[href*="/informativo"]',
    url: '/informativo-semanal/dashboard',
    api: '**dadosTabulares**',
    tipo: 'externo'
  },
  {
    nome: 'Painel Originar',
    seletor: 'a[href*="/painel"]',
    url: '/painel-originar/credito/geral',
    api: '**grafico**',
    tipo: 'interno'
  },
  {
    nome: 'Parametrização',
    seletor: 'a[href*="/parametrizacao"]',
    url: '/parametrizacao/',
    tipo: 'interno'
  }
]