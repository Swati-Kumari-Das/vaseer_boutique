// import React, { useEffect, useState } from "react";
// import axios from "@/utils/axios";
// import toast, { Toaster } from "react-hot-toast";
// import { Trash2 } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import { useCart } from '@/context/CartContext';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);

//   const token = localStorage.getItem("token");

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get("/user/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(res.data.cart || []);
//     } catch (err) {
//       toast.error("Failed to fetch cart");
//     }
//   };

//   const removeItem = async (productId, size) => {
//     try {
//       await axios.delete("/user/cart/remove", {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { productId, size },
//       });
//       toast.success("Removed from cart");
//       setCartItems((prev) =>
//         prev.filter((item) => item.product._id !== productId || item.size !== size)
//       );
//     } catch {
//       toast.error("Remove failed");
//     }
//   };

//   const getTotal = () => {
//     const mrp = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
//     return {
//       mrp,
//       discount: Math.round(mrp * 0.25), // example 25% discount
//       platformFee: 0,
//       //- Math.round(mrp * 0.25)
//       total: mrp ,
//     };
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const { mrp, discount, platformFee, total } = getTotal();

//   return (
//     <div className="min-h-screen pt-24">
//       <Navbar />
//       <Toaster position="top-right" />

//       <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left: Items */}
//         <div className="md:col-span-2">
//           <h2 className="text-2xl font-bold mb-4 text-[#6D2932]">My Bag 👜</h2>
//           {cartItems.length === 0 ? (
//             <p className="text-gray-500">Your cart is empty.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={`${item.product._id}-${item.size}`}
//                 className="flex items-start gap-4 bg-white p-4 rounded-lg shadow mb-4"
//               >
//                 <img
//                   src={item.product.imageUrl}
//                   alt={item.product.title}
//                   className="w-24 h-28 object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-lg text-[#6D2932]">{item.product.title}</h3>
//                   <p className="text-sm text-gray-600">{item.product.category}</p>
//                   <p className="text-sm mt-1">
//                     <span className="font-medium">Size:</span> {item.size} &nbsp;
//                     <span className="font-medium">Qty:</span> {item.quantity}
//                   </p>
//                   <p className="font-bold text-yellow-700 mt-2">₹{item.product.price}</p>
//                   <button
//                     onClick={() => removeItem(item.product._id, item.size)}
//                     className="mt-2 text-red-600 text-sm flex items-center gap-1 hover:underline"
//                   >
//                     <Trash2 className="w-4 h-4" /> Remove
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Right: Summary */}
//         <div className="bg-white p-5 rounded-lg shadow h-fit sticky top-36 ">
//           <h3 className="text-lg font-semibold mb-3 text-[#6D2932]">Price Details</h3>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span>Total MRP</span>
//               <span>₹{mrp}</span>
//             </div>
//             {/* <div className="flex justify-between text-green-600">
//               <span>Discount</span>
//               <span>-₹{discount}</span>
//             </div> */}
//             <div className="flex justify-between">
//               <span>Platform Fee</span>
//               <span className="text-green-600">FREE</span>
//             </div>
//             <hr className="my-2" />
//             <div className="flex justify-between font-semibold text-lg text-[#6D2932]">
//               <span>Total</span>
//               <span>₹{total}</span>
//             </div>
//           </div>
//           <button
//             className="w-full mt-4 bg-[#6D2932] text-white py-2 rounded-md hover:bg-[#572026] transition"
//           >
//             PLACE ORDER
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;



import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import toast, { Toaster } from "react-hot-toast";
import { Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext"; // ✅ Import CartContext
import PlaceOrderDialog from "@/components/PlaceOrderDialog";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const token = localStorage.getItem("token");

  const { fetchCart } = useCart(); // ✅ Use global fetchCart to update cart count

  const loadCartItems = async () => {
    try {
      const res = await axios.get("/user/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cart || []);
    } catch (err) {
      toast.error("Failed to fetch cart");
    }
  };

  const removeItem = async (productId, size) => {
    try {
      await axios.delete("/user/cart/remove", {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId, size },
      });
      toast.success("Removed from cart");
      setCartItems((prev) =>
        prev.filter((item) => item.product._id !== productId || item.size !== size)
      );
      fetchCart(); // ✅ update navbar count
    } catch {
      toast.error("Remove failed");
    }
  };

  const getTotal = () => {
    const mrp = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    return {
      mrp,
      discount: Math.round(mrp * 0.25), // example 25% discount
      platformFee: 0,
      total: mrp,
    };
  };

  useEffect(() => {
    loadCartItems();
    fetchCart(); // ✅ to sync cart count on mount
  }, []);

  const { mrp, discount, platformFee, total } = getTotal();

  return (
    <div className="min-h-screen pt-24">
      <Navbar />
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Items */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-[#6D2932]">My Bag 👜</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.product._id}-${item.size}`}
                className="flex items-start gap-4 bg-white p-4 rounded-lg shadow mb-4"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  className="w-24 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-[#6D2932]">
                    {item.product.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.product.category}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Size:</span> {item.size} &nbsp;
                    <span className="font-medium">Qty:</span> {item.quantity}
                  </p>
                  <p className="font-bold text-yellow-700 mt-2">
                    ₹{item.product.price}
                  </p>
                  <button
                    onClick={() => removeItem(item.product._id, item.size)}
                    className="mt-2 text-red-600 text-sm flex items-center gap-1 hover:underline"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Summary */}
        <div className="bg-white p-5 rounded-lg shadow h-fit sticky top-36 ">
          <h3 className="text-lg font-semibold mb-3 text-[#6D2932]">
            Price Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total MRP</span>
              <span>₹{mrp}</span>
            </div>
            {/* <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div> */}
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span className="text-green-600">FREE</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg text-[#6D2932]">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          {/* <button className="w-full mt-4 bg-[#6D2932] text-white py-2 rounded-md hover:bg-[#572026] transition">
            PLACE ORDER
          </button> */}
          <PlaceOrderDialog
  isOpen={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
  cartItems={cartItems}
/>
          <button
           onClick={() => setIsDialogOpen(true)}
           className="w-full mt-4 bg-[#6D2932] text-white py-2 rounded-md hover:bg-[#572026] transition"
         >
           PLACE ORDER
         </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
