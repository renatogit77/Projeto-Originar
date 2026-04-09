import { modulos } from '../../support/data/modulos'

describe('Módulos - Navegação completa (Fluxo do usuário)', () => {

  beforeEach(() => {
    cy.loginCompleto()

    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError')
    })
  })

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

    // 1. Garante que entrou no módulo
    cy.location('href', { timeout: 20000 })
      .should('include', modulo.url)

   // 2. Aguarda remoção do accessToken
    cy.location('href')
      .should((url) => {

    expect(url, 'accessToken deve ser removido após carregamento')
      .not.to.include('accessToken')

  })

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