import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from './Spinner.jsx'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isRestored } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!isRestored) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
