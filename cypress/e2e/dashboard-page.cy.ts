describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email"]').type("hamditest1@test.com");
    cy.get('[data-testid="password"]').type("Hamdi123*");
    cy.get('[data-testid="login-form"]').submit();

    cy.url().should("include", "/dashboard", { timeout: 5000 });
  });

  it("should display dashboard title correctly", () => {
    cy.get('[data-testid="dashboard-header"]').should("exist");;
  });

  it("should filter jobs correctly", () => {
    cy.get('[data-testid="filter-dropdown"]').select("Name");
    cy.get('[data-testid="search-input"]').type("Google");
  });
});
