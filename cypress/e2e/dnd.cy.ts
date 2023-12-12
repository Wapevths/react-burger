describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");
    window.localStorage.setItem(
        "refreshToken",
        JSON.stringify("test-refreshToken")
    );
    cy.setCookie('token', 'test-accessToken')
  });
  it('passes', () => {
    const sourceCard = cy.get('#card_ingredient');
    const targetBlock = cy.get('#burger-constructor');
    sourceCard.trigger('dragstart');
    targetBlock.trigger('dragover').trigger('drop');
    cy.get('#order_button').click();
    cy.get('#order-number').should('be.visible');
    cy.get('#close-button').click();
  })
})
