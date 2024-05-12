describe("Card Component Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="email"]').type("testmail5@gmail.com");
    cy.get('[data-testid="password"]').type("Hamdi123*");

    cy.get('[data-testid="login-form"]').submit();

    cy.url().should("include", "/dashboard", { timeout: 10000 });
  });

  it("renders card with correct content", () => {
    cy.get('[data-testid="card-container"]').should("exist");
    cy.get('[data-testid="card-name"]').should("exist");
    cy.get('[data-testid="card-company-name"]').should("exist");
    cy.get('[data-testid="card-location"]').should("exist");
    cy.get('[data-testid="card-salary"]').should("contain", "Salary"); 
    cy.get('[data-testid="card-keywords"]').should("contain", "Keywords"); 
  });

  it("opens detail modal when show details button is clicked", () => {
    cy.get('[data-testid="card-apply-modal"] > button').contains("Show Details").click();
    cy.get('[data-testid="card-apply-modal"]').should("exist");
  });

  it("withdraw modal when withdraw button is clicked", () => {
    cy.get('[data-testid="card-withdraw-modal"] > button').contains("Withdraw Application").click();
    cy.get('[data-testid="card-withdraw-modal"]').should("exist");
  });
});
