// Example utility functions to test
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`
}

export const calculateTotal = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const filterProducts = (
  products: Array<{ title: string; category: string; price: number }>,
  searchTerm: string,
  category?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  return products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !category || product.category === category
    const matchesPrice = (!minPrice || product.price >= minPrice) && 
                        (!maxPrice || product.price <= maxPrice)
    
    return matchesSearch && matchesCategory && matchesPrice
  })
}

describe('Utility Functions', () => {
  describe('formatPrice', () => {
    it('formats price with 2 decimal places', () => {
      expect(formatPrice(10)).toBe('$10.00')
      expect(formatPrice(10.5)).toBe('$10.50')
      expect(formatPrice(10.99)).toBe('$10.99')
    })

    it('handles zero price', () => {
      expect(formatPrice(0)).toBe('$0.00')
    })

    it('handles negative price', () => {
      expect(formatPrice(-5.99)).toBe('$-5.99')
    })
  })

  describe('calculateTotal', () => {
    it('calculates total for multiple items', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
        { price: 20, quantity: 1 }
      ]
      
      expect(calculateTotal(items)).toBe(55) // (10*2) + (5*3) + (20*1) = 20 + 15 + 20 = 55
    })

    it('returns 0 for empty array', () => {
      expect(calculateTotal([])).toBe(0)
    })

    it('handles single item', () => {
      const items = [{ price: 15.99, quantity: 1 }]
      expect(calculateTotal(items)).toBe(15.99)
    })

    it('handles zero quantity', () => {
      const items = [
        { price: 10, quantity: 0 },
        { price: 5, quantity: 2 }
      ]
      expect(calculateTotal(items)).toBe(10) // (10*0) + (5*2) = 10
    })
  })

  describe('filterProducts', () => {
    const mockProducts = [
      { title: 'iPhone 13', category: 'electronics', price: 999 },
      { title: 'Samsung Galaxy', category: 'electronics', price: 799 },
      { title: 'Nike Shoes', category: 'clothing', price: 120 },
      { title: 'Adidas Shoes', category: 'clothing', price: 100 }
    ]

    it('filters by search term', () => {
      const result = filterProducts(mockProducts, 'iPhone')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('iPhone 13')
    })

    it('filters by category', () => {
      const result = filterProducts(mockProducts, '', 'clothing')
      expect(result).toHaveLength(2)
      expect(result.every(p => p.category === 'clothing')).toBe(true)
    })

    it('filters by price range', () => {
      const result = filterProducts(mockProducts, '', undefined, 800, 1000)
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('iPhone 13')
    })

    it('combines multiple filters', () => {
      const result = filterProducts(mockProducts, 'Shoes', 'clothing', 100, 150)
      expect(result).toHaveLength(2)
      expect(result.every(p => p.category === 'clothing')).toBe(true)
      expect(result.every(p => p.price >= 100 && p.price <= 150)).toBe(true)
    })

    it('returns all products when no filters applied', () => {
      const result = filterProducts(mockProducts, '')
      expect(result).toHaveLength(4)
    })

    it('returns empty array when no matches', () => {
      const result = filterProducts(mockProducts, 'NonExistentProduct')
      expect(result).toHaveLength(0)
    })
  })
}) 