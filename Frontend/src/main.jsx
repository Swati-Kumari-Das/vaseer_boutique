import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from "@/context/CartContext";
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <WishlistProvider>
      {/* your routes and components */}
        <CartProvider>
       <App />
        </CartProvider>
        <Toaster position="top-right" reverseOrder={false} />
    </WishlistProvider>
   
  
  </BrowserRouter>
);
