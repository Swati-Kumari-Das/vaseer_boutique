// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from '@/utils/axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('/user/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartCount(res.data.cart.length);
    } catch (err) {
      console.error("Cart fetch failed", err);
    }
  };

  const addToCart = async (product) => {
  try {
    await axios.post('/user/cart', { productId: product._id });
    const res = await axios.get('/user/cart'); // 👈 refetch updated cart
    setCartCount(res.data.cart.length);       // 👈 update count
  } catch (err) {
    console.error('Failed to add to cart');
  }
};


  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCart,addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
