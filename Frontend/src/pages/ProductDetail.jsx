// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await axios.post(`/api/user/wishlist/${id}`);
      alert('Product added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const handlePlaceOrder = () => {
    // Implement order placement logic
    alert('Order placed successfully!');
  };

  const handleCustomize = () => {
    navigate(`/customize/${id}`);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <img src={product.imageUrl} alt={product.title} />
      <h2>{product.title}</h2>
      <p>Price: ₹{product.price}</p>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>
      <p>Rating: {product.averageRating} ⭐</p>
      <label>
        Select Size:
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="">Select</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          {/* Add more sizes as needed */}
        </select>
      </label>
      <button onClick={handleAddToWishlist}>Add to Wishlist</button>
      <button onClick={handlePlaceOrder}>Place Order</button>
      {product.customizable && <button onClick={handleCustomize}>Customize</button>}
    </div>
  );
};

export default ProductDetail;
