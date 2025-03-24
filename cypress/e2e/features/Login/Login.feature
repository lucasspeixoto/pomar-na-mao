Feature: Login
  
  Scenario: Login with invalid inputs
    Given The user is on the login page
    When The user enter lspeixotodev in the email field
    Then The message Endereço de E-mail inválido! should be displayed above the email field
    When The user enter ad in the password field
    Then The message Este campo deve ter ao menos 3 caracteres! should be displayed above the password field
    And I should see Login button disabled  
    And Inputs are cleaned up


  Scenario: Login with valid inputs
    When The user enter lspeixotodevdev in the email field
    And The user enter senha123 in the password field
    Then I should see Login button enable  
