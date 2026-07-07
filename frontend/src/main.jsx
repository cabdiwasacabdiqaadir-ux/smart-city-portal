import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from 'sonner'
import { AuthProvider } from './components/AuthProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
       <Toaster />
       <AuthProvider>
    <App />
    </AuthProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
