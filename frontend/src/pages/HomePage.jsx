import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice.js'
import { loadProducts } from '../features/data/dataSlice.js'
import { logoutRequest } from '../services/api/authService.js'
import ProductCard from '../components/ProductCard.jsx'
import Spinner from '../components/Spinner.jsx'

function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { username } = useSelector((state) => state.auth)
  const { items, status, error } = useSelector((state) => state.data)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadProducts())
    }
  }, [dispatch, status])

  const handleLogout = () => {
    logoutRequest()
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/95 px-4 py-5 shadow-sm shadow-slate-200/40 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-500">Ai Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Welcome, {username || 'Admin'}</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-3xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-[2rem] bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-10 text-white shadow-xl shadow-slate-400/20 sm:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-200">Dashboard overview</p>
              <h2 className="mt-3 text-4xl font-semibold">Product feed from Fakestore API</h2>
            </div>
            <div className="rounded-3xl bg-white/10 px-5 py-4 text-sm text-slate-100 shadow-lg shadow-slate-900/10">
              <p className="text-slate-200">Responsive cards, loading state, and protected routes.</p>
            </div>
          </div>
        </section>

        {status === 'loading' && <Spinner />}

        {error && (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700">
            Unable to load products. Error: {error}
          </div>
        )}

        {status === 'succeeded' && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage
