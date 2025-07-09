
// import { useState } from "react";
// import axios from "axios";
// import { X } from "lucide-react";

// const fabricOptions = [
//   "Cotton", "Silk", "Georgette", "Linen", "Chiffon", "Velvet", "Net", "Rayon", "Other"
// ];
// const [errorMsg, setErrorMsg] = useState("");

// export default function ProductFormModal({ onClose, onSuccess, initialData }) {
//   const [form, setForm] = useState({
//     title: initialData?.title || "",
//     category: initialData?.category || "",
//     description: initialData?.description || "",
//     price: initialData?.price || "",
//     customizable: initialData?.customizable || false,
//     fabricType: initialData?.fabricType || "Cotton",
//   });

//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("adminToken");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       Object.entries(form).forEach(([key, val]) => formData.append(key, val));
//       if (image) formData.append("image", image);

//       const url = initialData
//         ? `/api/products/${initialData._id}`
//         : "/api/products/add";

//       const method = initialData ? "put" : "post";

//       await axios[method](url, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       onSuccess();
//     } catch (err) {
//       console.error("❌ Error saving product:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-opacity-30 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg relative">
//         <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">
//           <X />
//         </button>
//         <h2 className="text-xl font-bold text-[#6D2932] mb-4">
//           {initialData ? "Update Product" : "Add New Product"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" required />
//           <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input" required />
//           <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />
//           <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price (₹)" className="input" required />

//           <select name="fabricType" value={form.fabricType} onChange={handleChange} className="input">
//             {fabricOptions.map((f) => <option key={f} value={f}>{f}</option>)}
//           </select>

//           <label className="flex items-center space-x-2">
//             <input type="checkbox" name="customizable" checked={form.customizable} onChange={handleChange} />
//             <span>Customizable</span>
//           </label>

//           <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-[#6D2932] text-white px-4 py-2 rounded-md"
//           >
//             {loading ? "Saving..." : initialData ? "Update" : "Add"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import Alert from "@/components/Alert"; // using your existing Alert

const fabricOptions = [
  "Cotton", "Silk", "Georgette", "Linen", "Chiffon", "Velvet", "Net", "Rayon", "Other"
];

export default function ProductFormModal({ onClose, onSuccess, initialData }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    customizable: initialData?.customizable || false,
    fabricType: initialData?.fabricType || "Cotton",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    if (!form.title || !form.category || !form.price || !form.fabricType) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (Number(form.price) <= 0) {
      setErrorMsg("Price must be greater than zero.");
      return;
    }

    if (!initialData && !image) {
      setErrorMsg("Please upload an image.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");

      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      if (image) formData.append("image", image);

      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products/add";
      const method = initialData ? "put" : "post";

      const response = await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMsg(`✅ Product ${initialData ? "updated" : "added"} successfully.`);
      setTimeout(() => {
        onSuccess(); // close modal and refresh product list
      }, 1000);
    } catch (err) {
      console.error("❌ Error saving product:", err);

      // Handle server validation or upload errors
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold text-[#6D2932] mb-4">
          {initialData ? "Update Product" : "Add New Product"}
        </h2>

        {/* ✅ Use Alert without modifying component */}
        {errorMsg && (
          <Alert type="error" onClose={() => setErrorMsg("")}>
            {errorMsg}
          </Alert>
        )}
        {successMsg && (
          <Alert type="success" onClose={() => setSuccessMsg("")}>
            {successMsg}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="input"
            required
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="input"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="input"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price (₹)"
            className="input"
            required
          />

          <select
            name="fabricType"
            value={form.fabricType}
            onChange={handleChange}
            className="input"
          >
            {fabricOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="customizable"
              checked={form.customizable}
              onChange={handleChange}
            />
            <span>Customizable</span>
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#6D2932] text-white px-4 py-2 rounded-md"
          >
            {loading ? "Saving..." : initialData ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}
