class LoginForm {
  elements = {
    emailInput: () => cy.get('#emailField'),
    passwordInput: () => cy.get('#passwordField'),

    emailErrorMessageSpan: () => cy.get('#email'),
    passwordErrorMessageSpan: () => cy.get('#minLength'),
    loginButton: () => cy.get('#loginButton'),
  };

  typeEmail(text) {
    if (!text) return;

    this.elements.emailInput().type(text);
  }

  typePassword(text) {
    if (!text) return;

    this.elements.passwordInput().type(text);
  }

  clearEmail() {
    this.elements.emailInput().clear();
  }

  clearPassword() {
    this.elements.passwordInput().clear();
  }
}

const loginForm = new LoginForm();

describe('Login', () => {
  describe('Submiting a login in invalid inputs', () => {
    after(() => {
      loginForm.clearEmail();
      loginForm.clearPassword();

      cy.clearAllLocalStorage();
    });

    const input = {
      email: 'lspeixotodev',
      password: 'ad',
    };

    it('I am on the login page', () => {
      cy.visit('/'); // Replace '/login' with the actual login page URL if different
    });

    it(`I enter ${input.email} in the email field`, () => {
      loginForm.typeEmail(input.email);
    });

    it(`I enter ${input.password} in the password field`, () => {
      loginForm.typePassword(input.password);
    });

    it(`I should see "⚠ Endereço de E-mail inválido!" message above the title field`, () => {
      loginForm.elements.emailErrorMessageSpan().should('be.visible');
      loginForm.elements
        .emailErrorMessageSpan()
        .should('contains.text', 'Endereço de E-mail inválido!');
    });
    it(`I should see "⚠ Este campo deve ter ao menos 3 caracteres!" message above the password field`, () => {
      loginForm.elements.passwordErrorMessageSpan().should('be.visible');
      loginForm.elements
        .passwordErrorMessageSpan()
        .should('contains.text', 'Este campo deve ter ao menos 3 caracteres!');
    });
    it(`I should see Login button disabled`, () => {
      loginForm.elements.loginButton().should('be.disabled');
    });
  });

  describe('Submiting a login in valid inputs', () => {
    after(() => {
      cy.clearAllLocalStorage();
    });

    const input = {
      email: 'lspeixotodev@gmail.com',
      password: 'senha123',
    };

    it(`I enter ${input.email} in the email field`, () => {
      loginForm.typeEmail(input.email);
    });

    it(`I enter ${input.password} in the password field`, () => {
      loginForm.typePassword(input.password);
    });

    it(`I should see Login button disabled`, () => {
      loginForm.elements.loginButton().should('be.enabled');
    });

    it(`I should see Login button with correct background`, () => {
      loginForm.elements.loginButton().should(([element]) => {
        const styles = window.getComputedStyle(element);
        const backgroundColor = styles.getPropertyValue('background-color');
        expect(backgroundColor).to.equal('rgb(23, 125, 220)');
      });
    });
  });
});
