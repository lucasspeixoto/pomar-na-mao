import type { CypressQueryElement } from '../models/cypress';

class LoginForm {
  elements = {
    emailInput: (): CypressQueryElement => cy.get('#emailField'),
    passwordInput: (): CypressQueryElement => cy.get('#passwordField'),

    emailErrorMessageSpan: (): CypressQueryElement => cy.get('#email'),
    passwordErrorMessageSpan: (): CypressQueryElement => cy.get('#minLength'),

    loginButton: (): CypressQueryElement => cy.get('#loginButton'),
  };

  typeEmail(text: string): void {
    if (!text) return;

    this.elements.emailInput().type(text);
  }

  typePassword(text: string): void {
    if (!text) return;

    this.elements.passwordInput().type(text);
  }

  clearEmail(): void {
    this.elements.emailInput().clear();
  }

  clearPassword(): void {
    this.elements.passwordInput().clear();
  }
}

export default LoginForm;
