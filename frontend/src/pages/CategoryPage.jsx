import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';

const CategoryPage = () => {
  const { categoryId } = useParams();

  return (
    <div className="category-page container">
      <div className="category-layout" style={{ display: 'flex', gap: '20px', paddingTop: '20px' }}>
        <FilterSidebar />
        <div className="product-listing-content" style={{ flex: 1 }}>
          <ProductGrid category={categoryId} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
