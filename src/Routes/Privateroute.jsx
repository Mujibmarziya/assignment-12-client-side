import PropTypes from 'prop-types'
import { useContext } from 'react'
// import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../Authprovider/Authprovider'
// import LoadingSpinner from '../components/Shared/LoadingSpinner'

const Privateroute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

Privateroute.propTypes = {
  children: PropTypes.element,
}

export default Privateroute
