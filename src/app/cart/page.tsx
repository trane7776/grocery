import CartSummary from '@/components/cart/CartSummary';

export default function CartPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">корзина</h1>
      <CartSummary />
    </div>
  );
}
