/* eslint-disable testing-library/await-async-utils */
/// <reference types="Cypress" />

describe("User's actions", () => {
  beforeEach(() => {
    // to reseed DB
    cy.exec('npm run e2e:seedDB');
    // to login programmatically
    cy.visit('http://localhost:3000');
    cy.request('POST', 'http://localhost:5000/api/users/auth', {
      email: Cypress.env('userEmail'),
      password: Cypress.env('userPassword'),
    }).then((resp) => {
      window.localStorage.setItem(
        'infoUser',
        JSON.stringify({ token: resp.body.data })
      );
    });
    cy.window().then((win) => win.location.reload());
    cy.intercept({
      method: 'GET',
      url: '/api/clients/',
    }).as('getClients');
  });

  it('Can register a client', () => {
    cy.intercept({
      method: 'POST',
      url: '/api/clients/',
    }).as('registerClient');

    cy.url().should('include', '/clientes');
    cy.wait('@getClients')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('[aria-label="Registrar un cliente"]').click();
    cy.url().should('include', '/clientes/registrar');
    cy.get('#\\:rj\\:').type('Jose');
    cy.get('#\\:rl\\:').type('Belizario Robles');
    cy.get('#\\:rn\\:').type('jbelizarior44@gmail.com');
    cy.get('#\\:rp\\:').type('951753654');
    cy.get('#\\:rr\\:').type('45153654');
    cy.get(':nth-child(2) > .MuiButton-root').click();
    cy.wait('@registerClient').its('response.statusCode').should('eq', 201);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'Se registro al cliente con exito'
    );
  });

  it("Won't register a client if the email has been registered to another client", () => {
    cy.intercept({
      method: 'POST',
      url: '/api/clients/',
    }).as('registerClient');

    cy.url().should('include', '/clientes');
    cy.wait('@getClients')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('[aria-label="Registrar un cliente"]').click();
    cy.url().should('include', '/clientes/registrar');
    cy.get('#\\:rj\\:').type('Jose');
    cy.get('#\\:rl\\:').type('Belizario Robles');
    cy.get('#\\:rn\\:').type(Cypress.env('clientEmail'));
    cy.get('#\\:rp\\:').type('951753654');
    cy.get('#\\:rr\\:').type('45153654');
    cy.get(':nth-child(2) > .MuiButton-root').click();
    cy.wait('@registerClient').its('response.statusCode').should('eq', 422);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'ValidationError: email: El correo ya esta registrado con otra cuenta'
    );
  });

  it("Can edit a client's data", () => {
    cy.intercept({
      method: 'GET',
      url: '/api/clients/*',
    }).as('getClient');
    cy.intercept({
      method: 'PUT',
      url: '/api/clients/*',
    }).as('updateClient');

    cy.url().should('include', '/clientes');
    cy.wait('@getClients')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get(
      '[data-testid="MuiDataTableBodyCell-3-0"] > .tss-1qtl85h-MUIDataTableBodyCell-root > [aria-label="Editar cliente"]'
    ).click();
    cy.url().should('include', '/clientes/editar/');
    cy.wait('@getClient')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('#\\:rn\\:').type('{selectall}').type('eliza321@gmail.com');
    cy.get('#\\:rp\\:').type('{selectall}').type('951753658');
    cy.get(':nth-child(2) > .MuiButton-root').click();
    cy.wait('@updateClient').its('response.statusCode').should('eq', 200);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'Se actualizo los datos del cliente con exito'
    );
  });

  it("Won't edit a clients data if email is registered to another client", () => {
    cy.intercept({
      method: 'GET',
      url: '/api/clients/*',
    }).as('getClient');
    cy.intercept({
      method: 'PUT',
      url: '/api/clients/*',
    }).as('updateClient');

    cy.url().should('include', '/clientes');
    cy.wait('@getClients')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get(
      '[data-testid="MuiDataTableBodyCell-3-0"] > .tss-1qtl85h-MUIDataTableBodyCell-root > [aria-label="Editar cliente"]'
    ).click();
    cy.url().should('include', '/clientes/editar/');
    cy.wait('@getClient')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('#\\:rn\\:')
      .type('{selectall}')
      .type(Cypress.env('anotherClientEmail'));
    cy.get('#\\:rp\\:').type('{selectall}').type('951753658');
    cy.get(':nth-child(2) > .MuiButton-root').click();
    cy.wait('@updateClient').its('response.statusCode').should('eq', 422);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'ValidationError: email: El correo ya esta registrado con otra cuenta'
    );
  });

  it("Can view a client's modal info", () => {
    cy.wait('@getClients')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get(
      '[data-testid="MuiDataTableBodyCell-3-0"] > .tss-1qtl85h-MUIDataTableBodyCell-root > [aria-label="Más información"]'
    ).click();
    cy.get('.MuiDialogContent-root > .MuiPaper-root').should('be.visible');
  });

  it("Can register a client's device", () => {
    cy.intercept({
      method: 'GET',
      url: '/api/devices/*',
    }).as('getDevices');
    cy.intercept({
      method: 'POST',
      url: '/api/devices/*',
    }).as('registerDevice');

    cy.wait('@getClients')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.visit('http://localhost:3000/dispositivos/628e6a0d6caa06382c6d6114');
    cy.wait('@getDevices')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('[aria-label="Registrar un dispositivo"]').click();
    cy.url().should(
      'include',
      '/dispositivos/registrar/628e6a0d6caa06382c6d6114'
    );
    cy.get('#\\:rf\\:').click();
    cy.get('[data-value="Laptop"]').click();
    cy.get('#\\:rh\\:').type('Sager');
    cy.get('#\\:rj\\:').type('LP-4509');
    cy.get('#\\:rn\\:').type('XO-450988-008');
    cy.get('.css-8tu840 > .MuiButtonBase-root').click();
    cy.get('iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .and('be.visible')
      .then(cy.wrap)
      .find('input[type="file"]')
      .selectFile('cypress/fixtures/sager.jpg');
    cy.get('iframe')
      .its('0.contentDocument.body')
      .find('[data-test="skip-button"]')
      .click();
    cy.wait(500);
    cy.get('.css-8tu840 > .MuiBox-root')
      .should('be.visible')
      .and('have.attr', 'src');
    cy.get(':nth-child(2) > .MuiButton-root').click();
    cy.wait('@registerDevice').its('response.statusCode').should('eq', 201);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'Se registro el dispositivo con exito'
    );
  });

  it("Can edit a client's device data", () => {
    cy.intercept({
      method: 'GET',
      url: '/api/devices/*',
    }).as('getDevices');
    cy.intercept({
      method: 'GET',
      url: '/api/devices/device/*',
    }).as('getDevice');
    cy.intercept({
      method: 'PUT',
      url: '/api/devices/device/*',
    }).as('updateDevice');

    cy.wait('@getClients')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.visit('http://localhost:3000/dispositivos/628e6a0d6caa06382c6d6114');
    cy.wait('@getDevices')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('[aria-label="Editar dispositivo"]').click();
    cy.url().should('include', '/dispositivos/editar/628e6aae6caa06382c6d6138');
    cy.wait('@getDevice')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('#\\:rl\\:').type('{selectall}').type('2013');
    cy.get(':nth-child(2) > .MuiButton-root').click();
    cy.wait('@updateDevice').its('response.statusCode').should('eq', 200);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'Se actualizo los datos del dispositivo con exito'
    );
  });

  it("Can view a device's modal info", () => {
    cy.intercept({
      method: 'GET',
      url: '/api/devices/*',
    }).as('getDevices');

    cy.wait('@getClients')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.visit('http://localhost:3000/dispositivos/628e6a0d6caa06382c6d6114');
    cy.wait('@getDevices')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('[aria-label="Más información"]').click();
    cy.get('.MuiDialogContent-root > .MuiPaper-root').should('be.visible');
  });

  it("Can register a device's service", () => {
    cy.intercept({
      method: 'GET',
      url: '/api/services/*',
    }).as('getServices');
    cy.intercept({
      method: 'GET',
      url: '/api/devices/device/*',
    }).as('getDevice');
    cy.intercept({
      method: 'POST',
      url: '/api/services/*',
    }).as('registerService');

    cy.wait('@getClients')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.visit('http://localhost:3000/servicios/628e6aae6caa06382c6d6138');
    cy.url().should('include', '/servicios/628e6aae6caa06382c6d6138');
    cy.wait('@getServices')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('[aria-label="Registrar un servicio"]').click();
    cy.url().should('include', '/servicios/registrar/628e6aae6caa06382c6d6138');
    cy.wait('@getDevice')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('#\\:rh\\:').click();
    cy.get('[data-value="Limpieza"]').click();
    cy.get(':nth-child(2) > .MuiButton-root').click();
    cy.wait('@registerService').its('response.statusCode').should('eq', 201);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'Se registro el servicio con exito'
    );
  });

  it("Can finish a pending device's service", () => {
    cy.intercept({
      method: 'GET',
      url: '/api/services/*',
    }).as('getServices');
    cy.intercept({
      method: 'PUT',
      url: '/api/services/service/*',
    }).as('finishService');

    cy.wait('@getClients')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.visit('http://localhost:3000/servicios/628e6aae6caa06382c6d6138');
    cy.url().should('include', '/servicios/628e6aae6caa06382c6d6138');
    cy.wait('@getServices')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('[aria-label="Finalizar servicio"]').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.wait('@finishService').its('response.statusCode').should('eq', 200);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'Se actualizo el servicio con exito'
    );
  });

  it("Can cancel a pending device's service", () => {
    cy.intercept({
      method: 'GET',
      url: '/api/services/*',
    }).as('getServices');
    cy.intercept({
      method: 'PUT',
      url: '/api/services/service/*',
    }).as('cancelService');

    cy.wait('@getClients')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.visit('http://localhost:3000/servicios/628e6aae6caa06382c6d6138');
    cy.url().should('include', '/servicios/628e6aae6caa06382c6d6138');
    cy.wait('@getServices')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.get('[aria-label="Cancelar servisio"]').click();
    cy.get('.MuiDialogActions-root > :nth-child(2)').click();
    cy.wait('@cancelService').its('response.statusCode').should('eq', 200);
    cy.get('.MuiSnackbar-root > .MuiPaper-root').should(
      'have.text',
      'Se actualizo el servicio con exito'
    );
  });
});
