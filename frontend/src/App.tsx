
import { Outlet } from 'react-router-dom'
import './App.css'
import  Footer from './components/Footer/Footer'
import  Header from './components/Header/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './theme/themeProvider'
import { Toaster } from './components/ui/sonner'
import { AuthContextProvider } from './context/AuthContext'
const queryClient = new QueryClient()
function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark'>
        <AuthContextProvider>
          <Toaster position='top-right' />
          <Header />
          <Outlet />
          <Footer />
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
