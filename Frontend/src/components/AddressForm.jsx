import React, { useState } from "react";
import axios from "@/utils/axios";
import toast from "react-hot-toast";

const AddressForm = ({ onSuccess, existing }) => {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    fullName: existing?.fullName || "",
    mobile: existing?.mobile || "",
    pinCode: existing?.pinCode || "",
    addressLine: existing?.addressLine || "",
    city: existing?.city || "",
    state: existing?.state || "",
    isDefault: existing?.isDefault || false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};

    if (!formData.fullName.trim()) err.fullName = "Full name is required";
    if (!/^\d{10}$/.test(formData.mobile)) err.mobile = "Mobile must be 10 digits";
    if (!/^\d{6}$/.test(formData.pinCode)) err.pinCode = "PIN must be 6 digits";
    if (!formData.addressLine.trim()) err.addressLine = "Address is required";
    if (!formData.city.trim()) err.city = "City is required";
    if (!formData.state.trim()) err.state = "State is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const url = existing ? `/address/${existing._id}` : "/address";
      const method = existing ? "put" : "post";

      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`Address ${existing ? "updated" : "added"} successfully`);
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to save address");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full p-2 border rounded"
      />
      {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}

      <input
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Mobile Number"
        className="w-full p-2 border rounded"
      />
      {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}

      <input
        name="pinCode"
        value={formData.pinCode}
        onChange={handleChange}
        placeholder="PIN Code"
        className="w-full p-2 border rounded"
      />
      {errors.pinCode && <p className="text-sm text-red-600">{errors.pinCode}</p>}

      <input
        name="addressLine"
        value={formData.addressLine}
        onChange={handleChange}
        placeholder="Full Address"
        className="w-full p-2 border rounded"
      />
      {errors.addressLine && <p className="text-sm text-red-600">{errors.addressLine}</p>}

      <input
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full p-2 border rounded"
      />
      {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}

      <input
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        className="w-full p-2 border rounded"
      />
      {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
        />
        Make default address
      </label>

      <button
        type="submit"
        className="bg-[#6D2932] text-white px-4 py-2 rounded hover:bg-[#572026]"
      >
        {existing ? "Update Address" : "Add Address"}
      </button>
    </form>
  );
};

export default AddressForm;
