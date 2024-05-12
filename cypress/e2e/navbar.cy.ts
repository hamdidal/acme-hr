describe("Modal Component", () => {
    beforeEach(() => {
      cy.visit("/");
  
      cy.get('[data-testid="login-button"]').click();
  
      cy.get('[data-testid="email"]').type("testmail5@gmail.com");
      cy.get('[data-testid="password"]').type("Hamdi123*");
  
      cy.get('[data-testid="login-form"]').submit();
  
      cy.url().should("include", "/dashboard", { timeout: 10000 });
    });
    it("navbar", () => {
      cy.get('[data-testid="navbar-container"]').should("exist");
      cy.get('[data-testid="applied-title"]').should("exist");
      cy.get('[data-testid="navbar-user"]').should("exist");
      cy.get('[data-testid="applied-jobs"]').should("exist");
      cy.get('[data-testid="header-logout"]').should("exist");
      cy.get('[data-testid="header-logout"]').click();
    });
  });
  