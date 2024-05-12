describe('JobTable Component', () => {
    beforeEach(() => {
        cy.visit("/");
  
        cy.get('[data-testid="login-button"]').click();
    
        cy.get('[data-testid="email"]').type("testmail5@gmail.com");
        cy.get('[data-testid="password"]').type("Hamdi123*");
    
        cy.get('[data-testid="login-form"]').submit();
    
        cy.url().should("include", "/dashboard", { timeout: 10000 });
    })
  
    it('renders correctly with data', () => {
      cy.get('[data-testid="table-container"]').should('exist')
  
      cy.get('[data-testid="table-card"]').should('have.length.greaterThan', 0)
  
    })
  
  
    it('changes page size', () => {
      cy.get('[data-testid="page-size-select"]').select('25').should('have.value', '25')
  
      cy.get('[data-testid="table-card"]').should('have.length', 25)
    })
  
    it('navigates through pages', () => {
      cy.get('[data-testid="next-page-button"]').click()
      cy.get('[data-testid="page-number"]').should('contain.text', '2')
  
      cy.get('[data-testid="previous-page-button"]').click()
      cy.get('[data-testid="page-number"]').should('contain.text', '1')
    })
  })
  