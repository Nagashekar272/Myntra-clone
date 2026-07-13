import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, ShoppingBag } from 'lucide-react';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlistItems, toggleWishlist, addToCart } = useContext(ShopContext);

  const handleMoveToBag = (product) => {
    addToCart(product);
    toggleWishlist(product);
  };

  return (
    <div className="wishlist-container container animate-fade-in">
      <div className="wishlist-header">
        <h2>My Wishlist <span>({wishlistItems.length} Items)</span></h2>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              <div className="wishlist-img-container">
                <img src={item.imageUrl} alt={item.name} className="wishlist-img" />
                <button className="remove-btn" onClick={() => toggleWishlist(item)}>
                  <X size={18} />
                </button>
              </div>
              <div className="wishlist-info">
                <p className="wishlist-brand">{item.brand}</p>
                <p className="wishlist-name">{item.name}</p>
                <div className="wishlist-price">
                  <span className="current-price">₹{item.price}</span>
                  <span className="original-price">₹{item.originalPrice}</span>
                  <span className="discount">({item.discountPercentage}% OFF)</span>
                </div>
              </div>
              <button className="move-to-bag-btn" onClick={() => handleMoveToBag(item)}>
                MOVE TO BAG
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <img src="https://constant.myntassets.com/pwa/assets/img/empty-wishlist.png" alt="Empty Wishlist" />
          <h3>YOUR WISHLIST IS EMPTY</h3>
          <p>Add items that you like to your wishlist. Review them anytime and easily move them to the bag.</p>
          <button className="shop-now-btn" onClick={() => window.location.href = '/'}>CONTINUE SHOPPING</button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
