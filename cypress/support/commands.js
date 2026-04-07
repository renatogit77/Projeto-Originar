// =========================
// Seleção do ambiente e visita à página de login
// =========================
Cypress.Commands.add('visitLogin', () => {
  cy.visit('/portal-seguranca/login')
})

// =========================
// Login
// =========================
Cypress.Commands.add('login', (usuario, senha) => {
  cy.get('input[placeholder="Digite o nome de usuário"]')
    .should('be.visible')
    .clear()
    .type(usuario)

  cy.get('input[placeholder="Digite sua senha"]')
    .should('be.visible')
    .clear()
    .type(senha, { log: false })

  cy.get('button.cd-button--primary')
    .click()
})

// =========================
// Dropdown de seleção de regional e filial
// =========================
Cypress.Commands.add('selecionarOpcaoDropdown', (placeholder, opcao) => {

  cy.get(`input[placeholder="${placeholder}"]`, { timeout: 20000 })
    .should('be.visible')
    .click()

  cy.contains('.cd-select-dropdown li', opcao, { timeout: 10000 })
    .should('be.visible')
    .click()
})

// =========================
// Faz login completo (com session estável)
// =========================
Cypress.Commands.add('loginCompleto', () => {

  const baseUrl = Cypress.config('baseUrl')

  cy.session(['login-renato-originar', baseUrl], () => {

    cy.visitLogin()

    cy.login('renato.rumor', 'Acesso@2026280710')

    cy.get('input[placeholder="Selecione uma regional"]', { timeout: 20000 })
      .should('be.visible')

    cy.selecionarOpcaoDropdown('Selecione uma regional', 'LESTE - MT')
    cy.selecionarOpcaoDropdown('Selecione um filial', 'CONFRESA')

    cy.contains('button', 'Selecionar').click()

    // 🔥 valida fluxo
    cy.location('pathname', { timeout: 20000 })
      .should((pathname) => {

        expect(pathname).not.to.include('/login')

        expect(pathname).to.match(
          /(painel-modulos|selecionar-filial|painel-originar)/
        )
      })

    cy.location('href')
      .should('not.include', 'accessToken')

    // 🔥 garante ambiente correto
    cy.location('origin')
      .should('eq', baseUrl)

  }, {
    validate() {

  cy.request({
    url: '/portal-seguranca/painel-modulos',
    failOnStatusCode: false
  }).then((res) => {

    // 401 = não autenticado
    expect(res.status).to.not.eq(401)

  })

}
  })

  // 🔥 navegação segura
  cy.visit('/portal-seguranca/painel-modulos')

  cy.location('origin')
    .should('eq', baseUrl)

  cy.get('.modulo', { timeout: 20000 })
    .should('be.visible')
    .and('have.length.greaterThan', 0)

})

// =========================
// TESTA RETORNO PARA HOME
// =========================
Cypress.Commands.add('voltarParaHome', () => {

  cy.log('Voltando para Home')

  // Estratégia 1 - link direto (mais confiável)
  cy.get('a[href*="portal-seguranca/painel-modulos"]', { timeout: 15000 })
    .then(($links) => {

      if ($links.length > 0) {

        cy.wrap($links.first()).click()

      } else {

        // Estratégia 2 - logo (fallback)
        cy.get('img[alt*="originar"], img[alt*="Originar"]', { timeout: 15000 })
          .should('be.visible')
          .first()
          .then(($img) => {

            const link = $img.closest('a')

            if (link.length > 0) {
              cy.wrap(link).click()
            } else {
              cy.wrap($img).click()
            }

          })

      }

    })

  // Valida bug redirecionamento para login
  cy.url({ timeout: 10000 }).should((url) => {

    expect(url).not.to.include('login')
    expect(url).to.include('/portal-seguranca/painel-modulos')

  })

  // Valida que foi para home
  cy.get('.subheader--content .title', { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', 'Bem-vindo à Plataforma Originar')

})