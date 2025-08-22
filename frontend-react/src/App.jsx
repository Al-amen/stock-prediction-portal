import './assets/css/style.css'
import Main from './compnents/Main'
import { BrowserRouter, Route,Routes} from "react-router";

import Login from './compnents/auth/Login';
import Register from './compnents/auth/Register';
import VerifyEmailHandler from './compnents/auth/VerifyEmailHandler';
import ForgotPassword from './compnents/auth/ForgotPassword';
import PasswordResetConfirm from './compnents/auth/PasswordResetConfirm';

import Header from './compnents/Header';
import Footer from './compnents/Footer';
import AuthProvider from './context/AuthProvider';
import Dashboard from './compnents/dashboard/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';



function App() {
  
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Main />} />
          
          <Route path='/register' element={<PublicRoute> <Register/> </PublicRoute>} />
          <Route path='/login' element={<PublicRoute>< Login /></PublicRoute>} />
          <Route path='/forgot-password' element={<PublicRoute>< ForgotPassword /></PublicRoute>} />
          <Route path="/reset-password/:uidb64/:token" element={<PublicRoute><PasswordResetConfirm/></PublicRoute>} />
          <Route path="/verify-email" element={<PublicRoute> <VerifyEmailHandler/>  </PublicRoute>} />

          <Route path='/dashboard' element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
          
          
        </Routes>
        <Footer/>
      </BrowserRouter>
     </AuthProvider>
  
    </>
  )
}

export default App
