describe('Login - Portal Originar', () => {

  beforeEach(() => {
    cy.visitLogin()
  })

  it('Deve realizar login com sucesso', () => {

    cy.login('renato.rumor', 'Acesso@2026280710')

    // Aguarda sair do login e chegar em estado válido
    cy.location('pathname', { timeout: 20000 })
      .should((pathname) => {

        expect(pathname).not.to.include('/login')

        expect(pathname).to.match(
          /(selecionar-filial|painel-modulos)/
        )
      })

    // Garante que não está mais no fluxo de token
    cy.location('href')
      .should('not.include', 'accessToken')

    // Aguarda tela de seleção estar pronta
    cy.get('input[placeholder="Selecione uma regional"]', { timeout: 20000 })
      .should('be.visible')

    // Seleções do dropdown de regional e filial
    cy.selecionarOpcaoDropdown('Selecione uma regional', 'LESTE - MT')
    cy.selecionarOpcaoDropdown('Selecione um filial', 'CONFRESA')

    cy.contains('button', 'Selecionar')
      .should('be.visible')
      .click()

    // Valida que chegou na home
    cy.location('pathname', { timeout: 20000 })
      .should('include', 'painel-modulos')

  })

})