import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Heart, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import './ProductGrid.css';

const ProductGrid = ({ category, limit, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const { addToCart, toggleWishlist, wishlistItems, isAdmin } = useContext(ShopContext);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:8080/api/products';
      if (searchQuery) {
        url = `http://localhost:8080/api/products/search?q=${encodeURIComponent(searchQuery)}`;
      } else if (category) {
        url = `http://localhost:8080/api/products/category/${category}`;
      }
      
      const response = await axios.get(url);
      let data = response.data;
      if (limit) {
        data = data.slice(0, limit);
      }
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Is the backend running?");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, searchQuery]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8080/api/products/${id}`);
        fetchProducts(); // Refresh list
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product.");
      }
    }
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/admin/edit-product/${id}`);
  };

  const isWishlisted = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  if (loading) return <div className="loading-state">Loading amazing products...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (products.length === 0) return <div className="loading-state">No products found for this category.</div>;

  return (
    <section className="product-section container animate-fade-in">
      <h2 className="section-title">{category ? `${category}'s Fashion` : 'Deals of the Day'}</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
            <div className="product-image-container">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              
              <button 
                className={`wishlist-btn ${isWishlisted(product.id) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
              >
                <Heart fill={isWishlisted(product.id) ? 'var(--primary-color)' : 'none'} color={isWishlisted(product.id) ? 'var(--primary-color)' : '#535766'} />
              </button>

              {isAdmin && (
                <div className="admin-actions">
                  <button className="admin-btn edit" onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(e, product.id);
                  }}>
                    <Edit size={16} />
                  </button>
                  <button className="admin-btn delete" onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(e, product.id);
                  }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              <div className="product-overlay">
                <div className="card-sizes">
                  Sizes: {product.sizes || 'S, M, L, XL'}
                </div>
                <button 
                  className="add-to-bag-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Bag
                </button>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-brand">{product.brand}</h3>
              <p className="product-name">{product.name}</p>
              <div className="product-price">
                <span className="current-price">₹{product.price}</span>
                <span className="original-price">₹{product.originalPrice}</span>
                <span className="discount">({product.discountPercentage}% OFF)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
