// import React, { useState } from 'react';
// import { Heart } from 'lucide-react';
// import axios from 'axios';

// const ProductCard = ({ product }) => {
//   const [wishlisted, setWishlisted] = useState(false);

//   const toggleWishlist = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) return alert("Login required to use wishlist!");

//       const config = {
//         headers: { Authorization: `Bearer ${token}` }
//       };

//       if (wishlisted) {
//         await axios.delete(`/api/wishlist/remove/${product._id}`, config);
//       } else {
//         await axios.post(`/api/wishlist/add/${product._id}`, {}, config);
//       }

//       setWishlisted(!wishlisted);
//     } catch (err) {
//       console.error("Wishlist error:", err);
//     }
//   };

//   return (
//     <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-white">
//       <div className="relative">
//         <img
//           src={product.imageUrl}
//           alt={product.title}
//           className="w-full h-[420px] object-cover"
//         />
//         <button
//           onClick={toggleWishlist}
//           className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
//         >
//           <Heart
//             className={`w-5 h-5 transition-colors duration-200 ${
//               wishlisted ? 'text-red-500 fill-red-500' : 'text-gray-500'
//             }`}
//           />
//         </button>
//       </div>
//       <div className="p-4">
//         <h4 className="text-lg font-semibold text-[#6D2932]">{product.title}</h4>
//         <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
//         <p className="mt-1 font-bold text-[#6D2932]">₹ {product.price}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const checkIfWishlisted = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const res = await axios.get('/api/wishlist', config);
        const wishlist = res.data.wishlist || [];
        const isWishlisted = wishlist.some(item => item._id === product._id);
        setWishlisted(isWishlisted);
      } catch (err) {
        console.error('Error loading wishlist:', err);
      }
    };

    checkIfWishlisted();
  }, [product._id]);

  const toggleWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return alert("Login required to use wishlist!");

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (wishlisted) {
        await axios.delete(`/api/wishlist/remove/${product._id}`, config);
        toast.success('Removed from wishlist');
      } else {
        await axios.post(`/api/wishlist/add/${product._id}`, {}, config);
        toast.success('Added to wishlist!');
      }

      setWishlisted(!wishlisted);
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-white">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-[420px] object-cover"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 ${
              wishlisted ? 'text-red-500 fill-red-500' : 'text-gray-500'
            }`}
          />
        </button>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-[#6D2932]">{product.title}</h4>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <p className="mt-1 font-bold text-[#6D2932]">₹ {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
