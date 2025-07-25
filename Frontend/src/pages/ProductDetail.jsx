


// src/pages/ProductDetail.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState('');

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`/api/products/${id}`);
//       setProduct(res.data.product);
//     } catch (error) {
//       console.error('Error fetching product:', error);
//     }
//   };

//   const handleAddToWishlist = async () => {
//     try {
//       await axios.post(`/api/user/wishlist/add/${id}`);
//       alert('Added to wishlist!');
//     } catch (error) {
//       alert('Login required to add to wishlist');
//     }
//   };

//   const handleAddToCart = async () => {
//     try {
//       await axios.post(`/api/user/cart/add`, {
//         productId: id,
//         size: selectedSize || null,
//         quantity: 1,
//       });
//       alert('Added to cart!');
//     } catch (error) {
//       alert('Login required to add to cart');
//     }
//   };

//   const handleCustomize = () => {
//     navigate(`/customize/${id}`);
//   };

//   if (!product) return <div className="p-8">Loading...</div>;

//   return (
//     <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto bg-white">
//       {/* Go Back */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-[#6D2932] hover:underline mb-6"
//       >
//         <ArrowLeft size={18} />
//         <span>Back</span>
//       </button>

//       <div className="flex flex-col md:flex-row gap-10 bg-[#F9F4F1] p-6 rounded-xl shadow">
//         {/* Image Section */}
//         <div className="flex-1">
//           <img
//             src={product.imageUrl}
//             alt={product.title}
//             className="w-full h-[500px] object-cover rounded-xl shadow-lg"
//           />
//         </div>

//         {/* Product Info */}
//         <div className="flex-1">
//           <h1 className="text-4xl font-semibold text-[#6D2932] mb-2">{product.title}</h1>
//           <p className="text-sm text-gray-500 mb-1">{product.category}</p>
//           <p className="text-xl text-[#6D2932] font-bold mb-4">₹{product.price}</p>
//           {product.averageRating && (
//             <p className="text-sm text-yellow-600 mb-2">⭐ {product.averageRating.toFixed(1)} / 5</p>
//           )}

//           <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

//           {/* Size Selector */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-2">Select Size</label>
//             <select
//               value={selectedSize}
//               onChange={(e) => setSelectedSize(e.target.value)}
//               className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
//             >
//               <option value="">Select</option>
//               <option value="S">Small</option>
//               <option value="M">Medium</option>
//               <option value="L">Large</option>
//             </select>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-wrap gap-4">
//             <button
//               onClick={handleAddToWishlist}
//               className="flex items-center gap-2 px-4 py-2 border border-[#6D2932] text-[#6D2932] rounded-md hover:bg-[#6D2932] hover:text-white transition"
//             >
//               <Heart size={16} />
//               Wishlist
//             </button>

//             <button
//               onClick={handleAddToCart}
//               className="flex items-center gap-2 px-4 py-2 bg-[#6D2932] text-white rounded-md hover:bg-[#582224] transition"
//             >
//               <ShoppingCart size={16} />
//               Add to Cart
//             </button>

//             {product.customizable && (
//               <button
//                 onClick={handleCustomize}
//                 className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded hover:bg-yellow-50 transition"
//               >
//                 Customize
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;




// src/pages/ProductDetail.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
// import Footer from '@/components/Footer';
// import Navbar from '@/components/Navbar';
// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [showCustomization, setShowCustomization] = useState(false);
//   const [reviews, setReviews] = useState([]);
//   const [canReview, setCanReview] = useState(false);
//   const [newReview, setNewReview] = useState({ comment: '', rating: 5 });

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`/api/products/${id}`);
//       setProduct(res.data.product);
//     } catch (err) {
//       toast.error("Failed to load product");
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(`/api/products/${id}/reviews`);
//       setReviews(res.data.reviews);
//     } catch {
//       setReviews([]);
//     }
//   };

//   const checkIfUserCanReview = async () => {
//     try {
//       const res = await axios.get(`/api/user/orders/check-review-eligibility/${id}`, {
//         withCredentials: true,
//       });
//       setCanReview(res.data.eligible);
//     } catch {
//       setCanReview(false);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//     fetchReviews();
//     checkIfUserCanReview();
//   }, [id]);

//  const handleAddToWishlist = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) return toast.error("Login required to add to wishlist");

//     await axios.post(
//       `/api/user/wishlist/add/${id}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     toast.success("Added to wishlist");
//   } catch {
//     toast.error("Failed to add to wishlist");
//   }
// };


//  const handleAddToCart = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) return toast.error("Login required to add to cart");

//     await axios.post(
//       `/api/user/cart/add`,
//       {
//         productId: id,
//         size: selectedSize || null,
//         quantity: 1,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     toast.success("Added to cart");
//   } catch {
//     toast.error("Failed to add to cart");
//   }
// };


//   const handleSubmitReview = async () => {
//     try {
//       await axios.post(`/api/products/${id}/reviews`, newReview, {
//         withCredentials: true,
//       });
//       toast.success("Review submitted!");
//       setNewReview({ comment: '', rating: 5 });
//       fetchReviews();
//     } catch {
//       toast.error("Failed to submit review");
//     }
//   };

//   if (!product) return <div className="p-8">Loading...</div>;

//   return (
//     <div className="min-h-screen pt-20 max-w-7xl ">
//     <Navbar />
//       <Toaster position="top-right" />
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-600 mb-6"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Go Back
//       </button>

//       <div className="flex flex-col md:flex-row gap-10">
//         {/* Image */}
//         <div className="flex-1">
//           <img
//             src={product.imageUrl}
//             alt={product.title}
//             className="w-full h-[500px] object-cover rounded-xl shadow"
//           />
//         </div>

//         {/* Details */}
//         <div className="flex-1 space-y-4">
//           <h1 className="text-3xl font-bold">{product.title}</h1>
//           <p className="text-gray-600">{product.category}</p>
//           <p className="text-yellow-600 font-semibold text-xl">₹{product.price}</p>
//           <p>{product.description}</p>
//           <p className="text-sm text-gray-700">
//             ⭐ {product.averageRating ? product.averageRating.toFixed(1) : "No rating yet"}
//           </p>

//           <select
//             value={selectedSize}
//             onChange={(e) => setSelectedSize(e.target.value)}
//             className="px-3 py-2 border rounded-md"
//           >
//             <option value="">Select Size</option>
//             <option value="XS">XS</option>
//             <option value="S">S</option>
//             <option value="M">M</option>
//             <option value="L">L</option>
//             <option value="XL">XL</option>
//             <option value="XXL">XXL</option>
//           </select>

//           <div className="flex flex-wrap gap-3 mt-4">
//             <button
//               onClick={handleAddToWishlist}
//               className="flex items-center gap-2 px-4 py-2 border rounded text-gray-700 hover:text-yellow-600"
//             >
//               <Heart className="w-4 h-4" />
//               Add to Wishlist
//             </button>

//             <button
//               onClick={handleAddToCart}
//               className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
//             >
//               <ShoppingCart className="w-4 h-4" />
//               Add to Cart
//             </button>

//             {product.customizable && (
//               <button
//                 onClick={() => setShowCustomization(true)}
//                 className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded hover:bg-yellow-50"
//               >
//                 Customize
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

//         {reviews.length === 0 ? (
//           <p className="text-gray-500">No reviews yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {reviews.map((rev) => (
//               <div key={rev._id} className="p-4 border rounded-md">
//                 <p className="text-sm font-semibold">{rev.userId.name}</p>
//                 <p className="text-yellow-600 text-sm">⭐ {rev.rating}</p>
//                 <p className="text-gray-700">{rev.comment}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {canReview && (
//           <div className="mt-6 space-y-2">
//             <h3 className="font-medium">Add Your Review</h3>
//             <textarea
//               value={newReview.comment}
//               onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//               className="w-full border px-3 py-2 rounded-md"
//               placeholder="Your review"
//             />
//             <select
//               value={newReview.rating}
//               onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
//               className="px-2 py-1 border rounded"
//             >
//               {[1, 2, 3, 4, 5].map((r) => (
//                 <option key={r} value={r}>
//                   {r} Star
//                 </option>
//               ))}
//             </select>
//             <button
//               onClick={handleSubmitReview}
//               className="block mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
//             >
//               Submit Review
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Customize Modal */}
//       {showCustomization && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-md p-6 w-full max-w-md space-y-4 relative">
//             <h2 className="text-lg font-semibold">Customization Form</h2>
//             <input type="text" placeholder="Size" className="w-full border px-3 py-2 rounded" />
//             <input type="text" placeholder="Color" className="w-full border px-3 py-2 rounded" />
//             <textarea placeholder="Design notes" className="w-full border px-3 py-2 rounded" />
//             <button
//               onClick={() => {
//                 toast.success("Customization submitted!");
//                 setShowCustomization(false);
//               }}
//               className="bg-yellow-600 w-full py-2 text-white rounded hover:bg-yellow-700"
//             >
//               Submit
//             </button>
//             <button
//               onClick={() => setShowCustomization(false)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//       <Footer/>
//     </div>
//   );
// };

// export default ProductDetail;




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '@/utils/axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
// import Footer from '@/components/Footer';
// import Navbar from '@/components/Navbar';


// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [showCustomization, setShowCustomization] = useState(false);
//   const [reviews, setReviews] = useState([]);
//   const [canReview, setCanReview] = useState(false);
//   const [newReview, setNewReview] = useState({ comment: '', rating: 5 });
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     fetchProduct();
//     fetchReviews();
//     checkIfUserCanReview();
//     checkWishlistStatus();
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`/products/${id}`);
//       setProduct(res.data.product || res.data); // adjust depending on your backend
//     } catch (err) {
//       toast.error("Failed to load product");
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(`/reviews/product/${id}?page=${page}&limit=5`);
//       setReviews(res.data.reviews);
//     } catch {
//       setReviews([]);
//     }
//   };

//   const checkIfUserCanReview = async () => {
//     try {
//       const res = await axios.get(`/reviews/can-review/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setCanReview(res.data.canReview);
//     } catch {
//       setCanReview(false);
//     }
//   };

//  const checkWishlistStatus = async () => {
//   if (!token) return;
//   try {
//     const res = await axios.get(`/wishlist`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const wishlist = res.data.wishlist || [];
//     const wishIds = wishlist.map((item) => item._id);
//     setIsWishlisted(wishIds.includes(id));
//   } catch (err) {
//     console.error("Wishlist fetch error", err);
//   }
// };


//  const toggleWishlist = async () => {
//   if (!token) return toast.error("Login required to manage wishlist");

//   try {
//     if (isWishlisted) {
//       await axios.delete(`/wishlist/remove/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Removed from wishlist");
//       setIsWishlisted(false);
//     } else {
//       // ✅ Send the actual product data to the backend
//       await axios.post(`/wishlist/add/${id}`, {
//         title: product.title,
//         image: product.image || product.imageUrl,
//         price: product.price,
//         category: product.category,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast.success("Added to wishlist");
//       setIsWishlisted(true);
//     }
//   } catch (err) {
//     console.error("Wishlist update failed:", err);
//     toast.error("Wishlist update failed");
//   }
// };


//   const handleAddToCart = async () => {
//     if (!token) return toast.error("Login required to add to cart");

//     try {
//       await axios.post(
//         `/user/cart/add`,
//         {
//           productId: id,
//           size: selectedSize || null,
//           quantity: 1,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Added to cart");
//     } catch {
//       toast.error("Failed to add to cart");
//     }
//   };

//   const handleSubmitReview = async () => {
//     try {
//       await axios.post(`/reviews/product/${id}`, newReview, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success("Review submitted!");
//       setNewReview({ comment: '', rating: 5 });
//       fetchReviews();
//     } catch {
//       toast.error("Failed to submit review");
//     }
//   };

//   if (!product) return <div className="p-8">Loading...</div>;

//   return (
//     <div className="min-h-screen pt-20 max-w-full ">
//       <Navbar />
//       <Toaster position="top-right" />
      

//        <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-600 mb-6"
//       >
//         <ArrowLeft className="w-4 h-4" />
//         Go Back
//       </button>
     

     
//     <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 px-4 md:px-16 lg:px-32">
//   {/* Image */}
  
//   <div className="w-full md:w-[400px] flex justify-center">
//     <div className="overflow-hidden rounded-xl shadow-lg group w-full h-[500px] max-w-[400px]">
//       <img
//         src={product.imageUrl || product.image}
//         alt={product.title}
//         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//       />
//     </div>
//   </div>

//   {/* Details */}
//   <div className="flex-1 space-y-4 mt-6 md:mt-0">
//     <h1 className="text-2xl md:text-3xl font-bold">{product.title || product.name}</h1>
//     <p className="text-gray-600">{product.category}</p>
//     <p className="text-yellow-600 font-semibold text-xl">₹{product.price}</p>
//     <p>{product.description}</p>
//     <p className="text-sm text-gray-700">
//       ⭐ {product.averageRating ? product.averageRating.toFixed(1) : "No rating yet"}
//     </p>

//     {/* Size selection */}
//     <select
//       value={selectedSize}
//       onChange={(e) => setSelectedSize(e.target.value)}
//       className="px-3 py-2 border rounded-md"
//     >
//       <option value="">Select Size</option>
//       <option value="XS">XS</option>
//       <option value="S">S</option>
//       <option value="M">M</option>
//       <option value="L">L</option>
//       <option value="XL">XL</option>
//       <option value="XXL">XXL</option>
//     </select>

//     {/* Action Buttons */}
//     <div className="flex flex-wrap gap-3 mt-4">
//       <button
//         onClick={toggleWishlist}
//         className={`flex items-center gap-2 px-4 py-2 border rounded ${
//           isWishlisted
//             ? "text-red-600 border-red-600 hover:bg-red-50"
//             : "text-pink-600 border-pink-600 hover:bg-pink-50"
//         }`}
//       >
//         <Heart className="w-4 h-4" />
//         {isWishlisted ? "Remove from Wishlist 💔" : "Add to Wishlist ❤️"}
//       </button>

//       <button
//         onClick={handleAddToCart}
//         className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
//       >
//         <ShoppingCart className="w-4 h-4" />
//         Add to Cart
//       </button>

//       {product.customizable && (
//         <button
//           onClick={() => setShowCustomization(true)}
//           className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded hover:bg-yellow-50"
//         >
//           Customize
//         </button>
//       )}
//     </div>
//   </div>
// </div>



//       {/* Reviews Section */}
//        <div className="mt-12 px-4 sm:px-6 lg:px-8">
//   {/* Show reviews only if available */}
//   {reviews.length > 0 && (
//     <>
//       <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//       <div className="space-y-4">
//         {reviews.map((rev) => (
//           <div
//             key={rev._id}
//             className="p-4 border rounded-md shadow-sm bg-white"
//           >
//             <div className="flex flex-col sm:flex-row sm:justify-between">
//               <p className="text-sm font-semibold text-gray-800">
//                 {rev.userId?.name || "User"}
//               </p>
//               <p className="text-yellow-600 text-sm">⭐ {rev.rating}</p>
//             </div>
//             <p className="mt-2 text-gray-700 text-sm sm:text-base">
//               {rev.comment}
//             </p>
//           </div>
//         ))}
//       </div>
//     </>
//   )}

//   {/* Review Form: always show if eligible */}
//   {canReview && (
//     <div className="mt-6 space-y-2">
//       <h3 className="font-medium text-lg">Add Your Review</h3>
//       <textarea
//         value={newReview.comment}
//         onChange={(e) =>
//           setNewReview({ ...newReview, comment: e.target.value })
//         }
//         className="w-full border px-3 py-2 rounded-md text-sm"
//         placeholder="Your review"
//         rows={3}
//       />
//       <select
//         value={newReview.rating}
//         onChange={(e) =>
//           setNewReview({ ...newReview, rating: e.target.value })
//         }
//         className="px-3 py-2 border rounded text-sm"
//       >
//         {[1, 2, 3, 4, 5].map((r) => (
//           <option key={r} value={r}>
//             {r} Star{r > 1 && "s"}
//           </option>
//         ))}
//       </select>
//       <button
//         onClick={handleSubmitReview}
//         className="block mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
//       >
//         Submit Review
//       </button>
//     </div>
//   )}
// </div>



//       {/* Customize Modal */}
//       {showCustomization && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-md p-6 w-full max-w-md space-y-4 relative">
//             <h2 className="text-lg font-semibold">Customization Form</h2>
//             <input type="text" placeholder="Size" className="w-full border px-3 py-2 rounded" />
//             <input type="text" placeholder="Color" className="w-full border px-3 py-2 rounded" />
//             <textarea placeholder="Design notes" className="w-full border px-3 py-2 rounded" />
//             <button
//               onClick={() => {
//                 toast.success("Customization submitted!");
//                 setShowCustomization(false);
//               }}
//               className="bg-yellow-600 w-full py-2 text-white rounded hover:bg-yellow-700"
//             >
//               Submit
//             </button>
//             <button
//               onClick={() => setShowCustomization(false)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
   
//   );
// };

// export default ProductDetail;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '@/utils/axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
// import Footer from '@/components/Footer';
// import Navbar from '@/components/Navbar';
// import { useWishlist } from '@/context/WishlistContext';
// import { useCart } from '@/context/CartContext';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [showCustomization, setShowCustomization] = useState(false);
//   const [reviews, setReviews] = useState([]);
//   const [canReview, setCanReview] = useState(false);
//   const [newReview, setNewReview] = useState({ comment: '', rating: 5 });
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [page] = useState(1); // Set pagination page

//   const token = localStorage.getItem('token');
  
//   const { fetchWishlist } = useWishlist();
//    const { fetchCart } = useCart();

//   useEffect(() => {
//     fetchProduct();
//     fetchReviews();
//     checkIfUserCanReview();
//     checkWishlistStatus();
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`/products/${id}`);
//       setProduct(res.data.product || res.data);
//     } catch {
//       toast.error("Failed to load product");
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(`/reviews/product/${id}?page=${page}&limit=5`);
//       setReviews(res.data.reviews || []);
//     } catch {
//       setReviews([]);
//     }
//   };

//   const checkIfUserCanReview = async () => {
//     try {
//       const res = await axios.get(`/reviews/can-review/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCanReview(res.data.canReview);
//     } catch {
//       setCanReview(false);
//     }
//   };

//   const checkWishlistStatus = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`/wishlist`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const wishlist = res.data.wishlist || [];
//       const wishIds = wishlist.map((item) => item._id);
//       setIsWishlisted(wishIds.includes(id));
//     } catch (err) {
//       console.error("Wishlist fetch error", err);
//     }
//   };

// const toggleWishlist = async () => {
//   const token = localStorage.getItem('token') || localStorage.getItem('adminToken');

//   if (!token) {
//     toast.error("Login required to manage wishlist");
//     setTimeout(() => navigate('/auth?type=login'), 1500);
//     return;
//   }

//   try {
//     if (isWishlisted) {
//       await axios.delete(`/wishlist/remove/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Removed from wishlist");
//       setIsWishlisted(false);
//     } else {
//       await axios.post(`/wishlist/add/${id}`, {
//         title: product.title,
//         image: product.image || product.imageUrl,
//         price: product.price,
//         category: product.category,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Added to wishlist");
//       setIsWishlisted(true);
//     }

//     fetchWishlist(); // 💥 trigger global update
//   } catch (err) {
//     console.error("Wishlist update failed:", err);
//     toast.error("Wishlist update failed");
//   }
// };



//  const handleAddToCart = async () => {
//   if (!token) {
//     toast.error("Login required to add to cart");
//     return navigate("/auth?type=login");
//   }

//   if (!selectedSize) {
//     toast.error("Please select a size");
//     return;
//   }

//   try {
//     await axios.post(`/user/cart/add`, {
//       productId: id,
//       quantity: 1,
//       size: selectedSize,
//     }, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     toast.success("Added to cart");
//     fetchCart(); // 💥 trigger global update
//   } catch (err) {
//     toast.error("Failed to add to cart");
//   }
// };



//   const handleSubmitReview = async () => {
//     try {
//       await axios.post(`/reviews/product/${id}`, newReview, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Review submitted!");
//       setNewReview({ comment: '', rating: 5 });
//       fetchReviews();
//     } catch {
//       toast.error("Failed to submit review");
//     }
//   };

//   if (!product) return <div className="p-8">Loading...</div>;

//   return (
//     <div className="min-h-screen pt-20 max-w-full">
//       <Navbar />
//       <Toaster position="top-right" />

//       <div className="px-4 md:px-16 lg:px-32">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-600 mb-6"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Go Back
//         </button>

//         <div className="flex flex-col md:flex-row gap-10">
//           <div className="w-full md:w-[400px] flex justify-center">
//             <div className="overflow-hidden rounded-xl shadow-lg group w-full h-[500px] max-w-[400px]">
//               <img
//                 src={product.imageUrl || product.image}
//                 alt={product.title}
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//               />
//             </div>
//           </div>

//           <div className="flex-1 space-y-4 mt-6 md:mt-0">
//             <h1 className="text-2xl md:text-3xl font-bold">{product.title || product.name}</h1>
//             <p className="text-gray-600">{product.category}</p>
//               <p className="text-sm text-gray-500 ">Fabric: {product.fabricType}</p>

//             <p className="text-yellow-600 font-semibold text-xl">₹{product.price}</p>
           
//             <p>{product.description}</p>
//             <p className="text-sm text-gray-700">
//               ⭐ {product.averageRating ? product.averageRating.toFixed(1) : "No rating yet"}
//             </p>

//             <select
//               value={selectedSize}
//               onChange={(e) => setSelectedSize(e.target.value)}
//               className="px-3 py-2 border rounded-md"
//             >
//               <option value="">Select Size</option>
//               {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
//                 <option key={size} value={size}>{size}</option>
//               ))}
//             </select>

//             <div className="flex flex-wrap gap-3 mt-4">
//               <button
//                 onClick={toggleWishlist}
//                 className={`flex items-center gap-2 px-4 py-2 border rounded ${
//                   isWishlisted
//                     ? "text-red-600 border-red-600 hover:bg-red-50"
//                     : "text-pink-600 border-pink-600 hover:bg-pink-50"
//                 }`}
//               >
//                 <Heart className="w-4 h-4" />
//                 {isWishlisted ? "Remove from Wishlist 💔" : "Add to Wishlist ❤️"}
//               </button>

//               <button
//                 onClick={handleAddToCart}
//                 className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
//               >
//                 <ShoppingCart className="w-4 h-4" />
//                 Add to Cart
//               </button>

//               {product.customizable && (
//                 <button
//                   onClick={() => setShowCustomization(true)}
//                   className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded hover:bg-yellow-50"
//                 >
//                   Customize
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Reviews Section */}
//         <div className="mt-12">
//           {reviews.length > 0 && (
//             <>
//               <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//               <div className="space-y-4">
//                 {reviews.map((rev) => (
//                   <div
//                     key={rev._id}
//                     className="p-4 border rounded-md shadow-sm bg-white"
//                   >
//                     <div className="flex flex-col sm:flex-row sm:justify-between">
//                       <p className="text-sm font-semibold text-gray-800">
//                         {rev.userId?.name || "User"}
//                       </p>
//                       <p className="text-yellow-600 text-sm">⭐ {rev.rating}</p>
//                     </div>
//                     <p className="mt-2 text-gray-700 text-sm">{rev.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {canReview && (
//             <div className="mt-6 space-y-2">
//               <h3 className="font-medium text-lg">Add Your Review</h3>
//               <textarea
//                 value={newReview.comment}
//                 onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//                 className="w-full border px-3 py-2 rounded-md text-sm"
//                 placeholder="Your review"
//                 rows={3}
//               />
//               <select
//                 value={newReview.rating}
//                 onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
//                 className="px-3 py-2 border rounded text-sm"
//               >
//                 {[1, 2, 3, 4, 5].map((r) => (
//                   <option key={r} value={r}>
//                     {r} Star{r > 1 && "s"}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 onClick={handleSubmitReview}
//                 className="block mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
//               >
//                 Submit Review
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Customize Modal */}
//       {showCustomization && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-md p-6 w-full max-w-md space-y-4 relative">
//             <h2 className="text-lg font-semibold">Customization Form</h2>
//             <input type="text" placeholder="Size" className="w-full border px-3 py-2 rounded" />
//             <input type="text" placeholder="Color" className="w-full border px-3 py-2 rounded" />
//             <textarea placeholder="Design notes" className="w-full border px-3 py-2 rounded" />
//             <button
//               onClick={() => {
//                 toast.success("Customization submitted!");
//                 setShowCustomization(false);
//               }}
//               className="bg-yellow-600 w-full py-2 text-white rounded hover:bg-yellow-700"
//             >
//               Submit
//             </button>
//             <button
//               onClick={() => setShowCustomization(false)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;



//2nd last 
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '@/utils/axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
// import Footer from '@/components/Footer';
// import Navbar from '@/components/Navbar';
// import { useWishlist } from '@/context/WishlistContext';
// import { useCart } from '@/context/CartContext';
// import CustomizationForm from '@/components/CustomizationForm';
// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [showCustomization, setShowCustomization] = useState(false);
//   const [reviews, setReviews] = useState([]);
//   const [canReview, setCanReview] = useState(false);
//   const [newReview, setNewReview] = useState({ comment: '', rating: 5 });
// const [quantity, setQuantity] = useState(1);
//   const [submittingReview, setSubmittingReview] = useState(false);

//   const page = 1;

//  const { wishlist, fetchWishlist } = useWishlist();
// const isWishlisted = wishlist.map(item => item._id).includes(id);

//   const { fetchCart } = useCart();

//   useEffect(() => {
//     fetchProduct();
//     fetchReviews();
//     checkIfUserCanReview();

//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(`/products/${id}`);
//       setProduct(res.data.product || res.data);
//     } catch {
//       toast.error("Failed to load product");
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(`/reviews/product/${id}?page=${page}&limit=5`);
//       setReviews(res.data.reviews || []);
//     } catch {
//       setReviews([]);
//     }
//   };

//   const checkIfUserCanReview = async () => {
//     const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
//     if (!token) return;

//     try {
//       const res = await axios.get(`/reviews/can-review/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCanReview(res.data.canReview);
//     } catch {
//       setCanReview(false);
//     }
//   };

//   // const checkWishlistStatus = async () => {
//   //   const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
//   //   if (!token) return;

//   //   try {
//   //     const res = await axios.get(`/wishlist`, {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });
//   //     const wishlist = res.data.wishlist || [];
//   //     const wishIds = wishlist.map((item) => item._id);
//   //     setIsWishlisted(wishIds.includes(id));
//   //   } catch (err) {
//   //     console.error("Wishlist fetch error", err);
//   //   }
//   // };

//  const toggleWishlist = async () => {
//   const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
//   if (!token) {
//     toast.error("Login required to manage wishlist");
//     setTimeout(() => navigate('/auth?type=login'), 1500);
//     return;
//   }

//   try {
//     if (isWishlisted) {
//       await axios.delete(`/wishlist/remove/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Removed from wishlist");
//     } else {
//       await axios.post(`/wishlist/add/${id}`, {
//         title: product.title,
//         image: product.image || product.imageUrl,
//         price: product.price,
//         category: product.category,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Added to wishlist");
//     }

//     await fetchWishlist(); // ✅ Refresh context
//   } catch (err) {
//     console.error("Wishlist update failed:", err);
//     toast.error("Wishlist update failed");
//   }
// };

//   const handleAddToCart = async () => {
//     const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
//     if (!token) {
//       toast.error("Login required to add to cart");
//       return navigate("/auth?type=login");
//     }

//     if (!selectedSize) {
//       toast.error("Please select a size");
//       return;
//     }

//     try {
//       await axios.post(`/user/cart/add`, {
//         productId: id,
//         quantity: 1,
//         size: selectedSize,
//       }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       toast.success("Added to cart");
//       fetchCart();
//     } catch (err) {
//       toast.error("Failed to add to cart");
//     }
//   };

//   const handleSubmitReview = async () => {
//     const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
//     if (!token) {
//       toast.error("Login required to submit review");
//       return navigate("/auth?type=login");
//     }

//     try {
//       setSubmittingReview(true);
//       await axios.post(`/reviews/product/${id}`, newReview, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Review submitted!");
//       setNewReview({ comment: '', rating: 5 });
//       fetchReviews();
//     } catch {
//       toast.error("Failed to submit review");
//     } finally {
//       setSubmittingReview(false);
//     }
//   };

//   if (!product) return <div className="p-8">Loading...</div>;

//   return (
//     <div className="min-h-screen pt-20 max-w-full">
//       <Navbar />
//       <Toaster position="top-right" />

//       <div className="px-4 md:px-16 lg:px-32">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-600 mb-6"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Go Back
//         </button>

//         <div className="flex flex-col md:flex-row gap-10">
//           <div className="w-full md:w-[400px] flex justify-center">
//             <div className="overflow-hidden rounded-xl shadow-lg group w-full h-[500px] max-w-[400px]">
//               <img
//                 src={product.imageUrl || product.image}
//                 alt={product.title}
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//               />
//             </div>
//           </div>

//           <div className="flex-1 space-y-4 mt-6 md:mt-0">
//             <h1 className="text-2xl md:text-3xl font-bold">{product.title || product.name}</h1>
//             <p className="text-gray-600">{product.category}</p>
//             <p className="text-sm text-gray-500 ">Fabric: {product.fabricType}</p>
//             <p className="text-yellow-600 font-semibold text-xl">₹{product.price}</p>
//             <p>{product.description}</p>
//             <p className="text-sm text-gray-700">
//               ⭐ {product.averageRating ? product.averageRating.toFixed(1) : "No rating yet"}
//             </p>

//             <select
//               value={selectedSize}
//               onChange={(e) => setSelectedSize(e.target.value)}
//               className="px-3 py-2 border rounded-md"
//             >
//               <option value="">Select Size</option>
//               {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
//                 <option key={size} value={size}>{size}</option>
//               ))}
//             </select>

//             <div className="flex flex-wrap gap-3 mt-4">
//               <button
//                 onClick={toggleWishlist}
//                 className={`flex items-center gap-2 px-4 py-2 border rounded ${
//                   isWishlisted
//                     ? "text-red-600 border-red-600 hover:bg-red-50"
//                     : "text-pink-600 border-pink-600 hover:bg-pink-50"
//                 }`}
//               >
//                 <Heart className="w-4 h-4" />
//                 {isWishlisted ? "Remove from Wishlist 💔" : "Add to Wishlist ❤️"}
//               </button>

//               <button
//                 onClick={handleAddToCart}
//                 className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
//               >
//                 <ShoppingCart className="w-4 h-4" />
//                 Add to Cart
//               </button>

//               {product.customizable && (
//                 <button
//                   onClick={() => setShowCustomization(true)}
//                   className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded hover:bg-yellow-50"
//                 >
//                   Customize
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Reviews Section */}
//         <div className="mt-12">
//           {reviews.length > 0 && (
//             <>
//               <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//               <div className="space-y-4">
//                 {reviews.map((rev) => (
//                   <div
//                     key={rev._id}
//                     className="p-4 border rounded-md shadow-sm bg-white"
//                   >
//                     <div className="flex flex-col sm:flex-row sm:justify-between">
//                       <p className="text-sm font-semibold text-gray-800">
//                         {rev.userId?.name || "User"}
//                       </p>
//                       <p className="text-yellow-600 text-sm">⭐ {rev.rating}</p>
//                     </div>
//                     <p className="mt-2 text-gray-700 text-sm">{rev.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {canReview && (
//             <div className="mt-6 space-y-2">
//               <h3 className="font-medium text-lg">Add Your Review</h3>
//               <textarea
//                 value={newReview.comment}
//                 onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//                 className="w-full border px-3 py-2 rounded-md text-sm"
//                 placeholder="Your review"
//                 rows={3}
//               />
//               <select
//                 value={newReview.rating}
//                 onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
//                 className="px-3 py-2 border rounded text-sm"
//               >
//                 {[1, 2, 3, 4, 5].map((r) => (
//                   <option key={r} value={r}>
//                     {r} Star{r > 1 && "s"}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 onClick={handleSubmitReview}
//                 disabled={submittingReview}
//                 className="block mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm disabled:opacity-50"
//               >
//                 {submittingReview ? "Submitting..." : "Submit Review"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Customize Modal */}
//       {/* {showCustomization && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-md p-6 w-full max-w-md space-y-4 relative">
//             <h2 className="text-lg font-semibold">Customization Form</h2>
//             <input type="text" placeholder="Size" className="w-full border px-3 py-2 rounded" />
//             <input type="text" placeholder="Color" className="w-full border px-3 py-2 rounded" />
//             <textarea placeholder="Design notes" className="w-full border px-3 py-2 rounded" />
//             <button
//               onClick={() => {
//                 toast.success("Customization submitted!");
//                 setShowCustomization(false);
//               }}
//               className="bg-yellow-600 w-full py-2 text-white rounded hover:bg-yellow-700"
//             >
//               Submit
//             </button>
//             <button
//               onClick={() => setShowCustomization(false)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )} */}
     
//      {showCustomization && (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-md p-6 w-full max-w-4xl w-[90%] relative overflow-y-auto max-h-[90vh]">
//       <CustomizationForm
//         productId={id}                // ✅ passing from useParams()
//         onClose={() => setShowCustomization(false)}  // ✅ for closing after submit
//       />
//       <button
//         onClick={() => setShowCustomization(false)}
//         className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
//       >
//         ✕
//       </button>
//     </div>
//   </div>
// )}


//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '@/utils/axios';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import CustomizationForm from '@/components/CustomizationForm';
import moment from 'moment';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showCustomization, setShowCustomization] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ comment: '', rating: 5 });
  const [submittingReview, setSubmittingReview] = useState(false);

  const page = 1;

  const { wishlist, fetchWishlist } = useWishlist();
  const isWishlisted = wishlist.map(item => item._id).includes(id);

  const { fetchCart } = useCart();

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    checkIfUserCanReview();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${id}`);
      setProduct(res.data.product || res.data);
    } catch {
      toast.error("Failed to load product");
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/reviews/product/${id}?page=${page}&limit=5`);
      setReviews(res.data.reviews || []);
    } catch {
      setReviews([]);
    }
  };

  const checkIfUserCanReview = async () => {
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const res = await axios.get(`/reviews/can-review/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCanReview(res.data.canReview);
    } catch {
      setCanReview(false);
    }
  };

  const toggleWishlist = async () => {
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    if (!token) {
      toast.error("Login required to manage wishlist");
      setTimeout(() => navigate('/auth?type=login'), 1500);
      return;
    }

    try {
      if (isWishlisted) {
        await axios.delete(`/wishlist/remove/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Removed from wishlist");
      } else {
        await axios.post(`/wishlist/add/${id}`, {
          title: product.title,
          image: product.image || product.imageUrl,
          price: product.price,
          category: product.category,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Added to wishlist");
      }

      await fetchWishlist();
    } catch (err) {
      console.error("Wishlist update failed:", err);
      toast.error("Wishlist update failed");
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    if (!token) {
      toast.error("Login required to add to cart");
      return navigate("/auth?type=login");
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    try {
      await axios.post(`/user/cart/add`, {
        productId: id,
        quantity,
        size: selectedSize,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Added to cart");
      fetchCart();
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const handleSubmitReview = async () => {
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    if (!token) {
      toast.error("Login required to submit review");
      return navigate("/auth?type=login");
    }

    try {
      setSubmittingReview(true);
      await axios.post(`/products/${id}/reviews`, newReview, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Review submitted!");
      setNewReview({ comment: '', rating: 5 });
      setShowReviewForm(false);
      fetchReviews();
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen pt-20 max-w-full">
      <Navbar />
      <Toaster position="top-right" />

      <div className="px-4 md:px-16 lg:px-32">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-[400px] flex justify-center">
            <div className="overflow-hidden rounded-xl shadow-lg group w-full h-[500px] max-w-[400px]">
              <img
                src={product.imageUrl || product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4 mt-6 md:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold">{product.title || product.name}</h1>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-sm text-gray-500">Fabric: {product.fabricType}</p>
            <p className="text-yellow-600 font-semibold text-xl">₹{product.price}</p>
            <p>{product.description}</p>
            <p className="text-sm text-gray-700">
              ⭐ {product.averageRating ? product.averageRating.toFixed(1) : "No rating yet"}
            </p>

            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="">Select Size</option>
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mt-2">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border px-2 rounded-md">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 text-lg">-</button>
                <span className="px-3">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(10, q + 1))} className="px-2 text-lg">+</button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={toggleWishlist}
                className={`flex items-center gap-2 px-4 py-2 border rounded ${
                  isWishlisted
                    ? "text-red-600 border-red-600 hover:bg-red-50"
                    : "text-pink-600 border-pink-600 hover:bg-pink-50"
                }`}
              >
                <Heart className="w-4 h-4" />
                {isWishlisted ? "Remove from Wishlist 💔" : "Add to Wishlist ❤️"}
              </button>

              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              {product.customizable && (
                <button
                  onClick={() => setShowCustomization(true)}
                  className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded hover:bg-yellow-50"
                >
                  Customize
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 📝 Reviews */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold mb-2">Customer Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev._id} className="border-b pb-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">{rev.userId?.name || "User"}</p>
                    <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      {rev.rating.toFixed(1)} <Star className="w-3 h-3 fill-white" />
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Posted on {moment(rev.createdAt).format('D MMM YYYY')}</p>
                </div>
                <p className="text-gray-700 text-sm">{rev.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}

          {/* ➕ Add Review */}
          {canReview && (
            <div className="mt-4">
              {!showReviewForm ? (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="text-sm text-yellow-600 hover:underline"
                >
                  + Add Review
                </button>
              ) : (
                <div className="space-y-2">
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full border px-3 py-2 rounded-md text-sm"
                    placeholder="Write your review"
                    rows={3}
                  />
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    className="px-3 py-2 border rounded text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
                    ))}
                  </select>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmitReview}
                      disabled={submittingReview}
                      className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm disabled:opacity-50"
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-4xl w-[90%] relative overflow-y-auto max-h-[90vh]">
            <CustomizationForm
              productId={id}
              onClose={() => setShowCustomization(false)}
            />
            <button
              onClick={() => setShowCustomization(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
