import './assets/css/style.css'
import Main from './compnents/Main'
import { BrowserRouter, Route,Routes} from "react-router";
import Register from './auth/Register';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import Header from './compnents/Header';
import Footer from './compnents/Footer';
import VerifyEmailHandler from './auth/VerifyEmailHandler';
import AuthProvider from './context/AuthProvider';
import PasswordResetConfirm from './auth/PasswordResetConfirm';




function App() {
  

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path="/reset-password/:uidb64/:token" element={<PasswordResetConfirm/>} />
          <Route path="/verify-email" element={<VerifyEmailHandler />} />
          
        </Routes>
        <Footer/>
      </BrowserRouter>
     </AuthProvider>
  
    </>
  )
}

export default App
