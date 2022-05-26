/* eslint-disable testing-library/await-async-utils */
/// <reference types="Cypress" />

describe('Admin only actions', () => {
  beforeEach(() => {
    // to reseed DB
    cy.exec('npm run e2e:seedDB');
    // to login programmatically
    cy.visit('http://localhost:3000');
    cy.request('POST', 'http://localhost:5000/api/users/auth', {
      email: Cypress.env('adminEmail'),
      password: Cypress.env('adminPassword'),
    }).then((resp) => {
      window.localStorage.setItem(
        'infoUser',
        JSON.stringify({ token: resp.body.data })
      );
    });
    cy.window().then((win) => win.location.reload());
    cy.intercept({
      method: 'GET',
      url: '/api/users/',
    }).as('getUsers');
  });

  it("Can change a user's state", () => {
    cy.intercept({
      method: 'PUT',
      url: '/api/users/*',
    }).as('updateUser');

    cy.wait('@getUsers')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get(
      '[data-testid="MuiDataTableBodyCell-3-1"] > .tss-1qtl85h-MUIDataTableBodyCell-root > [aria-label="Cambiar estado"]'
    ).click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.wait('@updateUser').its('response.statusCode').should('eq', 200);
    cy.wait('@getUsers')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
  });

  it("Can view a user's modal info", () => {
    cy.wait('@getUsers')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get(
      '[data-testid="MuiDataTableBodyCell-3-0"] > .tss-1qtl85h-MUIDataTableBodyCell-root > [aria-label="Más información"]'
    ).click();
    cy.get('.MuiDialogContent-root > .MuiPaper-root').should('be.visible');
  });
});
