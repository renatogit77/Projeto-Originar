describe('Módulos - Navegação e retorno para Home', () => {

    beforeEach(() => {
        cy.loginCompleto()
    })

    // =========================
    // MAPEAMENTO DOS MÓDULOS
    // =========================

    const modulos = [
        { nome: 'Levantamentos', seletor: 'a[href*="/originar/"]', tipo: 'externo' },
        { nome: 'Delimitar Fazenda', seletor: 'a[href*="/fazenda/"]', tipo: 'externo' },
        { nome: 'Sustentabilidade', seletor: 'a[href*="/sustentabilidade/"]', tipo: 'externo' },
        { nome: 'Inteligência', seletor: 'a[href*="/inteligencia/"]', tipo: 'externo' },
        { nome: 'Monitoramento', seletor: 'a[href*="/monitoramento/"]', tipo: 'externo' },
        { nome: 'Farmer Selling', seletor: 'a[href*="/farmer"]', tipo: 'externo' },
        { nome: 'Informativo Semanal', seletor: 'a[href*="/informativo"]', tipo: 'externo' },

        { nome: 'Painel Originar', seletor: 'a[href*="/painel"]', tipo: 'interno' },
        { nome: 'Parametrização', seletor: 'a[href*="/parametrizacao"]', tipo: 'interno' }
    ]

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