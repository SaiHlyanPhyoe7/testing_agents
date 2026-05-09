import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/auth/authSlice.js'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [auth.isAuthenticated, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(login({ username, password }))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <div className="w-full rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40 sm:p-12">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Secure login</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Welcome back</h1>
            <p className="mt-3 text-slate-400">Sign in with your admin credentials to access the dashboard.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-slate-200">
              Username
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                placeholder="admin"
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              />
            </label>

            <label className="block text-sm font-medium text-slate-200">
              Password
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="admin"
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              />
            </label>

            {auth.error && (
              <div className="rounded-3xl border border-rose-300 bg-rose-950/95 px-4 py-3 text-sm text-rose-100">
                {auth.error}
              </div>
            )}

            <button
              type="submit"
              disabled={auth.status === 'loading'}
              className="flex w-full items-center justify-center rounded-3xl bg-sky-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {auth.status === 'loading' ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <div className="mt-8 rounded-3xl bg-slate-950/90 px-6 py-5 text-sm text-slate-400 ring-1 ring-slate-700">
            <p className="font-medium text-slate-200">Admin demo credentials</p>
            <p>username: <span className="font-semibold text-white">admin</span></p>
            <p>password: <span className="font-semibold text-white">admin</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
