Feature: Login

  Scenario: Submiting a login in invalid inputs
    Given I am on the login page
    When I enter "lspeixotodev" in the email field
    Then I enter "ad" in the password field
    Then I should see "Endereço de E-mail inválido!" message above the title field
    And I should see "Este campo deve ter ao menos 3 caracteres!" message above the password field
    And I should see Login button disabled

  Scenario: Submiting a login in valid inputs
    When I enter "lspeixotodev@gmail.com" in the email field
    Then I enter "senha123" in the password field
    Then I should see Login button enable
    And I should see Login button with correct background