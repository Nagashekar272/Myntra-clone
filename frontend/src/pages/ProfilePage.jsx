import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { User, Package, Heart, MapPin, Tag, Headphones, LogOut, ChevronRight } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout, addresses, removeAddress, updateAddress, updateUser, wishlistItems, toggleWishlist, addToCart, orders } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    gender: 'Male',
    dob: '',
    location: 'India'
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleEditAddress = (id, currentCity) => {
    const newCity = window.prompt("Edit City Name:", currentCity);
    if (newCity) {
      updateAddress(id, { city: newCity });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser({ 
      name: formData.name, 
      email: formData.email,
      mobile: formData.mobile,
      gender: formData.gender,
      dob: formData.dob,
      location: formData.location
    });
    setIsEditing(false);
  };

  const renderOverview = () => (
    <div className="tab-content overview-tab animate-fade-in">
      <div className="overview-header">
        <h2>Profile Details</h2>
        {!isEditing && (
          <button className="edit-details-btn" onClick={() => setIsEditing(true)}>EDIT DETAILS</button>
        )}
      </div>
      
      {isEditing ? (
        <form className="edit-profile-form animate-fade-in" onSubmit={handleSaveProfile}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Email ID</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>CANCEL</button>
            <button type="submit" className="save-btn">SAVE DETAILS</button>
          </div>
        </form>
      ) : (
        <div className="details-card">
          <div className="detail-row">
            <div className="detail-field">
              <label>Full Name</label>
              <p>{user?.name || 'Myntra User'}</p>
            </div>
            <div className="detail-field">
              <label>Mobile Number</label>
              <p>{user?.mobile || '8987562595'}</p>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-field">
              <label>Email ID</label>
              <p>{user?.email || 'Not Added'}</p>
            </div>
            <div className="detail-field">
              <label>Gender</label>
              <p>{user?.gender || 'Not Added'}</p>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-field">
              <label>Date of Birth</label>
              <p>{user?.dob || 'Not Added'}</p>
            </div>
            <div className="detail-field">
              <label>Location</label>
              <p>{user?.location || 'India'}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  const renderAddresses = () => (
    <div className="tab-content addresses-tab animate-fade-in">
      <div className="addresses-header">
        <h3>Saved Addresses</h3>
      </div>
      <div className="addresses-list">
        {addresses.map(addr => (
          <div key={addr.id} className="address-card">
            <div className="address-badge">
              <span className="type-tag">{addr.type}</span>
              {addr.isDefault && <span className="default-tag">DEFAULT</span>}
            </div>
            <div className="address-details">
              <h4>{user?.name || 'Myntra User'}</h4>
              <p>{addr.area || addr.city}, India</p>
              <p>Mobile: {user?.mobile || '+91 8954489445'}</p>
              {addr.coordinates && <p className="coords">Coordinates: {addr.coordinates}</p>}
            </div>
            <div className="address-actions">
              <button onClick={() => handleEditAddress(addr.id, addr.city)}>EDIT</button>
              <button onClick={() => removeAddress(addr.id)}>REMOVE</button>
            </div>
          </div>
        ))}
        {addresses.length === 0 && (
          <div className="empty-state">
            <p>No addresses saved yet. Use the map in the navbar to add one!</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="tab-content orders-tab animate-fade-in">
      <div className="orders-header">
        <h3>Your Orders</h3>
      </div>
      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-info-top">
                <span className="order-id">ID: {order.id}</span>
                <span className="order-date">{order.date}</span>
              </div>
              <div className="order-items-summary">
                {order.items.map(item => (
                  <div key={item.id} className="mini-item">
                    <img src={item.imageUrl} alt={item.name} />
                    <div className="mini-item-details">
                      <p className="mini-name">{item.name}</p>
                      <p className="mini-qty">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-tracking animate-fade-in">
                <div className="tracking-line">
                  <div className="line-progress" style={{ width: '25%' }}></div>
                </div>
                <div className="tracking-steps">
                  <div className="step active">
                    <div className="dot"></div>
                    <span>Placed</span>
                  </div>
                  <div className="step">
                    <div className="dot"></div>
                    <span>Shipped</span>
                  </div>
                  <div className="step">
                    <div className="dot"></div>
                    <span>On the Way</span>
                  </div>
                  <div className="step">
                    <div className="dot"></div>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
              <div className="order-footer">
                <span className="order-total">Total: ₹{order.amount}</span>
                <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Package size={48} />
            <p>You haven't placed any orders yet.</p>
            <button className="shop-now-btn" onClick={() => navigate('/')}>SHOP NOW</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="tab-content wishlist-tab animate-fade-in">
      <div className="wishlist-header">
        <h3>My Wishlist ({wishlistItems.length})</h3>
      </div>
      <div className="wishlist-grid">
        {wishlistItems.length > 0 ? (
          wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item-card">
              <div className="wishlist-img-container">
                <img src={item.imageUrl} alt={item.name} />
                <button className="remove-wishlist-btn" onClick={() => toggleWishlist(item)}>✕</button>
              </div>
              <div className="wishlist-info">
                <h4>{item.brand}</h4>
                <p>{item.name}</p>
                <div className="wishlist-price">
                  <span className="curr-price">₹{item.price}</span>
                  {item.originalPrice && <span className="orig-price">₹{item.originalPrice}</span>}
                </div>
                <button className="move-to-bag-btn" onClick={() => addToCart(item)}>MOVE TO BAG</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Heart size={48} />
            <p>Your wishlist is empty.</p>
            <button className="shop-now-btn" onClick={() => navigate('/')}>ADD ITEMS</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return renderOverview();
      case 'Orders':
        return renderOrders();
      case 'Wishlist':
        return renderWishlist();
      case 'Addresses':
        return renderAddresses();
      case 'Coupons':
        return (
          <div className="tab-content animate-fade-in">
            <h2>Available Coupons</h2>
            <div className="coupons-grid">
              <div className="coupon-card">
                <div className="coupon-value">₹200 OFF</div>
                <div className="coupon-info">
                  <strong>MYNTRA200</strong>
                  <p>On orders above ₹999</p>
                  <p className="expiry">Expires on: 31st May 2026</p>
                </div>
                <button className="apply-btn">COPY CODE</button>
              </div>
              <div className="coupon-card">
                <div className="coupon-value">15% OFF</div>
                <div className="coupon-info">
                  <strong>FIRSTBUY15</strong>
                  <p>On your first purchase</p>
                  <p className="expiry">Expires on: 15th June 2026</p>
                </div>
                <button className="apply-btn">COPY CODE</button>
              </div>
            </div>
          </div>
        );
      case 'Support':
        return (
          <div className="tab-content animate-fade-in">
            <h2>Help & Support</h2>
            <div className="support-list">
              <div className="support-item">
                <div className="support-icon"><Package size={20} /></div>
                <div className="support-text">
                  <strong>Order Related Queries</strong>
                  <p>Track, return or exchange products</p>
                </div>
                <ChevronRight size={20} color="#d4d5d9" />
              </div>
              <div className="support-item">
                <div className="support-icon"><Tag size={20} /></div>
                <div className="support-text">
                  <strong>Promotions & Coupons</strong>
                  <p>Issues with applying coupons or offers</p>
                </div>
                <ChevronRight size={20} color="#d4d5d9" />
              </div>
              <div className="support-item">
                <div className="support-icon"><Headphones size={20} /></div>
                <div className="support-text">
                  <strong>Contact Us</strong>
                  <p>Talk to our customer care executive</p>
                </div>
                <ChevronRight size={20} color="#d4d5d9" />
              </div>
            </div>
          </div>
        );
      default:
        return <div>Section coming soon...</div>;
    }
  };

  const menuItems = [
    { name: 'Overview', icon: <User size={18} /> },
    { name: 'Orders', icon: <Package size={18} /> },
    { name: 'Wishlist', icon: <Heart size={18} /> },
    { name: 'Addresses', icon: <MapPin size={18} /> },
    { name: 'Coupons', icon: <Tag size={18} /> },
    { name: 'Support', icon: <Headphones size={18} /> },
  ];

  return (
    <div className="profile-container container">
      <div className="profile-sidebar">
        <div className="profile-user-info">
          <div className="avatar-circle">
            {user.name.charAt(0)}
          </div>
          <div className="user-meta">
            <h4>{user.name}</h4>
            <p>+91 {user.mobile}</p>
          </div>
        </div>
        
        <div className="profile-nav">
          {menuItems.map(item => (
            <div 
              key={item.name} 
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <button className="logout-button" onClick={logout}>
          <LogOut size={18} />
          <span>LOGOUT</span>
        </button>
      </div>

      <div className="profile-main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
