'use client';
import React from 'react';
import Link from 'next/link';
import CartItem from './CartItem';
import { useCartStore } from '@/store/cartStore';

const CartSummary = () => {
  const { cart, clearCart } = useCartStore();
  
  if (cart.items.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800">корзина пуста</h2>
        <p className="text-gray-500 mt-2">наполните ее</p>
        <Link 
          href="/"
          className="mt-4 inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          товары
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">корзина ({cart.totalItems} товаров)</h2>
      </div>
      
      <div className="px-4 sm:px-6 py-4">
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {cart.items.map((item) => (
              <li key={item.product.id} className="py-6">
                <CartItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>итог</p>
          <p>${cart.totalPrice.toFixed(2)}</p>
        </div>
        
        <div className="mt-6 space-y-3">
          <Link
            href="/checkout"
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            оформление заказа
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            очистить корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
