import React from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../utils/auth'
import { AuthContext } from '../context/AuthProvider'
import { useContext } from 'react'

const Header = () => {
    const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLoggedIn(false);
        navigate('/login');

    }
    

  return (
    <>
        <nav className='navbar container pt-3 pb-3 align-items-start'>
            <Link to='/' className='navbar-brand text-light'>Stock Prediction Portal</Link>
            {/* < className='navbar-brand text-light' href="">Stock Prediction Portal</> */}

            <div>
                {isLoggedIn ? (
                    <>
                    <Link to='/dashboard' className='btn btn-info'>Dashboard</Link>
                    &nbsp;
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>

                    </>
                ) : (
                    <>
                    <Button path="/login" text="Login" class="btn-outline-info" />
                    &nbsp;
                    <Button path="/register" text="Register" class="btn-info" />
                    </>
                )}
            </div>
        </nav>
    </>
  )
}

export default Header