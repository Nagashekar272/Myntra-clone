import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, MapPin } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import MapModal from './MapModal';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isAdminPath = location.pathname === '/admin/add-product';
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { cartItems, wishlistItems, user, addAddress, addresses } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const response = await axios.get(`http://localhost:8080/api/products/search?q=${encodeURIComponent(searchQuery)}`);
          setSuggestions(response.data.slice(0, 8)); // Show top 8 suggestions
          setShowSuggestions(true);
        } catch (err) {
          console.error("Error fetching suggestions:", err);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleLocationSelect = (location) => {
    addAddress({
      ...location,
      isDefault: true
    });
  };

  const currentAddress = addresses.find(addr => addr.isDefault) || addresses[0];

  if (isAdminPath) {
    return (
      <nav className="navbar minimal-navbar">
        <div className="navbar-container container">
          <div className="navbar-logo">
            <Link to="/">
              <img src="/images/logo.png" alt="Myntra Logo" className="logo-img" />
            </Link>
          </div>
          <div className="admin-header-text">Admin Dashboard - Add Product</div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container container">
          <div className="navbar-left">
            <div className="navbar-logo">
              <Link to="/">
                <img src="/images/logo.png" alt="Myntra Logo" className="logo-img" />
              </Link>
            </div>
            
            <div className="navbar-links">
              <Link to="/category/Men">MEN</Link>
              <Link to="/category/Women">WOMEN</Link>
              <Link to="/category/Kids">KIDS</Link>
              <Link to="/category/Furnitures">HOME & LIVING</Link>
              <Link to="/category/Beauty">BEAUTY</Link>
            </div>
          </div>

          <div className="navbar-search">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search for products, brands and more" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch(searchQuery);
                }}
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              />

              {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown animate-fade-in">
                  {suggestions.map(item => (
                    <div 
                      key={item.id} 
                      className="suggestion-item"
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                        setShowSuggestions(false);
                        setSearchQuery('');
                      }}
                    >
                      <img src={item.imageUrl} alt="" className="suggestion-img" />
                      <div className="suggestion-info">
                        <span className="suggestion-name">{item.name}</span>
                        <span className="suggestion-brand">in {item.brand}</span>
                      </div>
                    </div>
                  ))}
                  <div className="suggestion-footer" onClick={() => handleSearch(searchQuery)}>
                    Search for "{searchQuery}"
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="navbar-actions">
            <div className="location-picker" onClick={() => setShowMap(true)}>
              <MapPin size={18} />
              <div className="location-text">
                <span className="location-label">Deliver to</span>
                <span className="location-city">{currentAddress ? (currentAddress.area || currentAddress.city) : "Select"}</span>
              </div>
            </div>

            <div className="action-item" onClick={handleProfileClick}>
              <User size={20} />
              <span>Profile</span>
            </div>
            <Link to="/wishlist" className="action-item">
              <div className="icon-container">
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="badge">{wishlistItems.length}</span>
                )}
              </div>
              <span>Wishlist</span>
            </Link>
            <Link to="/bag" className="action-item">
              <div className="icon-container">
                <ShoppingBag size={20} />
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                )}
              </div>
              <span>Bag</span>
            </Link>
          </div>
        </div>
      </nav>

      {showMap && (
        <MapModal 
          onClose={() => setShowMap(false)} 
          onSelect={handleLocationSelect} 
        />
      )}
    </>
  );
};

export default Navbar;
