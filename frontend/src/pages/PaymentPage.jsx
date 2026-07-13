import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { CreditCard, Smartphone, Landmark, CheckCircle } from 'lucide-react';
import './PaymentPage.css';

const PaymentPage = () => {
  const { cartItems, placeOrder } = useContext(ShopContext);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const orderId = placeOrder();
      if (orderId) {
        navigate(`/order-success?id=${orderId}`);
      }
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="payment-page container animate-up">
      <div className="payment-layout">
        <div className="payment-options">
          <h2 className="payment-title">Choose Payment Method</h2>
          
          <div className="payment-methods-grid">
            <div 
              className={`method-card ${selectedMethod === 'card' ? 'selected' : ''}`}
              onClick={() => setSelectedMethod('card')}
            >
              <CreditCard size={24} />
              <div className="method-info">
                <strong>Credit / Debit Card</strong>
                <p>Visa, Mastercard, RuPay</p>
              </div>
              <div className="radio-circle"></div>
            </div>

            <div 
              className={`method-card ${selectedMethod === 'upi' ? 'selected' : ''}`}
              onClick={() => setSelectedMethod('upi')}
            >
              <Smartphone size={24} />
              <div className="method-info">
                <strong>UPI (PhonePe, Google Pay)</strong>
                <p>Instant payment using UPI ID</p>
              </div>
              <div className="radio-circle"></div>
            </div>

            <div 
              className={`method-card ${selectedMethod === 'net' ? 'selected' : ''}`}
              onClick={() => setSelectedMethod('net')}
            >
              <Landmark size={24} />
              <div className="method-info">
                <strong>Net Banking</strong>
                <p>All major banks available</p>
              </div>
              <div className="radio-circle"></div>
            </div>
          </div>

          {selectedMethod === 'card' && (
            <div className="card-form animate-fade-in">
              <input type="text" placeholder="Card Number" className="payment-input" />
              <div className="input-row">
                <input type="text" placeholder="MM / YY" className="payment-input" />
                <input type="text" placeholder="CVV" className="payment-input" />
              </div>
              <input type="text" placeholder="Name on Card" className="payment-input" />
            </div>
          )}

          <button 
            className="pay-now-btn" 
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing Payment...' : `PAY ₹${totalAmount}`}
          </button>
        </div>

        <div className="order-summary-sidebar">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total Payable</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="secure-badge">
            <CheckCircle size={16} color="#03a685" />
            <span>100% Secure Payments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
