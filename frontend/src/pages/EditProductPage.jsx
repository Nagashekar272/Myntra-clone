import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Package, Image as ImageIcon, Tag, DollarSign, Percent, Award, Save } from 'lucide-react';
import './AddProductPage.css'; // Reusing the same styles

const EditProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: '',
    category: 'Men',
    subCategory: '',
    imageUrl: '',
    price: '',
    originalPrice: '',
    discountPercentage: '',
    brand: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products`);
        const found = response.data.find(p => p.id.toString() === productId);
        if (found) {
          setProduct(found);
        } else {
          alert("Product not found");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const productToSave = {
        ...product,
        price: parseFloat(product.price),
        originalPrice: parseFloat(product.originalPrice),
        discountPercentage: parseInt(product.discountPercentage)
      };
      
      await axios.put(`http://localhost:8080/api/products/${productId}`, productToSave);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-state">Loading product details...</div>;

  return (
    <div className="add-product-container container animate-fade-in">
      <div className="add-product-card">
        <div className="add-product-header">
          <Package size={32} color="var(--primary-color)" />
          <h2>Edit Product</h2>
          <p>Update the details for <strong>{product.name}</strong></p>
        </div>

        {success ? (
          <div className="success-message">
            <Award size={48} color="#03a685" />
            <h3>Product Updated Successfully!</h3>
            <p>Redirecting you back...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="add-product-form">
            <div className="form-grid">
              <div className="form-group">
                <label><Tag size={16} /> Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={product.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label><Award size={16} /> Brand</label>
                <input 
                  type="text" 
                  name="brand" 
                  value={product.brand} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={product.category} onChange={handleChange}>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Furnitures">Home & Living</option>
                  <option value="Beauty">Beauty</option>
                </select>
              </div>

              <div className="form-group">
                <label>Sub Category</label>
                <input 
                  type="text" 
                  name="subCategory" 
                  value={product.subCategory} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label><DollarSign size={16} /> Discounted Price (₹)</label>
                <input 
                  type="number" 
                  name="price" 
                  value={product.price} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label><DollarSign size={16} /> Original Price (₹)</label>
                <input 
                  type="number" 
                  name="originalPrice" 
                  value={product.originalPrice} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label><Percent size={16} /> Discount (%)</label>
                <input 
                  type="number" 
                  name="discountPercentage" 
                  value={product.discountPercentage} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group full-width">
                <label><ImageIcon size={16} /> Image URL</label>
                <input 
                  type="url" 
                  name="imageUrl" 
                  value={product.imageUrl} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="submit-btn" disabled={saving}>
                {saving ? 'SAVING...' : 'UPDATE PRODUCT'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;
