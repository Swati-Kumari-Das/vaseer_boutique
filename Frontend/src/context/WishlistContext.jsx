// src/context/WishlistContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "@/utils/axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data.wishlist || []);
    } catch (err) {
      console.error("Error fetching wishlist", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Optional helper if you want to allow toggle from context
  const toggleWishlist = async (productId, isWishlisted) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (isWishlisted) {
        await axios.delete(`/wishlist/remove/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`/wishlist/add/${productId}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      await fetchWishlist();
    } catch (err) {
      console.error("Wishlist update failed", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        fetchWishlist,      // ✅ rename used inside ProductDetail
        toggleWishlist,     // ✅ optional but useful for reuse
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
