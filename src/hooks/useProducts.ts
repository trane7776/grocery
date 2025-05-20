import { useQuery } from '@tanstack/react-query';
import { Product, ProductsResponse, SortOption } from '@/types/product';

const API_URL = 'https://dummyjson.com';

export const fetchProducts = async ({
  limit = 10,
  skip = 0,
  category = '',
  sort = 'price-asc',
  search = '',
}: {
  limit?: number;
  skip?: number;
  category?: string;
  sort?: SortOption;
  search?: string;
}) => {
  let url = `${API_URL}/products`;
  let sortBy = '';
  let order = '';

  if (sort === 'price-asc') {
    sortBy = 'price';
    order = 'asc';
  } else if (sort === 'price-desc') {
    sortBy = 'price';
    order = 'desc';
  } else if (sort === 'rating-desc') {
    sortBy = 'rating';
    order = 'desc';
  } else if (sort === 'rating-asc') {
    sortBy = 'rating';
    order = 'asc';
  } else if (sort === 'title-asc') {
    sortBy = 'title';
    order = 'asc';
  } else if (sort === 'title-desc') {
    sortBy = 'title';
    order = 'desc';
  }

  if (search) {
    url = `${API_URL}/products/search?q=${encodeURIComponent(search)}`;
  }
  if (category && category !== 'all') {
    url = `${API_URL}/products/category/${encodeURIComponent(category)}`;
  }

  const params = new URLSearchParams();
  params.append('limit', String(limit));
  params.append('skip', String(skip));
  if (sortBy) params.append('sortBy', sortBy);
  if (order) params.append('order', order);

  url += (url.includes('?') ? '&' : '?') + params.toString();

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data: ProductsResponse = await response.json();
  return data;
};

export const fetchProductById = async (id: string) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  
  const data: Product = await response.json();
  return data;
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/products/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  const data: string[] = await response.json();
  return data;
};

export const useProducts = (
  page: number = 1,
  limit: number = 10,
  category: string = '',
  sort: SortOption = 'price-asc',
  search: string = ''
) => {
  const skip = (page - 1) * limit;
  
  return useQuery({
    queryKey: ['products', { page, limit, category, sort, search }],
    queryFn: () => fetchProducts({ limit, skip, category, sort, search }),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
