// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Plus, Trash2, Pencil } from "lucide-react";
// import ProductFormModal from "./ProductFormModal";

// export default function AdminProductPage() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("adminToken");

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(res.data.products);
//     } catch (err) {
//       console.error("❌ Failed to fetch products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await axios.delete(`/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchProducts(); // Refresh list
//     } catch (err) {
//       console.error("❌ Delete failed:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-[#6D2932]">Manage Products</h2>
//         <Button
//           onClick={() => {
//             setEditProduct(null);
//             setShowModal(true);
//           }}
//           className="bg-[#6D2932] text-white"
//         >
//           <Plus className="w-4 h-4 mr-2" /> Add Product
//         </Button>
//       </div>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : products.length === 0 ? (
//         <p className="text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white rounded-xl shadow p-4 border border-gray-200 hover:shadow-lg transition"
//             >
//               <img
//                 src={product.imageUrl}
//                 alt={product.title}
//                 className="w-full h-48 object-cover rounded-md mb-3"
//               />
//               <h3 className="text-lg font-bold text-[#6D2932]">{product.title}</h3>

//               <p className="text-sm text-gray-600">
//                 <span className="font-medium">Category:</span> {product.category}
//               </p>
//               <p className="text-sm text-gray-600">
//                 <span className="font-medium">Fabric:</span> {product.fabricType}
//               </p>
//               <p className="text-sm text-gray-600">
//                 <span className="font-medium">Customizable:</span>{" "}
//                 {product.customizable ? "Yes" : "No"}
//               </p>
//               <p className="text-sm text-gray-600">
//                 <span className="font-medium">Description:</span> {product.description}
//               </p>
//               <p className="text-sm text-gray-600">
//                 <span className="font-medium">Created:</span>{" "}
//                 {new Date(product.createdAt).toLocaleString()}
//               </p>

//               <p className="text-[#6D2932] font-bold mt-1 text-right">
//                 ₹{product.price}
//               </p>

//               <div className="flex justify-end mt-3 space-x-2">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => {
//                     setEditProduct(product);
//                     setShowModal(true);
//                   }}
//                 >
//                   <Pencil className="w-4 h-4" />
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="destructive"
//                   onClick={() => handleDelete(product._id)}
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showModal && (
//         <ProductFormModal
//           onClose={() => setShowModal(false)}
//           onSuccess={() => {
//             setShowModal(false);
//             fetchProducts();
//           }}
//           initialData={editProduct}
//         />
//       )}
//     </div>
//   );
// }



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Plus, Trash2, Pencil } from "lucide-react";
// import ProductFormModal from "./ProductFormModal";
// import Alert from "@/components/Alert"; // ✅ make sure path is correct
// import ConfirmDialog from "@/components/ConfirmDialog";

// export default function AdminProductPage() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [productToDelete, setProductToDelete] = useState(null);

//   const token = localStorage.getItem("adminToken");

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/api/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(res.data.products);
//     } catch (err) {
//       setErrorMsg("❌ Failed to fetch products. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuccessMsg("✅ Product deleted successfully.");
//       fetchProducts(); // Refresh product list
//     } catch (err) {
//       console.error("❌ Delete failed:", err.response?.data || err.message);
//       setErrorMsg("❌ Delete failed. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-[#6D2932]">Manage Products</h2>
//         <Button
//           onClick={() => {
//             setEditProduct(null);
//             setShowModal(true);
//           }}
//           className="bg-[#6D2932] text-white"
//         >
//           <Plus className="w-4 h-4 mr-2" /> Add Product
//         </Button>
//       </div>

//       {errorMsg && (
//         <Alert type="error" onClose={() => setErrorMsg("")}>
//           {errorMsg}
//         </Alert>
//       )}

//       {successMsg && (
//         <Alert type="success" onClose={() => setSuccessMsg("")}>
//           {successMsg}
//         </Alert>
//       )}

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : products.length === 0 ? (
//         <p className="text-gray-500">No products found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white rounded-xl shadow border border-gray-200 p-4 hover:shadow-md transition flex gap-4"
//             >
//               <div className="w-40 h-56 bg-gray-100 rounded-md overflow-hidden">
//                 <img
//                   src={product.imageUrl}
//                   alt={product.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="flex-1">
//                 <h3 className="text-lg font-bold text-[#6D2932] mb-1">{product.title}</h3>
//                 <p className="text-xs text-gray-400 mb-1">ID: {product._id}</p>

//                 <p className="text-sm text-gray-700">
//                   <span className="font-medium">Category:</span> {product.category}
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   <span className="font-medium">Fabric:</span> {product.fabricType}
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   <span className="font-medium">Customizable:</span>{" "}
//                   {product.customizable ? "Yes" : "No"}
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   <span className="font-medium">Description:</span>{" "}
//                   {product.description || "—"}
//                 </p>
//                 <p className="text-sm text-gray-700">
//                   <span className="font-medium">Created:</span>{" "}
//                   {new Date(product.createdAt).toLocaleString()}
//                 </p>

//                 <div className="flex justify-between items-center mt-4">
//                   <p className="text-[#6D2932] font-bold text-lg">₹{product.price}</p>
//                   <div className="flex gap-2">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => {
//                         setEditProduct(product);
//                         setShowModal(true);
//                       }}
//                     >
//                       <Pencil className="w-4 h-4" />
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => setProductToDelete(product._id)}
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showModal && (
//         <ProductFormModal
//           onClose={() => setShowModal(false)}
//           onSuccess={() => {
//             setShowModal(false);
//             fetchProducts();
//           }}
//           initialData={editProduct}
//         />
//       )}

// {productToDelete && (
//   <ConfirmDialog
//     message="Are you sure you want to delete this product?"
//     onCancel={() => setProductToDelete(null)}
//     onConfirm={() => {
//       handleDelete(productToDelete);
//       setProductToDelete(null);
//     }}
//   />
// )}

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import ProductFormModal from "./ProductFormModal";
import Alert from "@/components/Alert";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  const [categories, setCategories] = useState([]);
  // 🆕 Filter/search state
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = {
        search,
        category: categoryFilter,
        sortBy,
        order: sortOrder,
      };

      const res = await axios.get("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setProducts(res.data.products);
    } catch (err) {
      setErrorMsg("❌ Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMsg("✅ Product deleted successfully.");
      fetchProducts();
    } catch (err) {
      setErrorMsg("❌ Delete failed. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, categoryFilter, sortBy, sortOrder]);
// 🆕 Fetch categories when component loads
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/products/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err.message);
    }
  };
  fetchCategories();
}, []);
  return (
    <div className="p-6">
      
      <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="text-[#6D2932] hover:text-yellow-600 transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-[#6D2932]">Manage Products</h2>
      </div>
       
        <Button
          onClick={() => {
            setEditProduct(null);
            setShowModal(true);
          }}
          className="bg-[#6D2932] text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      {/* 🆕 Search + Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm"
        />
      
      <select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  className="border px-3 py-2 rounded-md text-sm"
>
  <option value="">All Categories</option>
  {categories.map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="createdAt">Newest</option>
          <option value="price">Price</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm"
        >
          {sortBy === "price" ? (
            <>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </>
          ) : (
            <>
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </>
          )}
        </select>
      </div>

      {/* Alerts */}
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

      {/* Product Cards */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow border border-gray-200 p-4 hover:shadow-md transition flex gap-4"
            >
              <div className="w-40 h-56 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#6D2932] mb-1">{product.title}</h3>
                <p className="text-xs text-gray-400 mb-1">ID: {product._id}</p>

                <p className="text-sm text-gray-700">
                  <span className="font-medium">Category:</span> {product.category}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Fabric:</span> {product.fabricType}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Customizable:</span>{" "}
                  {product.customizable ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Description:</span>{" "}
                  {product.description || "—"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(product.createdAt).toLocaleString()}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-[#6D2932] font-bold text-lg">₹{product.price}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditProduct(product);
                        setShowModal(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setProductToDelete(product._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {showModal && (
        <ProductFormModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchProducts();
          }}
          initialData={editProduct}
        />
      )}

      {productToDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this product?"
          onCancel={() => setProductToDelete(null)}
          onConfirm={() => {
            handleDelete(productToDelete);
            setProductToDelete(null);
          }}
        />
      )}
    </div>
  );
}

