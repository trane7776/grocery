import CheckoutForm from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">оформление заказа</h1>
      <CheckoutForm />
    </div>
  );
}
