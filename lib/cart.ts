
'use client';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  category: string;
}

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('restaurant-cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item: Omit<CartItem, 'quantity'>) => {
  const cart = getCart();
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  
  localStorage.setItem('restaurant-cart', JSON.stringify(cart));
  
  // Dispatch custom event for cart updates
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

export const removeFromCart = (id: string) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== id);
  localStorage.setItem('restaurant-cart', JSON.stringify(updatedCart));
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

export const updateQuantity = (id: string, quantity: number) => {
  const cart = getCart();
  const item = cart.find(cartItem => cartItem.id === id);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      item.quantity = quantity;
      localStorage.setItem('restaurant-cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  }
};

export const clearCart = () => {
  localStorage.removeItem('restaurant-cart');
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace('CHF ', ''));
    return total + (price * item.quantity);
  }, 0);
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};
