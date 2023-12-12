describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')

    cy.get('#card_ingredient').click();

    cy.get('#ingredient-modal-name').should('be.visible');

    cy.get('#modal-calories').should('be.visible');

    cy.get('#modal-proteins').should('be.visible');

    cy.get('#modal-fat').should('be.visible');

    cy.get('#modal-carbohydrates').should('be.visible');

    cy.get('#close-button').click();
  })
})
