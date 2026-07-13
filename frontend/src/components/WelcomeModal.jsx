import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, User, Mail, Calendar, VenusAndMars, Baby } from 'lucide-react';
import './WelcomeModal.css';

// Import assets
import welcomeBanner from '../assets/welcome-banner-stunning.png';
import menSelect from '../assets/men-select.png';
import womenSelect from '../assets/women-select.png';

const WelcomeModal = () => {
  const { user, updateUser } = useContext(ShopContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    gender: '',
    dob: ''
  });

  useEffect(() => {
    // Show modal if user is logged in but missing key details
    if (user && (!user.email || user.email === 'Not Added' || !user.gender || user.gender === 'Not Added')) {
      const hasDismissed = sessionStorage.getItem('welcome_modal_dismissed');
      if (!hasDismissed) {
        setIsOpen(true);
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ ...formData, interests: selectedCategories });
    setIsOpen(false);
    sessionStorage.setItem('welcome_modal_dismissed', 'true');
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('welcome_modal_dismissed', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="welcome-modal animate-pop-in">
        <button className="close-btn" onClick={handleClose}>
          <X size={20} />
        </button>
        
        <div className="modal-left">
          <div className="banner-image-container">
            <img src={welcomeBanner} alt="Welcome" className="main-banner-img" />
          </div>
          <div className="welcome-text">
            <h3>Elevate Your Style</h3>
            <p>Tell us a bit about yourself to get personalized fashion recommendations.</p>
          </div>
        </div>

        <div className="modal-right">
          <div className="form-scroll-container">
            <div className="form-header">
              <h2>Complete Your Profile</h2>
              <p className="subtitle">Just a few details to get you started</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-input-group">
                <label htmlFor="name"><User size={16} /> Full Name</label>
                <input 
                  id="name"
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Enter your name"
                  required 
                />
              </div>

              <div className="modal-input-group">
                <label htmlFor="email"><Mail size={16} /> Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="example@mail.com"
                  required 
                />
              </div>

              <div className="modal-row">
                <div className="modal-input-group">
                  <label htmlFor="gender"><VenusAndMars size={16} /> Gender</label>
                  <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="modal-input-group">
                  <label htmlFor="dob"><Calendar size={16} /> Date of Birth</label>
                  <input 
                    id="dob"
                    type="date" 
                    name="dob" 
                    value={formData.dob} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              </div>

              <div className="category-selection-section">
                <label className="section-label">I'm shopping for:</label>
                <div className="category-grid">
                  <div 
                    className={`category-card ${selectedCategories.includes('Men') ? 'selected' : ''}`}
                    onClick={() => toggleCategory('Men')}
                  >
                    <div className="img-wrapper">
                      <img src={menSelect} alt="Men" />
                    </div>
                    <span>Men</span>
                  </div>
                  <div 
                    className={`category-card ${selectedCategories.includes('Women') ? 'selected' : ''}`}
                    onClick={() => toggleCategory('Women')}
                  >
                    <div className="img-wrapper">
                      <img src={womenSelect} alt="Women" />
                    </div>
                    <span>Women</span>
                  </div>
                  <div 
                    className={`category-card ${selectedCategories.includes('Kids') ? 'selected' : ''}`}
                    onClick={() => toggleCategory('Kids')}
                  >
                    <div className="kids-placeholder">
                      <Baby size={32} />
                    </div>
                    <span>Kids</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-profile-btn">START SHOPPING</button>
                <p className="skip-text" onClick={handleClose}>Skip for now</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
