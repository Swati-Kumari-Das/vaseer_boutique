import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import axios from "@/utils/axios";
import toast from "react-hot-toast";
import AddressForm from "./AddressForm";

const AddressCard = ({ address, selected, onSelect, onUpdated }) => {
  const token = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/address/${address._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Address deleted");
      onUpdated();
    } catch {
      toast.error("Failed to delete address");
    }
  };

  return (
    <div
      className={`border rounded p-3 shadow-sm ${
        selected ? "border-[#6D2932]" : "border-gray-300"
      }`}
    >
      {isEditing ? (
        <AddressForm
          existing={address}
          onSuccess={() => {
            setIsEditing(false);
            onUpdated();
          }}
        />
      ) : (
        <>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              checked={selected}
              onChange={onSelect}
              className="mt-1"
            />
            <div>
              <p className="font-semibold">{address.fullName}</p>
              <p className="text-sm text-gray-600">{address.addressLine}</p>
              <p className="text-sm text-gray-600">
                {address.city}, {address.state} - {address.pinCode}
              </p>
              <p className="text-sm text-gray-600">📞 {address.mobile}</p>
            </div>
          </label>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-1 hover:underline">
              <Pencil className="w-4 h-4" /> Edit
            </button>
            <button onClick={handleDelete} className="flex items-center gap-1 text-red-500 hover:underline">
              <Trash className="w-4 h-4" /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressCard;
