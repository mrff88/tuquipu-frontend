/* eslint-disable testing-library/await-async-utils */
/// <reference types="Cypress" />

describe("Common non auth user's actions", () => {
  before(() => {
    // to reseed DB
    cy.exec('npm run e2e:seedDB');
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Can login', () => {
    cy.intercept({
      method: 'POST',
      url: '/api/users/auth',
    }).as('login');

    cy.url().should('include', '/login');
    cy.get('#\\:r1\\:').type(Cypress.env('adminEmail'));
    cy.get('#\\:r3\\:').type(Cypress.env('adminPassword'));
    cy.get('.MuiButton-root').click();
    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'Inicio de sesión exitoso'
    );
  });

  it("Won't login if user is inactive", () => {
    cy.intercept({
      method: 'POST',
      url: '/api/users/auth',
    }).as('login');

    cy.url().should('include', '/login');
    cy.get('#\\:r1\\:').type(Cypress.env('inactiveUserEmail'));
    cy.get('#\\:r3\\:').type(Cypress.env('inactiveUseserPassword'));
    cy.get('.MuiButton-root').click();
    cy.wait('@login').its('response.statusCode').should('eq', 401);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'Usuario no activo'
    );
  });

  it("Won't login if password is incorrect", () => {
    cy.intercept({
      method: 'POST',
      url: '/api/users/auth',
    }).as('login');

    cy.url().should('include', '/login');
    cy.get('#\\:r1\\:').type(Cypress.env('adminEmail'));
    cy.get('#\\:r3\\:').type('WrongPassword');
    cy.get('.MuiButton-root').click();
    cy.wait('@login').its('response.statusCode').should('eq', 403);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'Usuario o contraseña incorrecta'
    );
  });

  it('Can register user', () => {
    cy.intercept({
      method: 'POST',
      url: '/api/users/',
    }).as('registerUser');

    cy.url().should('include', '/login');
    cy.get('.MuiGrid-root > .MuiTypography-root').click();
    cy.url().should('include', '/register');
    cy.get('#\\:r5\\:').type('Maria');
    cy.get('#\\:r7\\:').type('Cardenas Gutierrez');
    cy.get('#\\:r9\\:').type('mariacg123@gmail.com');
    cy.get('#\\:rb\\:').type('963123456');
    cy.get('#\\:rd\\:').type('Test123@');
    cy.get('#\\:rf\\:').type('Test123@');
    cy.get('.MuiButton-root').click();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 201);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'Se registro al usuario con exito'
    );
  });

  it("Won't register user if email is registered to another user", () => {
    cy.intercept({
      method: 'POST',
      url: '/api/users/',
    }).as('registerUser');

    cy.url().should('include', '/login');
    cy.get('.MuiGrid-root > .MuiTypography-root').click();
    cy.url().should('include', '/register');
    cy.get('#\\:r5\\:').type('Maria');
    cy.get('#\\:r7\\:').type('Cardenas Gutierrez');
    cy.get('#\\:r9\\:').type('mariacg123@gmail.com');
    cy.get('#\\:rb\\:').type('963123456');
    cy.get('#\\:rd\\:').type('Test123@');
    cy.get('#\\:rf\\:').type('Test123@');
    cy.get('.MuiButton-root').click();
    cy.wait('@registerUser').its('response.statusCode').should('eq', 422);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'ValidationError: email: El correo ya esta registrado con otra cuenta'
    );
  });
});
