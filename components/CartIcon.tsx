
'use client';

import { useState, useEffect } from 'react';
import { getCartItemCount } from '../lib/cart';
import Link from 'next/link';

export default function CartIcon() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      setItemCount(getCartItemCount());
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  return (
    <Link href="/cart" className="relative cursor-pointer">
      <div className="w-8 h-8 flex items-center justify-center">
        <i className="ri-shopping-cart-line text-2xl"></i>
      </div>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
