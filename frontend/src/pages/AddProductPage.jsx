import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, AlertCircle } from 'lucide-react';
import './AddProductPage.css';

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    imageUrl: '',
    category: 'Men',
    sizes: 'S, M, L, XL',
    description: '',
    discountPercentage: '0'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Calculate discount percentage if original price is provided
      const price = parseFloat(formData.price);
      const originalPrice = parseFloat(formData.originalPrice);
      let discount = formData.discountPercentage;
      
      if (originalPrice > price) {
        discount = Math.round(((originalPrice - price) / originalPrice) * 100);
      }

      const productToSave = {
        ...formData,
        price: price,
        originalPrice: originalPrice,
        discountPercentage: discount
      };

      const response = await axios.post('http://localhost:8080/api/products', productToSave);
      setMessage({ type: 'success', text: 'Product added successfully!' });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage({ type: 'error', text: 'Failed to add product. Please check the backend.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page container animate-up">
      <div className="admin-form-card">
        <div className="form-header">
          <h1>Add New Product</h1>
          <p>Fill in the details to list a new item in the store.</p>
        </div>

        {message && (
          <div className={`status-message ${message.type}`}>
            <AlertCircle size={20} />
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Slim Fit Cotton Shirt" required />
              </div>
              <div className="form-group">
                <label>Brand Name</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="e.g. Roadster" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="499" required />
                </div>
                <div className="form-group">
                  <label>Original Price (₹)</label>
                  <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} placeholder="999" required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Media & Inventory</h3>
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://image-link.com/photo.jpg" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Available Sizes</label>
                  <div className="custom-multiselect">
                    <div className="selected-values" onClick={() => setShowSizeDropdown(!showSizeDropdown)}>
                      {formData.sizes || "Select Sizes"}
                    </div>
                    {showSizeDropdown && (
                      <div className="multiselect-options">
                        {['S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map(size => (
                          <label key={size} className="option-label">
                            <input 
                              type="checkbox" 
                              checked={formData.sizes.split(', ').includes(size)}
                              onChange={(e) => {
                                let currentSizes = formData.sizes ? formData.sizes.split(', ') : [];
                                if (e.target.checked) {
                                  currentSizes.push(size);
                                } else {
                                  currentSizes = currentSizes.filter(s => s !== size);
                                }
                                setFormData(prev => ({ ...prev, sizes: currentSizes.join(', ') }));
                              }}
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Product Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter details about the material, fit, etc." rows="4"></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Adding...' : <><Plus size={20} /> Add Product</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
