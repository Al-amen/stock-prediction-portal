
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider';



const PrivateRoute = ({children}) => {
    const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext);
    console.log('privavte route login', isLoggedIn)
  
    return isLoggedIn ? (
      children
    ):(
      <Navigate to='/login' />
    )
    

}

export default PrivateRoute