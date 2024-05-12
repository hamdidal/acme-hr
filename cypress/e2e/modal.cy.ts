describe("Modal Component", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="email"]').type("testmail5@gmail.com");
    cy.get('[data-testid="password"]').type("Hamdi123*");

    cy.get('[data-testid="login-form"]').submit();

    cy.url().should("include", "/dashboard", { timeout: 10000 });
  });

//   it("renders correctly when isApply is false", () => {
//     cy.get('[data-testid="card-withdraw-modal"] > button')
//       .contains("Withdraw Application")
//       .click();
//     cy.get('[data-testid="card-withdraw-modal"]').should("exist");

//     cy.get('[data-testid="modal-content-title"]').should("exist");
//     cy.get('[data-testid="modal-content-message"]').should("exist");
//     cy.get('[data-testid="modal-buttons"]').should("exist");
//     cy.get('[data-testid="modal-buttons"] > button').contains("Cancel").click();
//   });

  it("renders correctly when isApply is true", () => {
    cy.get('[data-testid="card-apply-modal"] > button')
      .contains("Show Details")
      .click();
    cy.get('[data-testid="card-apply-modal"]').should("exist");

    cy.get('[data-testid="modal-apply-detail-title"]').should("exist");
    cy.get('[data-testid="modal-apply-location"]').should("exist");
    cy.get('[data-testid="modal-apply-salary"]').should("exist");
    cy.get('[data-testid="modal-apply-name"]').should("exist");
    cy.get('[data-testid="modal-apply-company-name"]').should("exist");
    cy.get('[data-testid="modal-apply-description"]').should("exist");
    cy.get('[data-testid="modal-apply-keyword"]').should("exist");
    cy.get('[data-testid="modal-buttons"]').should("exist");
    cy.get('[data-testid="modal-buttons"] > button').contains("Cancel").click();
  });
});
