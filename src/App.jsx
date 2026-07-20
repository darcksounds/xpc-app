import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Parts from './pages/Parts'
import Configurator from './pages/Configurator'
import About from './pages/About'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'

function AppContent() {
  const { theme } = useTheme()

  return (
    <div style={{
      background: theme.bg,
      minHeight:'100vh',
      display:'flex',
      flexDirection:'column',
    }}>
      <Navbar />
      <div style={{flex:1, display:'flex', flexDirection:'column', paddingTop:'72px'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/configurator" element={<Configurator />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App