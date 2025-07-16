// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "@/utils/axios";

// const PaymentPage = () => {
//   const { state } = useLocation(); // address + cart passed from PlaceOrderDialog
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const { cartItems, address } = state || {};

//   if (!cartItems || !address) {
//     return <div className="p-4 text-red-600">Invalid request. No cart or address data.</div>;
//   }

//   const total = cartItems.reduce(
//     (acc, item) => acc + item.product.price * item.quantity,
//     0
//   );

//   const handleConfirmOrder = async () => {
//     try {
//       for (const item of cartItems) {
//         await axios.post(
//           "/orders/place",
//           {
//             productId: item.product._id,
//             quantity: item.quantity,
//             shippingAddress: address.addressLine,
//             contactPhone: address.mobile,
//             totalAmount: item.product.price * item.quantity,
//           },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//       }

//       toast.success("Order placed successfully!");
//       navigate("/order-confirmation", { state: { address, total } });
//     } catch (err) {
//       console.error(err);
//       toast.error("Order failed");
//     }
//   };

//   return (
//     <div className="min-h-screen pt-24 px-4 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-[#6D2932]">Payment Details</h2>

//       <div className="bg-white p-4 rounded shadow space-y-4">
//         <div>
//           <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
//           <p>{address.fullName}, {address.mobile}</p>
//           <p>{address.addressLine}, {address.city}, {address.state} - {address.pinCode}</p>
//         </div>

//         <div className="border-t pt-4">
//           <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
//           <p>Total Items: {cartItems.length}</p>
//           <p className="font-bold text-lg">Total Amount: ₹{total}</p>
//         </div>

//         <div className="border-t pt-4">
//           <h3 className="font-semibold mb-2">Payment Method</h3>
//           <label className="flex items-center gap-2">
//             <input type="radio" checked readOnly />
//             Cash on Delivery (COD)
//           </label>
//         </div>

//         <button
//           onClick={handleConfirmOrder}
//           className="w-full bg-[#6D2932] text-white py-2 rounded hover:bg-[#572026] transition"
//         >
//           Confirm Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;



import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "@/utils/axios";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, selectedAddress } = location.state || {};

  const [selectedPayment, setSelectedPayment] = useState("cod"); // only cash supported
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!cartItems || !selectedAddress) {
      toast.error("Invalid request. No cart or address data.");
      navigate("/cart");
    }
  }, []);

  const getTotalAmount = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  };

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);
      for (const item of cartItems) {
        await axios.post(
          "/orders/place",
          {
            productId: item.product._id,
            quantity: item.quantity,
            shippingAddress: selectedAddress.addressLine,
            contactPhone: selectedAddress.mobile,
            totalAmount: item.quantity * item.product.price,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      toast.success("Order placed!");
    //  navigate("/order-confirmation");
    navigate("/order-confirmation", {
  state: {
    cartItems,
    address: selectedAddress,
    total: getTotalAmount(),
  },
});

    } catch {
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || !selectedAddress) return null;

  return (
    <div className="min-h-screen pt-24 px-4 md:px-12 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#6D2932]">Confirm & Pay</h2>

      {/* Address Details */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold text-lg mb-2 text-[#6D2932]">Delivery Address</h3>
        <p className="text-sm">
          <strong>{selectedAddress.fullName}</strong> <br />
          {selectedAddress.addressLine}, {selectedAddress.city}, {selectedAddress.state} -{" "}
          {selectedAddress.pinCode}
          <br />
          <strong>Phone:</strong> {selectedAddress.mobile}
        </p>
      </div>

      {/* Cart Summary */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold text-lg mb-2 text-[#6D2932]">Order Summary</h3>
        <div className="space-y-3">
          {/* {cartItems.map((item) => (
            <div key={item.product._id} className="flex justify-between text-sm border-b pb-2">
              <div>
                <p className="font-medium">{item.product.title}</p>
                <p>
                  Size: {item.size} | Qty: {item.quantity}
                </p>
              </div>
              <div>₹{item.quantity * item.product.price}</div>
            </div>
          ))} */}
          {cartItems.map((item, index) => (
  <div
    key={`${item.product._id}-${item.size}-${index}`}
    className="flex items-center gap-4 border-b pb-4"
  >
    {/* 🖼️ Product Image */}
    <img
      src={item.product.imageUrl} // Ensure `image` field exists in product
      alt={item.product.title}
      className="w-16 h-16 object-cover rounded"
    />

    {/* 🛒 Product Info */}
    <div className="flex-1">
      <p className="font-semibold">{item.product.title}</p>
      <p className="text-sm text-gray-600">
        Size: {item.size} | Qty: {item.quantity}
      </p>
    </div>

    {/* 💵 Price */}
    <div className="font-medium">₹{item.quantity * item.product.price}</div>
  </div>
))}

        </div>

        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>₹{getTotalAmount()}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold text-lg mb-2 text-[#6D2932]">Payment Method</h3>
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="radio"
            name="payment"
            checked={selectedPayment === "cod"}
            onChange={() => setSelectedPayment("cod")}
          />
          <span>Cash on Delivery (COD)</span>
        </label>
      </div>

      {/* Confirm Button */}
      <div className="text-right">
        <button
          onClick={handleConfirmOrder}
          disabled={loading}
          className="bg-[#6D2932] hover:bg-[#572026] text-white px-6 py-2 rounded"
        >
          {loading ? "Placing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
