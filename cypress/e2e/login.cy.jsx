import { assertElement } from "../support/components"
import { dataToLogin } from "../support/data"

const errorMessages = {
  emptyUsername: 'Username is required',
  invalidCredentials: 'Username and password do not match any user in this service',
  lockedOut: 'Sorry, this user has been locked out.',
}

const verifyScreen = (data) => {
  assertElement('.login_credentials > h4', { haveText: 'Accepted usernames are:' })
  assertElement('.login_credentials', { contain: data.standardUser })
  assertElement('.login_credentials', { contain: data.lockedOutUser })
  assertElement('.login_credentials', { contain: data.problemUser })
  assertElement('.login_credentials', { contain: data.performanceGlitchUser })
  assertElement('.login_credentials', { notContain: data.password })
  assertElement('.login_password > h4', { 'haveText': 'Password for all users:' })
  assertElement('.login_password', { contain: data.password })
  assertElement('.login_password', { notContain: data.standardUser })
  assertElement('.login_password', { notContain: data.lockedOutUser })
  assertElement('.login_password', { notContain: data.problemUser })
  assertElement('.login_password', { notContain: data.performanceGlitchUser })
  assertElement('#user-name', { type: 'text', dataTest: 'username', name: 'user-name', placeholder: 'Username', autocorrect: 'off', autocaptalize: 'none', value: '' })
  assertElement('#password', { type: 'password', dataTest: 'password', name: 'password', placeholder: 'Password', autocorrect: 'off', autocaptalize: 'none', value: '' })
  assertElement('#login-button', { type: 'submit', value: 'LOGIN', click: true })
}

const loginAttempt = (email, password) => {
  assertElement('#user-name', { write: email })
  assertElement('#password', { write: password })
  assertElement('#login-button', { click: true })
}

const errorsLoginAttempt = (msg) => {
  assertElement('.error-button > svg', { dataIcon: 'times-circle', role: 'img', viewBox: '0 0 512 512' })
  assertElement('.login-box h3', { contain: 'Epic sadface:' })
  assertElement('.login-box h3', { contain: msg })
}

describe('Sauce Demo - login', () => {
  const data = dataToLogin()

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/v1/');
  });

  it('Login with standardUser', () => {
    //Verify initial screen
    verifyScreen(data)

    //Login attempt without filling in any data and error return
    errorsLoginAttempt(errorMessages.emptyUsername)

    //Login attempt using only spaces
    loginAttempt('       ', '       ')
    errorsLoginAttempt(errorMessages.invalidCredentials)

    //Login attempt using correct email, but incorret password
    loginAttempt(data.standardUser, 'password')
    errorsLoginAttempt(errorMessages.invalidCredentials)

    //Login attempt using incorrect email, but correct password
    loginAttempt('username', data.password)
    errorsLoginAttempt(errorMessages.invalidCredentials)

    //Login attempt using email and correct password
    loginAttempt(data.standardUser, data.password)
    assertElement('.product_label', { haveText: 'Products' })
  })

  it('Login with lockedOutUser', () => {
    //Login attempt using email and correct password
    loginAttempt(data.lockedOutUser, data.password)
    errorsLoginAttempt(errorMessages.lockedOut)
  })

  it('Login with problemUser', () => {
    //Login attempt using email and correct password
    loginAttempt(data.problemUser, data.password)
    assertElement('.product_label', { haveText: 'Products' })
  })

  it('Login with performanceGlitchUser', () => {
    //Login attempt using email and correct password
    loginAttempt(data.performanceGlitchUser, data.password)
    assertElement('.product_label', { haveText: 'Products' })
  })

})