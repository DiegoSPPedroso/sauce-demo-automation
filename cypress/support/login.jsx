import { assertElement } from "./components"
import { dataToLogin } from "./data"

export const login = () => {
    assertElement('#user-name', { write: dataToLogin().standardUser })
    assertElement('#password', { write: dataToLogin().password })
    assertElement('#login-button', { click: true })
}