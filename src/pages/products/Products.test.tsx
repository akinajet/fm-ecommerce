import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../../theme/ThemeContext'
import { CartProvider } from '../../store/CartContext'
import Products from './Products'

// Mock fetch
global.fetch = jest.fn()

const mockProducts = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 10.99,
    description: 'Test description 1',
    category: 'electronics',
    image: 'test1.jpg'
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 20.99,
    description: 'Test description 2',
    category: 'clothing',
    image: 'test2.jpg'
  }
]

const mockCategories = ['electronics', 'clothing', 'books']

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  )
}

describe('Products', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state initially', () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    } as Response)
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCategories)
    } as Response)

    renderWithProviders(<Products />)
    
    // The component shows a loader image instead of text
    expect(screen.getByAltText('loader')).toBeInTheDocument()
  })

  it('renders products after loading', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    } as Response)
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCategories)
    } as Response)

    renderWithProviders(<Products />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
      expect(screen.getByText('Test Product 2')).toBeInTheDocument()
    })
  })

  it('renders error state when API fails', async () => {
    // Mock both fetch calls to fail
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    renderWithProviders(<Products />)
    
    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument()
    })
  })

  it('filters products by search term', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    } as Response)
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCategories)
    } as Response)

    renderWithProviders(<Products />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search products...')
    await act(async () => {
      await userEvent.type(searchInput, 'Product 1')
    })

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument()
    })
  })

  it('displays product prices correctly', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    } as Response)
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCategories)
    } as Response)

    renderWithProviders(<Products />)
    
    await waitFor(() => {
      expect(screen.getByText('$10.99')).toBeInTheDocument()
      expect(screen.getByText('$20.99')).toBeInTheDocument()
    })
  })

  it('renders product categories', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    } as Response)
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockCategories)
    } as Response)

    renderWithProviders(<Products />)
    
    await waitFor(() => {
      // Use getAllByText since there are multiple elements with "electronics"
      expect(screen.getAllByText('electronics')).toHaveLength(2)
      expect(screen.getAllByText('clothing')).toHaveLength(2)
    })
  })
}) 