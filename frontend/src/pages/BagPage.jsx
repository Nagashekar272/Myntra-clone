import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import './BagPage.css';

const BagPage = () => {
  const { cartItems, removeFromCart, updateQuantity, setCartItems, placeOrder, user } = useContext(ShopContext);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!user) {
      alert("Please login to place an order.");
      navigate('/login');
      return;
    }
    
    if (cartItems.length > 0) {
      navigate('/payment');
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const clearBag = () => {
    if (window.confirm("Are you sure you want to remove all items from your bag?")) {
      setCartItems([]);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container container">
        <img src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp" alt="Empty Bag" className="empty-bag-img" />
        <h2>Hey, it feels so light!</h2>
        <p>There is nothing in your bag. Let's add some items.</p>
      </div>
    );
  }

  return (
    <div className="cart-page-container container">
      <div className="cart-items">
        <div className="cart-header">
          <h3>Shopping Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)} Items)</h3>
          <button className="clear-bag-btn" onClick={clearBag}>REMOVE ALL</button>
        </div>
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h4>{item.brand}</h4>
              <p>{item.name}</p>
              <div className="cart-item-price">
                <span className="current-price">₹{item.price}</span>
                <span className="original-price">₹{item.originalPrice}</span>
              </div>
              <div className="item-details-row">
                <div className="detail-box">Size: <strong>{item.selectedSize || 'M'}</strong></div>
                <div className="cart-item-quantity">
                  <span>Qty:</span>
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <strong>{item.quantity}</strong>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
              <div className="delivery-info">
                <span>Delivery by</span> <span className="delivery-date">15 May 2026</span>
              </div>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Price Details</h3>
        <div className="summary-row">
          <span>Total MRP</span>
          <span>₹{cartItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0)}</span>
        </div>
        <div className="summary-row discount">
          <span>Discount on MRP</span>
          <span>-₹{cartItems.reduce((acc, item) => acc + ((item.originalPrice - item.price) * item.quantity), 0)}</span>
        </div>
        <div className="summary-row">
          <span>Platform Fee</span>
          <span>FREE</span>
        </div>
        <div className="summary-row">
          <span>Shipping Fee</span>
          <span>FREE</span>
        </div>
        <hr />
        <div className="summary-row total">
          <span>Total Amount</span>
          <span>₹{totalAmount}</span>
        </div>
        <button className="checkout-btn" onClick={handlePlaceOrder}>PLACE ORDER</button>
      </div>
    </div>
  );
};

export default BagPage;
