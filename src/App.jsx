import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const ProductDetails = lazy(() => import('./pages/products/ProductDetails'))
const Products = lazy(() => import('./pages/products/Products'))

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
