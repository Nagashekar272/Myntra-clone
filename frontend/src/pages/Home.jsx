import React from 'react';
import ProductGrid from '../components/ProductGrid';
import HomeSlider from '../components/HomeSlider';

const Home = () => {
  return (
    <div className="home-page animate-fade-in">
      <HomeSlider />
      
      <div className="home-content container">
        <div className="home-sections" style={{ marginTop: '40px' }}>
          <ProductGrid limit={30} />
        </div>
      </div>
    </div>
  );
};

export default Home;
