import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axios';
import toast, { Toaster } from 'react-hot-toast';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  const token = localStorage.getItem('token');

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(res.data.wishlist);
      localStorage.setItem('wishlist', JSON.stringify(res.data.wishlist)); // persist
    } catch (err) {
      toast.error("Failed to load wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

 const handleRemove = async (productId) => {
  try {
    await axios.delete(`/wishlist/remove/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Removed from wishlist");

    const updated = wishlist.filter((item) => item._id !== productId);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  } catch {
    toast.error("Failed to remove");
  }
};


  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        `/user/cart/add`,
        {
          productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Added to cart");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="min-h-screen pt-24  max-w-full ">
      <Navbar/>
      <Toaster position="top-right" />
      <div className='mx-15'>
      <h1 className="text-3xl font-semibold mb-8">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition group cursor-pointer"
            >
              <img
                src={product.imageUrl || product.image}
                alt={product.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                onClick={() => navigate(`/product/${product._id}`)}
              />
              <div className="p-4 space-y-2">
                <h2
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="text-xl font-semibold text-gray-800 hover:text-yellow-600 transition"
                >
                  {product.title}
                </h2>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="text-yellow-600 font-bold">₹{product.price}</p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="flex items-center gap-1 text-sm text-white bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>

                  <button
                    onClick={() => handleRemove(product._id)}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default WishlistPage;
