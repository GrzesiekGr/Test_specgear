Cypress.Commands.add('ConfirmPopUp', () => {
    cy.get('body').then(($body) => {
        if ($body.find('#x13pmcookiebar-acceptation').length > 0) {
            cy.get('#x13pmcookiebar-acceptation').then(($button) => {
                if ($button.is(':visible')) {
                    cy.wrap($button).click();
                }
            })
        }
    })
})