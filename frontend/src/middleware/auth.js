const COOKIE_NAME = 'auth_session'

const readCookie = () => {
  const match = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

export const setAuthSession = (username) => {
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toUTCString()
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(username)}; path=/; expires=${expires}; secure; samesite=strict`
  sessionStorage.setItem('authUser', username)
}

export const clearAuthSession = () => {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; secure; samesite=strict`
  sessionStorage.removeItem('authUser')
}

export const getAuthUser = () => {
  return readCookie() || sessionStorage.getItem('authUser')
}

export const isAuthenticated = () => {
  return Boolean(getAuthUser())
}
