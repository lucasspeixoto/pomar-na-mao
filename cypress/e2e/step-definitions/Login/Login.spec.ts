import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import LoginForm from '../../../support/forms/login';

const loginForm = new LoginForm();

const invalidInput = {
  email: 'lspeixotodev',
  password: 'ad',
};

const validInput = {
  email: 'lspeixotodev@gmail.com',
  password: 'senha123',
};

Given('The user is on the login page', () => {
  cy.visit('/');
});

When(`The user enter lspeixotodev in the email field`, () => {
  loginForm.typeEmail(invalidInput.email);
});
Then(`The message Endereço de E-mail inválido! should be displayed above the email field`, () => {
  loginForm.elements.emailErrorMessageSpan().should('be.visible');
  loginForm.elements
    .emailErrorMessageSpan()
    .should('contains.text', 'Endereço de E-mail inválido!');
});

When(`The user enter ad in the password field`, () => {
  loginForm.typePassword(invalidInput.password);
});

Then(
  'The message Este campo deve ter ao menos 3 caracteres! should be displayed above the password field',
  () => {
    loginForm.elements.passwordErrorMessageSpan().should('be.visible');
    loginForm.elements
      .passwordErrorMessageSpan()
      .should('contains.text', 'Este campo deve ter ao menos 3 caracteres!');
  }
);

And('I should see Login button disabled', () => {
  loginForm.elements.loginButton().should('be.disabled');
});

And('Inputs are cleaned up', () => {
  loginForm.clearEmail();
  loginForm.clearPassword();

  cy.clearAllLocalStorage();
});

When(`The user enter lspeixotodevdev in the email field`, () => {
  loginForm.typeEmail(validInput.email);
});

And(`The user enter senha123 in the password field`, () => {
  loginForm.typePassword(validInput.password);
});

And('I should see Login button enable', () => {
  loginForm.elements.loginButton().should('be.enabled');
});
