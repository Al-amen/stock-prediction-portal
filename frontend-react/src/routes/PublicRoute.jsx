
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider';

const PublicRoute = ({children}) => {
     const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext);
  return !isLoggedIn ? (
    children
  ):(
    <Navigate to='/dashboard' />
  )
}

export default PublicRoute