// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import ProductCard from '../components/ProductCard';
// // import Navbar from '../components/Navbar'; 
// // import Footer from '@/components/Footer';
// // const ProductList = () => {
// //   const [products, setProducts] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [category, setCategory] = useState('');
// //   const [sortBy, setSortBy] = useState('');
// //   const [sidebarOpen, setSidebarOpen] = useState(false);

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get('/api/products', {
// //         params: {
// //           search: searchTerm,
// //           category,
// //           sort: sortBy,
// //         },
// //       });
// //       setProducts(response.data.products || []);
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProducts();
// //   }, [searchTerm, category, sortBy]);

// //   return (
   
// //     <div className="min-h-screen bg-white pt-20">
// //        <Navbar />
// //       <div className="flex flex-col lg:flex-row">
// //         {/* Sidebar Filters */}
// //         <aside className={`w-full lg:w-1/4 p-6 border-r ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
// //           <h3 className="text-xl font-semibold mb-4">Filters</h3>
// //           <input
// //             type="text"
// //             placeholder="Search..."
// //             className="mb-4 w-full px-3 py-2 border rounded shadow-sm"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //           <div className="mb-4">
// //             <label className="block font-medium mb-1">Category</label>
// //             <select
// //               className="w-full px-3 py-2 border rounded"
// //               value={category}
// //               onChange={(e) => setCategory(e.target.value)}
// //             >
// //               <option value="">All</option>
// //               <option value="Silk">Silk</option>
// //               <option value="Cotton">Cotton</option>
// //             </select>
// //           </div>
// //           <div className="mb-4">
// //             <label className="block font-medium mb-1">Sort By</label>
// //             <select
// //               className="w-full px-3 py-2 border rounded"
// //               value={sortBy}
// //               onChange={(e) => setSortBy(e.target.value)}
// //             >
// //               <option value="">None</option>
// //               <option value="price_asc">Price: Low to High</option>
// //               <option value="price_desc">Price: High to Low</option>
// //               <option value="rating_desc">Top Rated</option>
// //               <option value="newest">Newest</option>
// //             </select>
// //           </div>
// //         </aside>

// //         {/* Product Grid */}
// //         <main className="flex-1 p-6">
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //             {products.length > 0 ? (
// //               products.map((product) => (
// //                 <ProductCard key={product._id} product={product} />
// //               ))
// //             ) : (
// //               <p className="text-center text-gray-600 col-span-full">No products found.</p>
// //             )}
// //           </div>
// //         </main>
// //       </div>

// //       {/* Toggle Sidebar Button (Mobile) */}
// //       <button
// //         className="lg:hidden fixed bottom-5 right-5 bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg"
// //         onClick={() => setSidebarOpen(!sidebarOpen)}
// //       >
// //         {sidebarOpen ? 'Close Filters' : 'Filters'}
// //       </button>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default ProductList;



// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import ProductCard from '../components/ProductCard';
// // import Navbar from '../components/Navbar';
// // import Footer from '@/components/Footer';

// // const ProductList = () => {
// //   const [products, setProducts] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [category, setCategory] = useState('');
// //   const [fabric, setFabric] = useState('');
// //   const [color, setColor] = useState('');
// //   const [sortBy, setSortBy] = useState('');

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axios.get('/api/products', {
// //         params: {
// //           search: searchTerm,
// //           category,
// //           fabric,
// //           color,
// //           sort: sortBy,
// //         },
// //       });
// //       setProducts(response.data.products || []);
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     const delayDebounce = setTimeout(() => {
// //       fetchProducts();
// //     }, 300); // debounce search

// //     return () => clearTimeout(delayDebounce);
// //   }, [searchTerm, category, fabric, color, sortBy]);

// //   return (
// //     <div className="min-h-screen bg-white pt-20">
// //       <Navbar />

// //       {/* Filters Row */}
// //       <div className="px-6 py-4  border-b flex flex-wrap gap-4 justify-between items-center">
// //         <input
// //           type="text"
// //           placeholder="Search by title, category, fabric..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //           className="flex-1 min-w-[180px] px-4 py-2 border rounded-md shadow-sm text-sm"
// //         />

// //         <select
// //           className="px-4 py-2 border rounded-md text-sm"
// //           value={category}
// //           onChange={(e) => setCategory(e.target.value)}
// //         >
// //           <option value="">All Categories</option>
// //           <option value="Saree">Saree</option>
// //           <option value="Kurti">Kurti</option>
// //           <option value="Dupatta">Dupatta</option>
// //           <option value="Blouse">Blouse</option>
// //         </select>

// //         <select
// //           className="px-4 py-2 border rounded-md text-sm"
// //           value={fabric}
// //           onChange={(e) => setFabric(e.target.value)}
// //         >
// //           <option value="">All Fabrics</option>
// //           <option value="Silk">Silk</option>
// //           <option value="Cotton">Cotton</option>
// //           <option value="Chiffon">Chiffon</option>
// //         </select>

// //         <select
// //           className="px-4 py-2 border rounded-md text-sm"
// //           value={color}
// //           onChange={(e) => setColor(e.target.value)}
// //         >
// //           <option value="">All Colors</option>
// //           <option value="Red">Red</option>
// //           <option value="Blue">Blue</option>
// //           <option value="Green">Green</option>
// //           <option value="Black">Black</option>
// //         </select>

// //         <select
// //           className="px-4 py-2 border rounded-md text-sm"
// //           value={sortBy}
// //           onChange={(e) => setSortBy(e.target.value)}
// //         >
// //           <option value="">Sort By</option>
// //           <option value="price_asc">Price: Low to High</option>
// //           <option value="price_desc">Price: High to Low</option>
// //           <option value="rating_desc">Top Rated</option>
// //           <option value="newest">Newest</option>
// //         </select>
// //       </div>

// //       {/* Product Grid */}
// //       <main className="p-6">
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// //           {products.length > 0 ? (
// //             products.map((product) => (
// //               <ProductCard key={product._id} product={product} />
// //             ))
// //           ) : (
// //             <p className="text-center text-gray-600 col-span-full">No products found.</p>
// //           )}
// //         </div>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default ProductList;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '@/components/Footer';
// import ProductCard from '../components/ProductCard';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [category, setCategory] = useState('');
//   const [fabric, setFabric] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [fabrics, setFabrics] = useState([]);
//   const navigate = useNavigate();

//   // 🔃 Fetch categories & fabrics from backend
//   const fetchFilters = async () => {
//     try {
//       const [catRes, fabRes] = await Promise.all([
//         axios.get('/api/products/categories'),
//         axios.get('/api/products/fabrics'),
//       ]);
//       setCategories(catRes.data.categories || []);
//       setFabrics(fabRes.data.fabrics || []);
//     } catch (err) {
//       console.error('Error fetching filters:', err);
//     }
//   };

//   // 🔍 Fetch filtered products
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('/api/products', {
//         params: {
//           search: searchTerm,
//           category,
//           fabric,
//           sort: sortBy,
//         },
//       });
//       setProducts(response.data.products || []);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   // ⏳ Debounced Search
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       fetchProducts();
//     }, 300);

//     return () => clearTimeout(delay);
//   }, [searchTerm, category, fabric, sortBy]);

//   useEffect(() => {
//     fetchFilters();
//     fetchProducts(); // Initial fetch
//   }, []);

//   return (
//     <div className="min-h-screen bg-white pt-20">
//       <Navbar />

//       {/* Filters */}
//       <div className="px-6 py-4 border-b flex flex-wrap gap-4 justify-between items-center">
//         <input
//           type="text"
//           placeholder="Search by title, category, fabric..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="flex-1 min-w-[180px] px-4 py-2 border rounded-md shadow-sm text-sm"
//         />

//         <select
//           className="px-4 py-2 border rounded-md text-sm"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">All Categories</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>

//         <select
//           className="px-4 py-2 border rounded-md text-sm"
//           value={fabric}
//           onChange={(e) => setFabric(e.target.value)}
//         >
//           <option value="">All Fabrics</option>
//           {fabrics.map((fab) => (
//             <option key={fab} value={fab}>{fab}</option>
//           ))}
//         </select>

//         <select
//           className="px-4 py-2 border rounded-md text-sm"
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//         >
//           <option value="">Sort By</option>
//           <option value="price_asc">Price: Low to High</option>
//           <option value="price_desc">Price: High to Low</option>
//           <option value="rating_desc">Top Rated</option>
//           <option value="newest">Newest</option>
//         </select>
//       </div>

//       {/* Product Grid */}
//       <main className="p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.length > 0 ? (
//             products.map((product) => (
//               <div
//                 key={product._id}
//                 onClick={() => navigate(`/products/${product._id}`)}
//                 className="cursor-pointer"
//               >
//                 <ProductCard product={product} />
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 col-span-full">No products found.</p>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ProductList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '@/utils/api';

import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '../components/ProductCard';
import { useWishlist } from "@/context/WishlistContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [fabric, setFabric] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categories, setCategories] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  //const [wishlistIds, setWishlistIds] = useState([]);
  
  const { wishlist, refreshWishlist } = useWishlist();
const wishlistIds = wishlist.map((item) => item._id);
  const navigate = useNavigate();

  // Fetch available categories and fabrics
  const fetchFilters = async () => {
    try {
      const [catRes, fabRes] = await Promise.all([
        api.get('/products/categories'),
        api.get('/products/fabrics'),
      ]);
      setCategories(catRes.data.categories || []);
      setFabrics(fabRes.data.fabrics || []);
    } catch (err) {
      console.error('Error fetching filters:', err);
    }
  };

  // Fetch filtered products
  const fetchProducts = async () => {
    try {
      let sortField = 'createdAt';
      let sortOrder = 'desc';

      if (sortBy) {
        const [field, order] = sortBy.split('_');
        sortField = field;
        sortOrder = order;
      }

      const res = await api.get('/products', {
        params: {
          search: searchTerm,
          category,
          fabric,
          sortBy: sortField,
          order: sortOrder,
        },
      });

      setProducts(res.data.products || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Fetch filters once
  useEffect(() => {
    fetchFilters();
  }, []);

  // Load wishlist ONCE
// const fetchWishlist = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const res = await axios.get("/api/wishlist", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const ids = res.data.wishlist.map((item) => item._id);
//     setWishlistIds(ids);
//   } catch (err) {
//     console.error("Failed to fetch wishlist");
//   }
// };

// useEffect(() => {
//   fetchWishlist();
// }, []);

  // Fetch products on filters change
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm, category, fabric, sortBy]);

  return (
    <div className="min-h-screen bg-white pt-20">
      <Navbar />

      {/* Filters */}
      <div className="px-6 py-4 border-b flex flex-wrap gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by title, category, fabric..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[180px] px-4 py-2 border rounded-md shadow-sm text-sm"
        />

        <select
          className="px-4 py-2 border rounded-md text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded-md text-sm"
          value={fabric}
          onChange={(e) => setFabric(e.target.value)}
        >
          <option value="">All Fabrics</option>
          {fabrics.map((fab) => (
            <option key={fab} value={fab}>
              {fab}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded-md text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating_desc">Top Rated</option>
          <option value="createdAt_desc">Newest</option>
        </select>
      </div>

      {/* Product Grid */}
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="cursor-pointer"
              >
                {/* <ProductCard product={product} /> */}
                <ProductCard
                product={product}
                isWishlisted={wishlistIds.includes(product._id)}
                onWishlistChange={refreshWishlist} // trigger re-fetch on change
                 />

              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No products found.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductList;
