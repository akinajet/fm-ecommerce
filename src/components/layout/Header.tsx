import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";
import { useCart } from "../../store/CartContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { state } = useCart();
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);;

  return (
    <header className="max-w-7xl mx-auto px-4 py-4 bg-white  w-full rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="!text-sm font-bold">FM Ecommerce</h1>
        <nav className="flex gap-6 items-center">
          <button
            className=" rounded bg-gray-200 dark:bg-gray-700"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
              {theme === 'dark' ? '🌞' : '🌙'}
          </button>
          <Link to="/cart" className="relative">
              <span className="text-sm">
                {/* Inline SVG for Shopping Cart Icon */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9v9m-4-9v9"
                  />
                </svg>
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 p-1 bg-[#FF6F61] text-white text-[11px] rounded-full size-4 flex items-center justify-center">
                  {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}