import React from 'react';
import './FilterSidebar.css';

const FilterSidebar = () => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>FILTERS</h3>
      </div>

      <div className="filter-group">
        <h4>CATEGORIES</h4>
        <label><input type="checkbox" /> Men</label>
        <label><input type="checkbox" /> Women</label>
        <label><input type="checkbox" /> Kids</label>
        <label><input type="checkbox" /> Home & Living</label>
        <label><input type="checkbox" /> Beauty</label>
      </div>

      <div className="filter-group">
        <h4>BRAND</h4>
        <label><input type="checkbox" /> Roadster</label>
        <label><input type="checkbox" /> HRX</label>
        <label><input type="checkbox" /> WROGN</label>
        <label><input type="checkbox" /> Biba</label>
        <label><input type="checkbox" /> Mast & Harbour</label>
      </div>

      <div className="filter-group">
        <h4>PRICE</h4>
        <label><input type="radio" name="price" /> Rs. 0 to Rs. 499</label>
        <label><input type="radio" name="price" /> Rs. 500 to Rs. 999</label>
        <label><input type="radio" name="price" /> Rs. 1000 to Rs. 1499</label>
        <label><input type="radio" name="price" /> Rs. 1500 and Above</label>
      </div>

      <div className="filter-group">
        <h4>DISCOUNT RANGE</h4>
        <label><input type="radio" name="discount" /> 10% and above</label>
        <label><input type="radio" name="discount" /> 20% and above</label>
        <label><input type="radio" name="discount" /> 30% and above</label>
        <label><input type="radio" name="discount" /> 50% and above</label>
      </div>
    </aside>
  );
};

export default FilterSidebar;
