import { modulos } from '../../support/data/modulos'

describe('Módulos - Navegação e retorno para Home', () => {

    beforeEach(() => {
        cy.loginCompleto()
    })

    // =========================
    // FUNÇÃO AUXILIAR
    // =========================
    const acessarModulo = (seletor) => {

        cy.get(seletor, { timeout: 10000 })
            .filter(':visible')
            .should('have.length.greaterThan', 0)
            .first()
            .click()

    }

    // =========================
    // TESTES
    // =========================
    modulos.forEach((modulo) => {

        it(`Deve acessar ${modulo.nome} e retornar para Home`, () => {

            cy.log(`Acessando módulo: ${modulo.nome}`)

            // Acessa módulo
            acessarModulo(modulo.seletor)

            // Garante que saiu da home
            cy.url({ timeout: 10000 })
                .should('not.include', '/portal-seguranca/painel-modulos')

            // Retorna para Home (fluxo real do usuário)
            cy.voltarParaHome()

        })

    })

})