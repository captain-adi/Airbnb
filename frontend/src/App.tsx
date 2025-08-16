
import { Outlet } from 'react-router-dom'
import './App.css'
import  Footer from './components/Footer/Footer'
import  Header from './components/Header/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './theme/themeProvider'
function App() {
  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark'>
        <Header />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
