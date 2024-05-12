describe("Modal Component", () => {
    beforeEach(() => {
      cy.visit("/");
  
      cy.get('[data-testid="login-button"]').click();
  
      cy.get('[data-testid="email"]').type("testmail5@gmail.com");
      cy.get('[data-testid="password"]').type("Hamdi123*");
  
      cy.get('[data-testid="login-form"]').submit();
  
      cy.url().should("include", "/dashboard", { timeout: 10000 });
    });
    it("applied jobs list", () => {
      cy.get('[data-testid="applied-job"]').should("exist");
      cy.get('[data-testid="job-name"]').should("exist");
      cy.get('[data-testid="job-location"]').should("exist");
      cy.get('[data-testid="company-name"]').should("exist");
    });
  });
  