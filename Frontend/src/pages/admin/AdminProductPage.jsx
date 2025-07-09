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



import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import ProductFormModal from "./ProductFormModal";
import Alert from "@/components/Alert"; // ✅ make sure path is correct
import ConfirmDialog from "@/components/ConfirmDialog";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);

  const token = localStorage.getItem("adminToken");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
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
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error("❌ Delete failed:", err.response?.data || err.message);
      setErrorMsg("❌ Delete failed. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#6D2932]">Manage Products</h2>
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
