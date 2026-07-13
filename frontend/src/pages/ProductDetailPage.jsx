import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heart, ShoppingBag, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart, toggleWishlist, wishlistItems } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [productId]);

  if (loading) return <div className="loading-state">Loading product details...</div>;
  if (!product) return <div className="error-state">Product not found.</div>;

  const isWishlisted = wishlistItems.some(item => item.id === product.id);
  const sizes = product.sizes ? product.sizes.split(',').map(s => s.trim()) : ['S', 'M', 'L', 'XL', 'XXL'];

  // Mock additional images for gallery
  const images = [
    product.imageUrl,
    product.imageUrl + "?v=1",
    product.imageUrl + "?v=2",
    product.imageUrl + "?v=3"
  ];

  return (
    <div className="product-detail-page container animate-fade-in">
      <div className="breadcrumb">
        Home / {product.category} / {product.subCategory} / <span>{product.name}</span>
      </div>

      <div className="product-detail-layout">
        <div className="product-gallery">
          <div className="main-image-container">
            <img src={images[activeImage]} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnail-list">
            {images.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={img} alt={`view-${index}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-details-content">
          <div className="product-header">
            <h1 className="detail-brand">{product.brand}</h1>
            <h2 className="detail-name">{product.name}</h2>
          </div>

          <div className="detail-price-section">
            <span className="detail-price">₹{product.price}</span>
            <span className="detail-original-price">MRP ₹{product.originalPrice}</span>
            <span className="detail-discount">({product.discountPercentage}% OFF)</span>
            <p className="price-tax-info">inclusive of all taxes</p>
          </div>

          <div className="size-selection-section">
            <div className="size-header">
              <h3>SELECT SIZE</h3>
              <button className="size-chart-btn">SIZE CHART {'>'}</button>
            </div>
            <div className="size-options">
              {sizes.map(size => (
                <button 
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="add-to-bag-btn-large"
              onClick={() => {
                if (!selectedSize && product.category !== 'Beauty' && product.category !== 'Furnitures') {
                  alert("Please select a size first!");
                  return;
                }
                addToCart(product);
                navigate('/bag');
              }}
            >
              <ShoppingBag size={20} /> ADD TO BAG
            </button>
            <button 
              className={`wishlist-btn-large ${isWishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
            >
              <Heart size={20} fill={isWishlisted ? 'var(--primary-color)' : 'none'} />
              {isWishlisted ? 'WISHLISTED' : 'WISHLIST'}
            </button>
          </div>

          <div className="delivery-options">
            <h3>DELIVERY OPTIONS <Truck size={20} /></h3>
            <div className="pincode-check">
              <input type="text" placeholder="Enter Pincode" />
              <button>CHECK</button>
            </div>
            <p className="delivery-info">Please enter PIN code to check delivery time & Pay on Delivery Availability</p>
          </div>

          <div className="product-features">
            <div className="feature">
              <ShieldCheck size={20} /> <span>100% Original Products</span>
            </div>
            <div className="feature">
              <RefreshCcw size={20} /> <span>Pay on delivery might be available</span>
            </div>
            <div className="feature">
              <RefreshCcw size={20} /> <span>Easy 14 days returns and exchanges</span>
            </div>
          </div>

          <div className="product-description-section">
            <h3>PRODUCT DETAILS</h3>
            <p className="description-text">
              {product.description || "No description available for this product."}
            </p>
            
            <div className="specifications">
              <h4>Specifications</h4>
              <div className="spec-grid">
                <div className="spec-item">
                  <span className="spec-label">Category</span>
                  <span className="spec-value">{product.category}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Sub-category</span>
                  <span className="spec-value">{product.subCategory}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Brand</span>
                  <span className="spec-value">{product.brand}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
