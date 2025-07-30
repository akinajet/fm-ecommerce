import { useCart } from '../../store/CartContext';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import MainLayout from '../../layouts/MainLayout';
import React from 'react';

export default function Cart() {
  const { state, dispatch } = useCart();
  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const continueRef = useRef<HTMLAnchorElement>(null);

  const handleQuantity = (id: number, quantity: number) => {
    if (quantity > 0) dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  const handleRemove = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR_CART' });
    setTimeout(() => {
      continueRef.current?.focus();
    }, 100);
  };

  if (state.items.length === 0) {
    return (
      <MainLayout>
        <div className="text-center py-12" role="status">
          <p>Your cart is empty.</p>
          <Link to="/" className="hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500" ref={continueRef}>Continue shopping</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-6">
        <ul className="divide-y divide-[#e5e5e5] dark:divide-[#313131] mb-4">
          {state.items.map(item => (
            <li key={item.id} className="flex items-center gap-4 py-4">
              <img src={item.image} alt={item.title} className="h-16 w-16 object-contain"
               srcSet={`
                 ${item.image} 64w,
                 ${item.image} 128w,
                 ${item.image} 256w
               `}
               sizes="64px"
              />
              <div className="flex-1">
                <div className="font-semibold text-sm text-left">{item.title}</div>
                <div className="mt-2 font-semibold text-sm text-left">${item.price.toFixed(2)}</div>
              </div>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={e => handleQuantity(item.id, Number(e.target.value))}
                className="w-16 p-1 rounded border border-[#e5e5e5] dark:border-[#313131] text-center"
                aria-label={`Quantity for ${item.title}`}
              />
              <button
                className="ml-2 text-red-500 hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500 text-xs"
                onClick={() => handleRemove(item.id)}
                aria-label={`Remove ${item.title} from cart`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">${total.toFixed(2)}</span>
        </div>
        <button
          className="bg-[#1a1a1a] text-white font-semibold py-2 px-4 rounded w-full mb-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500"
          onClick={handleClear}
          aria-label="Clear cart"
        >
          check out
        </button>
        <Link to="/products" className="over:underline text-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500" ref={continueRef}>&larr; Continue shopping</Link>
      </div>
    </MainLayout>
  );
} 