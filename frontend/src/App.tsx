
import { Outlet } from 'react-router-dom'
import './App.css'
import  Footer from './components/Footer/Footer'
import  Header from './components/Header/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function App() {
  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>
      <Header />
    <Outlet />
    <Footer />
    </QueryClientProvider>
  )
}

export default App
