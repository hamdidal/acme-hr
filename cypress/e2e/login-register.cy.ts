describe("Login and Registration Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  ('[data-testid="job-name"]');


  describe("Login Functionality", () => {
    it("should allow valid users to login", () => {
      cy.get('[data-testid="login-button"]').click();

      cy.get('[data-testid="email"]').type("hamdi4test@test.com");
      cy.get('[data-testid="password"]').type("Hamdi123*");

      cy.get('[data-testid="login-form"]').submit();

      cy.url().should("include", "/dashboard", { timeout: 10000 });
    });
  });

  describe("Registration Functionality (if applicable)", () => {
    it("should allow new users to register", () => {
      cy.get('[data-testid="signup-button"]').click();

      cy.get('[data-testid="register-email"]').type(`newuser${Math.floor((Math.random() * (60 - 0 + 1)) + 0)}@example.com`);
      cy.get('[data-testid="register-password"]').type("Hamdi123*").click({force: true});

      cy.get('[data-testid="register-form"]').submit();

      cy.url().should("include", "/dashboard", { timeout: 10000 });
    });
  });
});
