// src/pages/CustomizationForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CustomizationForm = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    size: '',
    color: '',
    occasion: '',
    notes: '',
    image: null,
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    submissionData.append('productId', productId);
    submissionData.append('size', formData.size);
    submissionData.append('color', formData.color);
    submissionData.append('occasion', formData.occasion);
    submissionData.append('notes', formData.notes);
    if (formData.image) {
      submissionData.append('image', formData.image);
    }

    try {
      await axios.post('/api/customizations', submissionData);
      alert('Customization request submitted!');
    } catch (error) {
      console.error('Error submitting customization:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>Customize {product.title}</h2>
      <img src={product.imageUrl} alt={product.title} />
      <form onSubmit={handleSubmit}>
        <label>
          Size:
          <input type="text" name="size" value={formData.size} onChange={handleChange} required />
        </label>
        <label>
          Color:
          <input type="text" name="color" value={formData.color} onChange={handleChange} required />
        </label>
        <label>
          Occasion:
          <input type="text" name="occasion" value={formData.occasion} onChange={handleChange} />
        </label>
        <label>
          Notes:
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </label>
        <label>
          Upload Image:
          <input type="file" name="image" onChange={handleChange} />
        </label>
        <button type="submit">Submit Customization</button>
      </form>
    </div>
  );
};

export default CustomizationForm;
