import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import LocationProvider from './contexts/LocationContext.jsx'
import { ChatProvider } from './contexts/ChatContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <LocationProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </LocationProvider>
    </AuthProvider>
  </BrowserRouter>,
)
