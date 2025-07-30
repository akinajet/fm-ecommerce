import React from 'react';

export interface ProductFiltersProps {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  filters: {
    category: string;
    priceMin: number;
    priceMax: number;
    search: string;
  };
  onChange: (filters: ProductFiltersProps['filters']) => void;
}

export default function ProductFilters({ categories, minPrice, maxPrice, filters, onChange }: ProductFiltersProps) {
  return (
    <form className="flex flex-col md:flex-row gap-4 mb-6 items-end" onSubmit={e => e.preventDefault()}>
      {/* Category */}
      <label className="flex flex-col text-sm font-medium">
        Category
        <select
          className="mt-1 p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          value={filters.category}
          onChange={e => onChange({ ...filters, category: e.target.value })}
        >
          <option value="">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>
      {/* Price Range */}
      <label className="flex flex-col text-sm font-medium">
        Min Price
        <input
          type="number"
          className="mt-1 p-2 rounded border dark:bg-gray-700 dark:border-gray-600 w-24"
          min={minPrice}
          max={filters.priceMax}
          value={filters.priceMin}
          onChange={e => onChange({ ...filters, priceMin: Number(e.target.value) })}
        />
      </label>
      <label className="flex flex-col text-sm font-medium">
        Max Price
        <input
          type="number"
          className="mt-1 p-2 rounded border dark:bg-gray-700 dark:border-gray-600 w-24"
          min={filters.priceMin}
          max={maxPrice}
          value={filters.priceMax}
          onChange={e => onChange({ ...filters, priceMax: Number(e.target.value) })}
        />
      </label>
      {/* Search */}
      <label className="flex flex-col text-sm font-medium flex-1">
        Search
        <input
          type="text"
          className="mt-1 p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          placeholder="Search products..."
          value={filters.search}
          onChange={e => onChange({ ...filters, search: e.target.value })}
        />
      </label>
    </form>
  );
} 