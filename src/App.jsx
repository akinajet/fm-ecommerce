import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { CartProvider } from './store/CartContext'
import { ThemeProvider } from './theme/ThemeContext'
import './App.css'
import FMCommerceLoader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const ProductDetails = lazy(() => import('./pages/products/ProductDetails'))
const Products = lazy(() => import('./pages/products/Products'))
const Cart = lazy(() => import('./pages/cart/Cart'))

function App() {

  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="text-center py-8" role="status"><FMCommerceLoader/></div>
}>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
