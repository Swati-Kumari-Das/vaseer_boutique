// import React from "react";
// import { useLocation } from "react-router-dom";

// const OrderConfirmation = () => {
//   const { state } = useLocation();
//   const { cartItems, address, total } = state || {};

//   return (
//     <div className="min-h-screen pt-24 px-6 max-w-xl mx-auto text-center">
//       <h2 className="text-3xl font-bold text-[#6D2932] mb-4">🎉 Order Placed!</h2>
//       <p className="mb-4">Thank you for shopping with us.</p>

//       <div className="bg-white p-4 rounded shadow text-left">
//         <h3 className="font-semibold mb-2">Shipping To:</h3>
//         <p>{address.fullName}</p>
//         <p>{address.addressLine}, {address.city}, {address.state}</p>
//         <p>📞 {address.mobile}</p>

//         <hr className="my-3" />

//         <h3 className="font-semibold mb-2">Items:</h3>
//         {cartItems.map((item) => (
//           <p key={item.product._id}>{item.product.title} x {item.quantity}</p>
//         ))}

//         <hr className="my-3" />

//         <p className="font-bold text-[#6D2932]">Total Paid: ₹{total}</p>
//         <p className="mt-2 text-sm text-gray-600">Payment Mode: Cash on Delivery</p>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmation;


import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const address = state?.address;
  const cartItems = state?.cartItems || [];
  const total = state?.total || 0;

  useEffect(() => {
    if (!address || !cartItems.length) {
      navigate("/");
    }
  }, [address, cartItems, navigate]);

  if (!address || !cartItems.length) return null;

  return (
    <div className="min-h-screen pt-24 px-6 max-w-xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-[#6D2932] mb-4">🎉 Order Placed!</h2>
      <p className="mb-4">Thank you for shopping with us.</p>

      <div className="bg-white p-4 rounded shadow text-left">
        <h3 className="font-semibold mb-2">Shipping To:</h3>
        <p>{address.fullName}</p>
        <p>{address.addressLine}, {address.city}, {address.state} - {address.pinCode}</p>
        <p>📞 {address.mobile}</p>

        <hr className="my-3" />

        <h3 className="font-semibold mb-2">Items:</h3>
        {cartItems.map((item, index) => (
          <p key={`${item.product._id}-${item.size}-${index}`}>
            {item.product.title} x {item.quantity}
          </p>
        ))}

        <hr className="my-3" />

        <p className="font-bold text-[#6D2932]">Total Paid: ₹{total}</p>
        <p className="mt-2 text-sm text-gray-600">Payment Mode: Cash on Delivery</p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
