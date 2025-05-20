import React from 'react';
import { SortOption } from '@/types/product';

interface CategoryObj {
  slug?: string;
  name?: string;
  url?: string;
}

interface FilterBarProps {
  categories: (string | CategoryObj)[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
}

const FilterBar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  searchQuery,
  setSearchQuery,
  isLoading,
}: FilterBarProps) => {
  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        {/* Search Bar */}
        <div className="w-full md:w-1/3">
          <div className="relative">
            <input
              type="text"
              placeholder="поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="w-full md:w-1/3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          >
            <option value="all">все категории</option>
            {categories.map((category) => {
              if (typeof category === 'string') {
                return (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                );
              } else {
                const value = category.slug || category.name || '';
                const label = category.name || category.slug || '';
                return (
                  <option key={value} value={value}>
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </option>
                );
              }
            })}
          </select>
        </div>
        
        {/* Sort Options */}
        <div className="w-full md:w-1/4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading}
          >
            <option value="price-asc">
                цена по возрастанию
            </option>
            <option value="price-desc">
                цена по убыванию
            </option>
            <option value="rating-desc">
                рейтинг по убыванию
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
