import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../../theme/ThemeContext'
import Header from './Header'

// Mock the useCart hook since it's not available in tests
const mockUseCart = jest.fn()
jest.mock('../../store/CartContext', () => ({
  useCart: () => mockUseCart(),
}))

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </ThemeProvider>
  )
}

describe('Header', () => {
  beforeEach(() => {
    mockUseCart.mockReturnValue({
      state: { items: [] },
      dispatch: jest.fn(),
    })
  })

  it('renders the header with title', () => {
    renderWithProviders(<Header />)
    
    expect(screen.getByText('FM Ecommerce')).toBeInTheDocument()
  })

  it('renders dark mode toggle button', () => {
    renderWithProviders(<Header />)
    
    const toggleButton = screen.getByRole('button', { 
      name: /switch to (light|dark) mode/i 
    })
    expect(toggleButton).toBeInTheDocument()
  })

  it('renders shopping cart link', () => {
    renderWithProviders(<Header />)
    
    const cartLink = screen.getByRole('link')
    expect(cartLink).toHaveAttribute('href', '/cart')
  })

  it('shows cart count badge when items exist', () => {
    // Mock cart with items
    mockUseCart.mockReturnValue({
      state: { items: [{ id: 1, title: 'Test Product', price: 10, quantity: 2 }] },
      dispatch: jest.fn(),
    })

    renderWithProviders(<Header />)
    
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('does not show cart count badge when no items', () => {
    mockUseCart.mockReturnValue({
      state: { items: [] },
      dispatch: jest.fn(),
    })

    renderWithProviders(<Header />)
    
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
}) 