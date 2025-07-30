import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import React from 'react';
import FMCommerceLoader from '../../components/Loader';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    category: '',
    priceMin: 0,
    priceMax: 1000,
    search: '',
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('https://fakestoreapi.com/products').then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      }),
      fetch('https://fakestoreapi.com/products/categories').then(res => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        const prices = productsData.map((p: Product) => p.price);
        setFilters(f => ({
          ...f,
          priceMin: Math.floor(Math.min(...prices)),
          priceMax: Math.ceil(Math.max(...prices)),
        }));
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesPrice = product.price >= filters.priceMin && product.price <= filters.priceMax;
      const matchesSearch = product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase());
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [products, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    // Update active filters
    const active: string[] = [];
    if (newFilters.category) active.push(newFilters.category);
    setActiveFilters(active);
  };

  const removeFilter = (filterToRemove: string) => {
    const newFilters = { ...filters };
    if (newFilters.category === filterToRemove) newFilters.category = '';
    setFilters(newFilters);
    setActiveFilters(activeFilters.filter(f => f !== filterToRemove));
  };

  const clearAllFilters = () => {
    setFilters({
      category: '',
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      search: '',
    });
    setActiveFilters([]);
  };

  if (loading) return (
    <MainLayout>
      <div className="text-center py-8" role="status"><FMCommerceLoader/></div>
    </MainLayout>
  );
  if (error) return (
    <MainLayout>
      <div className="text-center text-red-500 py-8" role="status">{error}</div>
    </MainLayout>
  );

  const prices = products.map((p) => p.price);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));

  return (
    <MainLayout>
      <div className='bg-white dark:bg-[#1a1a1a] border rounded-xl border-[#e5e5e5] dark:border-[#313131] p-4 my-10'>
        <h1 className='text-lg font-bold text-[#121212] dark:text-[#F0F0F0] text-left'>Products</h1>
      </div>
      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header Controls */}
          <div className="flex items-center justify-between gap-6 mb-6">
            
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
              className="w-full p-3 border text-xs bg-white dark:bg-[#1a1a1a] border-[#e5e5e5] dark:border-[#313131] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1c1c1c]"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-[#1c1c1c] text-[#FF6F61]' : 'bg-white dark:bg-[#1c1c1c]'}`}
                aria-label="Grid view"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-[#1c1c1c] text-[#FF6F61]' : 'bg-white dark:bg-[#1c1c1c]'}`}
                aria-label="List view"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {activeFilters.map(filter => (
                <span key={filter} className="flex text-xs p-3 items-center gap-1 border border-[#1c1c1c]  text-[#121212] dark:text-[#F0F0F0] px-3 py-1 rounded-full ">
                  {filter}
                  <button
                    onClick={() => removeFilter(filter)}
                    className="ml-1 text-[#121212] dark:text-[#F0F0F0] size-4 rounded-full flex items-center justify-center bg-none"
                    aria-label={`Remove ${filter} filter`}
                  >
                    x
                  </button>
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-[#FF6F61] hover:opacity-80 text-xs"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">No products found.</div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>

        {/* Filters Sidebar */}
        <div className="hidden md:block w-80 bg-white dark:bg-[#1a1a1a] rounded-xl p-6 h-fit border border-[#e5e5e5] dark:border-[#313131]">
          <h2 className="font-semibold mb-6 text-left text-[#121212] dark:text-[#F0F0F0] text-sm">Filters</h2>
          
          {/* Categories */}
          <div className="mb-6">
            <div className="space-y-4">
              {categories.map(category => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={(e) => handleFilterChange({ ...filters, category: e.target.value })}
                    className="text-blue-600"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium mb-3 text-left text-[#121212] dark:text-[#F0F0F0] text-sm">Price</h3>
            <div className="space-y-2">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={filters.priceMax}
                onChange={(e) => handleFilterChange({ ...filters, priceMax: Number(e.target.value) })}
                className="w-full"
              />
              <div className="flex flex-col xs:flex-row sm:flex-row justify-between text-sm text-[#121212] dark:text-[#F0F0F0] gap-1 xs:gap-0 sm:gap-0">
                <span>${filters.priceMin}</span>
                <span className="text-right xs:text-left sm:text-left">${filters.priceMax}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Product Card Component
function ProductCard({ product, viewMode }: { product: Product; viewMode: 'grid' | 'list' }) {
  const [isLiked, setIsLiked] = useState(false);
 

  if (viewMode === 'list') {
    return (
      <Link to={`/products/${product.id}`}
        key={product.id}
        className="bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#242424] rounded-xl p-4 flex gap-4 transition-all duration-300 hover:scale-101 "
        tabIndex={0}
        aria-label={`View details for ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-32 h-32 object-cover rounded-lg"
          loading="lazy"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-base text-left">{product.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm text-left mt-4">{product.description.substr(0, 120 - 1) + "..."}</p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-base font-semibold text-[#121212] dark:text-[#F0F0F0]">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/products/${product.id}`}
      key={product.id}
      className="bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#242424] rounded-xl p-4 flex flex-col  transition-all duration-300 hover:scale-105 "
      tabIndex={0}
      aria-label={`View details for ${product.title}`}
    >
        
      <img
        src={product.image}
        alt={product.title}
        className="h-56 w-full rounded-lg object-cover mb-4"
        loading="lazy"
        width={200}
        height={200}
        srcSet={`
          ${product.image} 100w,
          ${product.image} 200w,
          ${product.image} 400w
        `}
        sizes="(min-width: 1024px) 200px, (min-width: 640px) 150px, 100vw"
      />
        
      <h3 className="font-semibold text-xs text-gray-600 uppercase mb-1 text-left">{product.category}</h3>
      <h4 className="font-semibold text-sm my-2 line-clamp-2  text-left">{product.title}</h4>
          
          
      <span className="text-sm font-bold text-[#121212] dark:text-[#F0F0F0] mt-auto  text-left">${product.price.toFixed(2)}</span>
    </Link>
  );
} 