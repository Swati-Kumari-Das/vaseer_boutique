// import React, { useEffect, useState } from "react";
// import { Dialog } from "@headlessui/react";
// import axios from "@/utils/axios";
// import toast from "react-hot-toast";
// import AddressForm from "./AddressForm";
// import AddressCard from "./AddressCard";

// const PlaceOrderDialog = ({ isOpen, onClose, cartItems }) => {
//   const token = localStorage.getItem("token");
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const fetchAddresses = async () => {
//     try {
//       const res = await axios.get("/address", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAddresses(res.data.addresses);
//       const defaultAddr = res.data.addresses.find((a) => a.isDefault);
//       if (defaultAddr) setSelectedAddressId(defaultAddr._id);
//     } catch {
//       toast.error("Failed to fetch addresses");
//     }
//   };

//   const handlePlaceOrder = async () => {
//     const selectedAddress = addresses.find((a) => a._id === selectedAddressId);
//     if (!selectedAddress) return toast.error("Select an address");

//     try {
//       setLoading(true);
//       for (const item of cartItems) {
//         await axios.post("/orders/place", {
//           productId: item.product._id,
//           quantity: item.quantity,
//           shippingAddress: selectedAddress.addressLine,
//           contactPhone: selectedAddress.mobile,
//           totalAmount: item.product.price * item.quantity,
//         }, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }

//       toast.success("Order placed successfully!");
//       onClose();
//       window.location.href = "/orders";
//     } catch {
//       toast.error("Order failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) fetchAddresses();
//   }, [isOpen]);

//   return (
//     <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen p-4">
//         <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
//           <Dialog.Title className="text-xl font-bold mb-4 text-[#6D2932]">Select Delivery Address</Dialog.Title>

//           {/* Address List */}
//           <div className="space-y-4 max-h-64 overflow-y-auto">
//             {addresses.map((addr) => (
//               <AddressCard
//                 key={addr._id}
//                 address={addr}
//                 selected={selectedAddressId === addr._id}
//                 onSelect={() => setSelectedAddressId(addr._id)}
//                 onUpdated={fetchAddresses}
//               />
//             ))}
//           </div>

//           {/* Add New Address Toggle */}
//           <div className="mt-4">
//             <button
//               onClick={() => setShowForm(!showForm)}
//               className="text-sm text-blue-600 underline"
//             >
//               {showForm ? "Cancel" : "+ Add New Address"}
//             </button>
//           </div>

//           {/* Address Form */}
//           {showForm && <AddressForm onSuccess={() => {
//             setShowForm(false);
//             fetchAddresses();
//           }} />}

//           {/* Buttons */}
//           <div className="mt-6 flex justify-end gap-3">
//             <button onClick={onClose} className="text-gray-500 hover:underline">
//               Cancel
//             </button>
//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading}
//               className="bg-[#6D2932] text-white px-4 py-2 rounded hover:bg-[#572026]"
//             >
//               {loading ? "Placing..." : "Confirm Order"}
//             </button>
//           </div>
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   );
// };

// export default PlaceOrderDialog;


import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "@/utils/axios";
import toast from "react-hot-toast";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlaceOrderDialog = ({ isOpen, onClose, cartItems }) => {
  const token = localStorage.getItem("token");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("/address", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data.addresses);
      const defaultAddr = res.data.addresses.find((a) => a.isDefault);
      if (defaultAddr) setSelectedAddressId(defaultAddr._id);
    } catch {
      toast.error("Failed to fetch addresses");
    }
  };

  const handleProceedToPayment = () => {
    const selectedAddress = addresses.find((a) => a._id === selectedAddressId);
    if (!selectedAddress) return toast.error("Select an address first");

    // Navigate to payment page with selected data
    navigate("/payment", {
      state: { cartItems, selectedAddress },
    });
    onClose(); // Close the dialog
  };

  useEffect(() => {
    if (isOpen) {
      setShowForm(false); // Always close form on open
      fetchAddresses();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="relative bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">

          {/* ❌ Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>

          <Dialog.Title className="text-xl md:text-2xl font-bold mb-6 text-[#6D2932]">
            Select Delivery Address
          </Dialog.Title>

          {/* 🏠 Address List */}
          <div className="space-y-4">
            {addresses.length > 0 ? (
              addresses.map((addr) => (
                <AddressCard
                  key={addr._id}
                  address={addr}
                  selected={selectedAddressId === addr._id}
                  onSelect={() => {
                    setSelectedAddressId(addr._id);
                    setShowForm(false); // close form when selecting another
                  }}
                  onUpdated={fetchAddresses}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No saved addresses found.</p>
            )}
          </div>

          {/* ➕ Add New Address */}
          <div className="mt-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="text-sm text-blue-600 underline"
            >
              {showForm ? "Cancel" : "+ Add New Address"}
            </button>
          </div>

          {/* ✏️ Address Form */}
          {showForm && (
            <div className="mt-4">
              <AddressForm
                onSuccess={() => {
                  setShowForm(false);
                  fetchAddresses();
                }}
              />
            </div>
          )}

          {/* ✅ Proceed to Payment */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
            <button
              onClick={handleProceedToPayment}
              className="bg-[#6D2932] text-white px-4 py-2 rounded hover:bg-[#572026] transition"
            >
              Continue to Payment
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PlaceOrderDialog;
