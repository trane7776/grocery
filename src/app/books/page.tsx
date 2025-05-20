'use client';
import { useState, useEffect } from 'react';
import { useCategories, useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/product/ProductGrid';
import FilterBar from '@/components/product/FilterBar';
import { SortOption } from '@/types/product';

export default function BooksPage() {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError,
    error,
  } = useProducts(
    page,
    12,
    categoryFilter === 'all' ? '' : categoryFilter,
    sortOption,
    debouncedSearch
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);


  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    setPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
  };


  const handleNextPage = () => {
    if (productsData && page < Math.ceil(productsData.total / 12)) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">каталог продуктов</h1>
      </div>
      <FilterBar
        categories={categories}
        selectedCategory={categoryFilter}
        setSelectedCategory={handleCategoryChange}
        sortOption={sortOption}
        setSortOption={handleSortChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoading={isProductsLoading || isCategoriesLoading}
      />
      {isError ? (
        <div className="text-center py-10">
          <p className="text-red-500">
            ошибка загрузки: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      ) : (
        <>
          <ProductGrid products={productsData?.products || []} isLoading={isProductsLoading} />
          {/* Pagination */}
          {productsData && productsData.total > 0 && (
            <div className="flex justify-between items-center mt-8">
              <p className="text-sm text-gray-500">
                {((page - 1) * 12) + 1}-{Math.min(page * 12, productsData.total)} из {productsData.total} продуктов
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`px-4 py-2 border rounded-md ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  назад
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={!productsData || page >= Math.ceil(productsData.total / 12)}
                  className={`px-4 py-2 border rounded-md ${!productsData || page >= Math.ceil(productsData.total / 12) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  вперед
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
