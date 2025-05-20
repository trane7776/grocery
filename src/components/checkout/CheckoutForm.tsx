'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';    
import { useCartStore } from '@/store/cartStore';
import { CheckoutFormData } from '@/types/cart';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type OrderPayload = {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  cart: unknown;
};

const useOrderMutation = () => {
  return useMutation({
    mutationFn: async (orderData: OrderPayload) => {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error('Order API error');
      return response.json();
    },
  });
};

const CheckoutForm = () => {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});
  const orderMutation = useOrderMutation();
  
  const validateForm = () => {
    const newErrors: Partial<CheckoutFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'имя обязательно';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'email обязателен';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'недопустимый email';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'адрес обязателен';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'город обязателен';
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'индекс обязателен';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'телефон обязателен';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof CheckoutFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    orderMutation.mutate(
      { ...formData, cart },
      {
        onSuccess: (orderResponse) => {
          clearCart();
          toast.success('заказ успешно оформлен');
          router.push('/checkout/success?orderId=' + orderResponse.orderId);
        },
        onError: (error) => {
          console.error('ошибка:', error);
          toast.error('ошибка оформления заказа');
        },
        
      }
    );
  };

  
  
  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">информация о заказе</h2>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            полное имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            адрес электронной почты
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            адрес
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.address ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                город
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.city ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
              индекс
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.postalCode ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            номер телефона
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-6 py-5">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>итого к оплате</p>
          <p>${cart.totalPrice.toFixed(2)}</p>
        </div>
        
        
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
              isSubmitting
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                загрузка...
              </>
            ) : (
              'оплатить'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
