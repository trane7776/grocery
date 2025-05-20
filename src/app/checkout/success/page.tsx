'use client'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="text-center py-10">
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-green-100 p-6 text-green-600">
          <svg
            className="h-16 w-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">заказ оформлен!</h1>
      <p className="text-gray-600 mt-2">
        спасибо за покупку, ждем вас снова
      </p>
      {orderId && (
        <p className="text-gray-600 mt-4">
          ваш номер заказа: <span className="font-semibold">{orderId}</span>
        </p>
      )}
      <div className="mt-8 space-y-4">
        <Link 
          href="/"
          className="block w-full sm:w-auto sm:inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
        >
          продолжить покупки
        </Link>
      </div>
    </div>
  );
}
