import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import './LoginPage.css';

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const { login } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      setStep(2);
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      // Mock successful login
      login({ mobile: mobileNumber, name: "Myntra User" });
      navigate('/profile');
    } else {
      alert("Please enter the 4-digit OTP (e.g. 1234).");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container animate-fade-in">
        <div className="login-box">
          <div className="login-banner-container">
            <img 
              src="/images/login-banner.png" 
              alt="Login Banner" 
              className="login-banner" 
            />
            <div className="banner-overlay"></div>
          </div>
          
          <div className="login-form-container">
            {step === 1 ? (
              <div className="login-step">
                <h2>Login <span className="or-text">or</span> Signup</h2>
                <form onSubmit={handleMobileSubmit}>
                  <div className="input-group">
                    <span className="country-code">+91</span>
                    <div className="divider"></div>
                    <input 
                      type="tel" 
                      placeholder="Mobile Number" 
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      maxLength="10"
                      required 
                    />
                  </div>
                  <p className="terms">
                    By continuing, I agree to the <span className="highlight">Terms of Use</span> & <span className="highlight">Privacy Policy</span>
                  </p>
                  <button type="submit" className="continue-btn">CONTINUE</button>
                </form>
                
                <div className="social-login-section">
                  <div className="social-divider">
                    <span>OR</span>
                  </div>
                  <div className="social-buttons">
                    <button className="social-btn google">
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                      Google
                    </button>
                    <button className="social-btn facebook">
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt="Facebook" />
                      Facebook
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="login-step animate-slide-in">
                <h2>Verify <span className="or-text">OTP</span></h2>
                <p className="otp-sent-msg">Sent to +91 {mobileNumber}</p>
                <form onSubmit={handleOtpSubmit}>
                  <div className="otp-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="Enter 4-digit OTP" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      maxLength="4"
                      className="otp-input"
                      required 
                      autoFocus
                    />
                  </div>
                  <button type="submit" className="continue-btn">LOG IN</button>
                  <button type="button" className="back-btn" onClick={() => setStep(1)}>
                    <span>&larr;</span> Edit Mobile Number
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        
        <div className="login-footer-info">
          <p>Get access to your Orders, Wishlist and Recommendations</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
