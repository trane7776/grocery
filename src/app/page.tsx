'use client';
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useProducts } from '@/hooks/useProducts';

export default function Home() {
  const { data: productsData, isLoading } = useProducts(1, 4, '', 'rating-desc', '');

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">
        добро пожаловать в наш магазин амазон
      </h1>
      <div className="relative w-full max-w-2xl h-12 overflow-hidden mb-8">
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="marquee-track flex whitespace-nowrap" style={{ width: 'max-content' }}>
            <span className="marquee-text text-xl text-gray-600 text-center px-2">
              у нас товары на любой вкус и цвет. от книг до электроники, от одежды до аксессуаров. мы предлагаем широкий ассортимент товаров, которые удовлетворят любые ваши потребности. наш магазин предлагает только качественные товары от проверенных производителей. мы гарантируем, что вы получите только лучшие продукты, которые прослужат вам долго. мы также предлагаем быструю доставку и отличное обслуживание клиентов, чтобы вы могли наслаждаться покупками без лишних хлопот. не упустите возможность сделать свою жизнь проще и удобнее с нашими товарами. мы уверены, что вы найдете то, что искали. наш магазин - это идеальное место для покупок, где вы можете найти все, что вам нужно, и даже больше. мы рады предложить вам широкий выбор товаров, которые удовлетворят любые ваши потребности. не упустите возможность сделать свою жизнь проще и удобнее с нашими товарами. мы уверены, что вы найдете то, что искали. наш магазин - это идеальное место для покупок, где вы можете найти все, что вам нужно, и даже больше. мы рады предложить вам широкий выбор товаров, которые удовлетворят любые ваши потребности. не упустите возможность сделать свою жизнь проще и удобнее с нашими товарами. мы уверены, что вы найдете то, что искали. наш магазин - это идеальное место для покупок, где вы можете найти все, что вам нужно, и даже больше. мы рады предложить вам широкий выбор товаров, которые удовлетворят любые ваши потребности. не упустите возможность сделать свою жизнь проще и удобнее с нашими товарами. мы уверены, что вы найдете то, что искали.
            </span>
            <span className="marquee-text text-xl text-gray-600 text-center px-2">
              у нас товары на любой вкус и цвет. от книг до электроники, от одежды до аксессуаров. мы предлагаем широкий ассортимент товаров, которые удовлетворят любые ваши потребности. наш магазин предлагает только качественные товары от проверенных производителей. мы гарантируем, что вы получите только лучшие продукты, которые прослужат вам долго. мы также предлагаем быструю доставку и отличное обслуживание клиентов, чтобы вы могли наслаждаться покупками без лишних хлопот. не упустите возможность сделать свою жизнь проще и удобнее с нашими товарами. мы уверены, что вы найдете то, что искали. наш магазин - это идеальное место для покупок, где вы можете найти все, что вам нужно, и даже больше. мы рады предложить вам широкий выбор товаров, которые удовлетворят любые ваши потребности. не упустите возможность сделать свою жизнь проще и удобнее с нашими товарами. мы уверены, что вы найдете то, что искали. наш магазин - это идеальное место для покупок, где вы можете найти все, что вам нужно, и даже больше. мы рады предложить вам широкий выбор товаров, которые удовлетворят любые ваши потребности. не упустите возможность сделать свою жизнь проще и удобнее с нашими товарами. мы уверены, что вы найдете то, что искали. наш магазин - это идеальное место для покупок, где вы можете найти все, что вам нужно, и даже больше. мы рады предложить вам широкий выбор товаров, которые удовлетворят любые ваши потребности. не упустите возможность сделать свою жизнь проще и удобнее с нашими товарами. мы уверены, что вы найдете то, что искали.
            </span>
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl min-h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-8 flex flex-col items-center justify-center p-6">
        <div className="mb-4 text-3xl font-extrabold text-white drop-shadow-lg">товары в тренде</div>
        {isLoading ? (
          <div className="text-white text-lg">загрузка...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {productsData?.products.map((product) => (
              <Link
                key={product.id}
                href={`/books/${product.id}`}
                className="bg-white bg-opacity-80 rounded-xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500"
                tabIndex={0}
              >
                <div className="flex items-center justify-center mb-3">
                  <Image src={product.thumbnail} alt={product.title} width={128} height={128} className="h-32 w-32 object-contain rounded-lg border border-gray-200 shadow group-hover:shadow-xl transition-shadow" />
                </div>
                <div className="font-bold text-lg text-gray-900 text-center mb-1 truncate w-full" title={product.title}>{product.title}</div>
                <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</div>
                <div className="flex items-center gap-1 text-yellow-500 font-bold mb-1 text-base">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  {product.rating}
                </div>
                <div className="text-xl font-extrabold text-blue-700 mb-2">{product.price} $</div>
                <span className="mt-2 bg-blue-600 group-hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition-colors text-base">подробнее</span>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Link 
        href={"/books"}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold text-lg transition-colors"
      >
        перейти в каталог
      </Link>
      <style jsx>{`
        .marquee-track {
          animation: marquee-x 100s linear infinite;
        }
        @keyframes marquee-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
