import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WelcomeModal from './components/WelcomeModal';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import BagPage from './pages/BagPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchPage from './pages/SearchPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import { ShopProvider } from './context/ShopContext';
import './App.css';

function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <WelcomeModal />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/bag" element={<BagPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin/add-product" element={<AddProductPage />} />
              <Route path="/admin/edit-product/:productId" element={<EditProductPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
