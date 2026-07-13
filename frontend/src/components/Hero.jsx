import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container animate-fade-in">
      <div className="hero-banner">
        <div className="hero-content">
          <h1>India's Biggest Fashion Sale</h1>
          <p>50-80% OFF on Top Brands</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
