import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('myntra_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('myntra_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('myntra_addresses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('myntra_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('myntra_isAdmin') === 'true';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('myntra_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('myntra_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('myntra_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('myntra_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('myntra_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('myntra_isAdmin', isAdmin);
  }, [isAdmin]);

  const syncWithBackend = async (updatedData) => {
    if (user && user.id) {
      try {
        await axios.put(`http://localhost:8080/api/users/${user.id}`, {
          ...user,
          ...updatedData,
          cartData: JSON.stringify(cartItems),
          wishlistData: JSON.stringify(wishlistItems)
        });
      } catch (err) {
        console.error("Error syncing with backend:", err);
      }
    }
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev;
      const newItems = [...prev, { ...product, quantity: 1 }];
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQty } : item
    ));
  };


  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };


  const addAddress = (address) => {
    setAddresses(prev => {
      const newAddresses = address.isDefault 
        ? prev.map(a => ({ ...a, isDefault: false }))
        : prev;
      return [...newAddresses, { id: Date.now(), ...address }];
    });
  };

  const removeAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const updateAddress = (id, updatedAddr) => {
    setAddresses(prev => prev.map(addr => addr.id === id ? { ...addr, ...updatedAddr } : addr));
  };

  const updateUser = async (userData) => {
    const newUser = { ...user, ...userData };
    setUser(newUser);
    
    // Sync profile changes to backend immediately
    if (user && user.id) {
      try {
        await axios.put(`http://localhost:8080/api/users/${user.id}`, {
          ...newUser,
          cartData: JSON.stringify(cartItems),
          wishlistData: JSON.stringify(wishlistItems)
        });
      } catch (err) {
        console.error("Error syncing profile with backend:", err);
      }
    }
  };


  useEffect(() => {
    if (user) {
      syncWithBackend();
    }
  }, [cartItems, wishlistItems, user]);

  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', userData);
      const dbUser = response.data;
      
      setUser(dbUser);
      if (dbUser.cartData) setCartItems(JSON.parse(dbUser.cartData));
      if (dbUser.wishlistData) setWishlistItems(JSON.parse(dbUser.wishlistData));

      if (dbUser.name === 'Admin' || dbUser.mobile === '1234567890') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      // Fallback to local login if backend is down
      setUser(userData);
    }
  };

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('myntra_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('myntra_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    
    const newOrder = {
      id: `ORD${Date.now()}`,
      items: [...cartItems],
      amount: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      date: new Date().toLocaleDateString(),
      status: 'Placed'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    return newOrder.id;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    setCartItems([]);
    setWishlistItems([]);
    setOrders([]);
    localStorage.clear();
  };

  return (
    <ShopContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, setCartItems,
      wishlistItems, toggleWishlist, setWishlistItems,
      addresses, addAddress, removeAddress, updateAddress,
      user, login, logout, updateUser,
      orders, placeOrder,
      isAdmin, setIsAdmin
    }}>
      {children}
    </ShopContext.Provider>
  );
};
