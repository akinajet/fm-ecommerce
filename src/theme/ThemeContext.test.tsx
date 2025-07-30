import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeContext'

// Test component that uses the theme
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

describe('ThemeContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    jest.clearAllMocks()
    // Reset localStorage.getItem to return null by default
    localStorage.getItem = jest.fn().mockReturnValue(null)
  })

  it('provides default light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('loads theme from localStorage', () => {
    // Mock localStorage.getItem to return 'dark'
    localStorage.getItem = jest.fn().mockReturnValue('dark')
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('toggles theme when toggleTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const toggleButton = screen.getByText('Toggle Theme')
    
    // Initially light
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    
    // Click to toggle to dark
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
    
    // Click to toggle back to light
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('saves theme to localStorage when changed', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const toggleButton = screen.getByText('Toggle Theme')
    fireEvent.click(toggleButton)

    expect(localStorage.setItem).toHaveBeenCalledWith('fm_theme', 'dark')
  })

  it('adds dark class to document when theme is dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const toggleButton = screen.getByText('Toggle Theme')
    fireEvent.click(toggleButton)

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class from document when theme is light', () => {
    // Start with dark theme by mocking localStorage
    localStorage.getItem = jest.fn().mockReturnValue('dark')
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    const toggleButton = screen.getByText('Toggle Theme')
    fireEvent.click(toggleButton)

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
}) 