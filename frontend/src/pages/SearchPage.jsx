import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  return (
    <div className="search-page container animate-fade-in" style={{ paddingTop: '40px' }}>
      <div className="search-header">
        <h2 style={{ fontSize: '18px', color: '#535766', marginBottom: '20px' }}>
          Search Results for: <span style={{ color: '#282c3f', fontWeight: '700' }}>"{query}"</span>
        </h2>
      </div>
      <ProductGrid searchQuery={query} />
    </div>
  );
};

export default SearchPage;
