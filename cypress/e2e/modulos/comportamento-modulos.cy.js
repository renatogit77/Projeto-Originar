describe('Módulos - Navegação completa (Fluxo do usuário)', () => {

  beforeEach(() => {
    cy.loginCompleto()

    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError')
    })
  })

  const modulos = [
    {
      nome: 'Levantamentos',
      seletor: 'a[href*="/originar/"]',
      url: '/originar/#/',
    },
    {
      nome: 'Delimitar Fazenda',
      seletor: 'a[href*="/fazenda/"]',
      url: '/fazenda/',
    },
    {
      nome: 'Sustentabilidade',
      seletor: 'a[href*="/sustentabilidade/"]',
      url: '/sustentabilidade/caixaentrada',
    },
    {
      nome: 'Inteligência',
      seletor: 'a[href*="/inteligencia/"]',
      url: '/inteligencia/',
    },
    {
      nome: 'Monitoramento',
      seletor: 'a[href*="/monitoramento/"]',
      url: '/monitoramento/#/',
      elementoChave: '.leaflet-container'
    },
    {
      nome: 'Farmer Selling',
      seletor: 'a[href*="/farmer"]',
      url: '/farmer-selling/dashboard',
    },
    {
      nome: 'Informativo Semanal',
      seletor: 'a[href*="/informativo"]',
      url: '/informativo-semanal/dashboard',
    },
    {
      nome: 'Painel Originar',
      seletor: 'a[href*="/painel"]',
      url: '/painel-originar/credito/geral',
    },
    {
      nome: 'Parametrização',
      seletor: 'a[href*="/parametrizacao"]',
      url: '/parametrizacao/',
    }
  ]

  const acessarModulo = (modulo) => {

    cy.log(`Acessando módulo: ${modulo.nome}`)

    // Clique
    cy.get(modulo.seletor, { timeout: 15000 })
      .filter(':visible')
      .should('have.length.greaterThan', 0)
      .first()
      .click()

    // Saiu da home
    cy.location('href', { timeout: 20000 })
      .should('not.include', 'painel-modulos')

    // Saiu do accessToken
    cy.location('href')
      .should('not.include', 'accessToken')

    // URL correta
    cy.location('href')
      .should('include', modulo.url)

    // Renderização
    cy.get('body').should('be.visible')

    // Elemento chave (quando necessário)
    if (modulo.elementoChave) {
      cy.get(modulo.elementoChave, { timeout: 20000 })
        .should('be.visible')
    }

    // Loading finalizado
    cy.get('.loading, .spinner, .MuiCircularProgress-root', { timeout: 10000 })
      .should('not.exist')

    // Sem erro JS
    cy.get('@consoleError')
      .should('not.have.been.called')
  }

  modulos.forEach((modulo) => {

    it(`Deve acessar ${modulo.nome} e retornar para Home`, () => {

      acessarModulo(modulo)

      // Volta para home
      cy.voltarParaHome()

      // Confirma home
      cy.location('href')
        .should('include', 'painel-modulos')

      // Confirma módulos visíveis
      cy.get('.modulo')
        .should('have.length.greaterThan', 0)

    })

  })

})