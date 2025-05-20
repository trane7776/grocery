import React from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { CartItem as CartItemType } from '@/types/cart';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateQuantity(item.product.id, newQuantity);
    toast.success(`количество ${item.product.title} обновлено до ${newQuantity}`);
  };
  
  const totalPrice = item.product.price * item.quantity;
  
  return (
    <div className="flex items-center py-5 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md relative">
        <Image 
          src={item.product.thumbnail} 
          alt={item.product.title} 
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100px, 100px"
        />
      </div>
      
      {/* Product Info */}
      <div className="ml-4 flex-1">
        <h3 className="text-base font-medium text-gray-900">
          {item.product.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
        
        <div className="flex items-end justify-between mt-2">
          <div>
            <p className="text-gray-500 text-sm">
              ${item.product.price.toFixed(2)} 
            </p>
            <div className="mt-1 flex items-center">
              <label htmlFor={`quantity-${item.product.id}`} className="sr-only">
                количество
              </label>
              <select
                id={`quantity-${item.product.id}`}
                name="quantity"
                value={item.quantity}
                onChange={handleQuantityChange}
                className="p-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeFromCart(item.product.id)}
                className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                удалить
              </button>
            </div>
          </div>
          <p className="text-base font-medium text-gray-900">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
