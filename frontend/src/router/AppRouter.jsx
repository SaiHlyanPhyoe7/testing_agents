import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import { restoreSession as restoreAuthState } from '../features/auth/authSlice.js'
import { restoreSession } from '../services/api/authService.js'

function AppRouter() {
  const dispatch = useDispatch()

  useEffect(() => {
    const session = restoreSession()
    dispatch(restoreAuthState(session))
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
