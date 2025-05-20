'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export function Header() {
  const { cart } = useCartStore();
  
  return (
    <header className="bg-blue-600 text-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          товары недорого
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-200">
            главная
          </Link>
          <Link href="/books" className="hover:text-blue-200">
            каталог
          </Link>
          <Link href="/cart" className="relative hover:text-blue-200">
            корзина
            {cart.totalItems > 0 && (
              <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
