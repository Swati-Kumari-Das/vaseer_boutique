import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products', {
        params: {
          search: searchTerm,
          category,
          sort: sortBy,
        },
      });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category, sortBy]);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Filters */}
        <aside className={`w-full lg:w-1/4 p-6 border-r ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <h3 className="text-xl font-semibold mb-4">Filters</h3>
          <input
            type="text"
            placeholder="Search..."
            className="mb-4 w-full px-3 py-2 border rounded shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="mb-4">
            <label className="block font-medium mb-1">Category</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Silk">Silk</option>
              <option value="Cotton">Cotton</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Sort By</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">None</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No products found.</p>
            )}
          </div>
        </main>
      </div>

      {/* Toggle Sidebar Button (Mobile) */}
      <button
        className="lg:hidden fixed bottom-5 right-5 bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? 'Close Filters' : 'Filters'}
      </button>
    </div>
  );
};

export default ProductList;
