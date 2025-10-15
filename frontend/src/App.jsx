import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import PasswordResetPage from './pages/PasswordResetPage'
import PasswordRequestPage from './pages/PasswordRequestPage'
import ContactUsPage from './pages/ContactUsPage'
import NotFoundPage from './pages/NotFoundPage'
import Auth from './components/Auth'
import NAuth from './components/NAuth'
import { Toaster } from 'react-hot-toast'



const App = () => {
  return (
    <div className="bg-[url('../src/assets/bgImage.png')] bg-contain">
      <Toaster />
      <Routes>
        <Route path="/" element={<Auth><HomePage /></Auth>} />
        <Route path="/login" element={<NAuth><LoginPage /></NAuth>} />
        <Route path="/profile" element={<Auth><ProfilePage /></Auth>} />
        <Route path="/password-request" element={<NAuth><PasswordRequestPage /></NAuth>} />
        <Route path="/reset-password/:token" element={<NAuth><PasswordResetPage /></NAuth>} />
        <Route path="contact" element={<ContactUsPage />} /> 
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App