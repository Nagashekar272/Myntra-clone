import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Package, ArrowRight, Home } from 'lucide-react';
import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="success-page animate-scale">
      <div className="success-card">
        <div className="success-icon-wrapper">
          <Check size={48} color="white" />
        </div>
        
        <h1>Order Placed Successfully!</h1>
        <p className="order-number">Order ID: <strong>{orderId}</strong></p>
        
        <div className="success-message">
          <Package size={20} />
          <span>Your items are being packed and will be shipped soon.</span>
        </div>

        <div className="success-actions">
          <button className="track-order-btn" onClick={() => navigate('/profile?tab=Orders')}>
            TRACK ORDER <ArrowRight size={18} />
          </button>
          <button className="back-home-btn" onClick={() => navigate('/')}>
            <Home size={18} /> CONTINUE SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
