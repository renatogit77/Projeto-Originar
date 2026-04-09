
import { modulos } from '../../support/data/modulos'

describe('Módulos - Dashboard', () => {

  beforeEach(() => {
    cy.loginCompleto()
  })

  // =========================
  // TESTE DE PRESENÇA DOS MÓDULOS
  // =========================
  it('Deve exibir todos os módulos', () => {

    cy.get('.modulo').should('have.length', 9)

    const nomesModulos = [
      'Levantamentos',
      'Delimitar Fazenda',
      'Sustentabilidade',
      'Inteligência',
      'Monitoramento',
      'Farmer Selling',
      'Informativo Semanal',
      'Painel Originar',
      'Parametrização'
    ]

    nomesModulos.forEach((modulo) => {
      cy.get('.modulo')
        .contains(modulo)
        .should('be.visible')
    })

  })

  // =========================
  // TESTES DE NAVEGAÇÃO DOS MÓDULOS
  // =========================
  modulos.forEach((modulo) => {

    it(`Deve validar o módulo ${modulo.nome}`, () => {
      
      //  Intercept global (qualquer API)
      cy.intercept('**/api/**').as('apiGeral')
      
      //  Intercept específico (se existir)
      if (modulo.api) {
        cy.intercept(modulo.api).as('apiModulo')
      }
      
      //  Captura erro de console
      cy.window().then((win) => {
        cy.spy(win.console, 'error').as('consoleError')
      })
      
      //  Clique no módulo
      cy.get(modulo.seletor)
        .filter(':visible')
        .first()
        .click()
      
      //  Valida URL
      cy.url({ timeout: 20000 })
        .should('include', modulo.url)
      
      //  Garante renderização básica
      cy.get('body', { timeout: 15000 }).should('be.visible')
      
      //  Pequena espera para APIs acontecerem (controlada)
      cy.wait(2000, { log: false })
      
      // =========================
      // VALIDAÇÃO API GERAL
      // =========================
      cy.get('@apiGeral.all').then((calls) => {
        cy.log(`Módulo: ${modulo.nome}`)
        cy.log(`Total de APIs gerais: ${calls.length}`)
      
        if (calls.length === 0) {
          cy.log('Nenhuma API geral detectada')
        }
      })
      
      // =========================
      // VALIDAÇÃO API ESPECÍFICA
      // =========================
      if (modulo.api) {
        cy.get('@apiModulo.all').then((calls) => {
      
          if (calls.length > 0) {
      
            cy.log(`API específica capturada (${calls.length} chamadas)`)
      
            calls.forEach((call, index) => {
      
              cy.log(`[${index + 1}] ${call.request.url}`)
      
              if (call.response) {
                expect(call.response.statusCode).to.eq(200)
              }
      
            })
      
          } else {
            cy.log(`API específica NÃO capturada para ${modulo.nome}`)
          }
      
        })
      }
      
      // =========================
      // VALIDA LOADING
      // =========================
      cy.get('.loading, .spinner, .MuiCircularProgress-root', { timeout: 10000 })
        .should('not.exist')
      
      // =========================
      // VALIDA ERRO JS
      // =========================
      cy.get('@consoleError')
        .should('not.have.been.called')
      
    })

  })

})