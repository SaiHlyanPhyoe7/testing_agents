import { clearAuthSession, getAuthUser, isAuthenticated as hasAuthSession, setAuthSession } from '../../middleware/auth.js'

const VALID_USERNAME = 'admin'
const VALID_PASSWORD = 'admin'

export const loginRequest = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        setAuthSession(username)
        resolve({ username })
      } else {
        reject(new Error('Invalid username or password'))
      }
    }, 400)
  })
}

export const logoutRequest = () => {
  clearAuthSession()
}

export const restoreSession = () => {
  const username = hasAuthSession() ? getAuthUser() : null
  return {
    isAuthenticated: Boolean(username),
    username,
  }
}
