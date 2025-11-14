import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiSearch, FiMenu, FiX, FiUser, FiHome, FiShoppingBag, FiInfo, FiMail } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { getCartCount, wishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: FiHome },
    { name: 'Shop', path: '/shop', icon: FiShoppingBag },
    { name: 'About', path: '/about', icon: FiInfo },
    { name: 'Contact', path: '/contact', icon: FiMail }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group relative z-[102]">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center mr-2 shadow-lg"
                  animate={{
                    boxShadow: [
                      "0 4px 15px rgba(220, 38, 38, 0.3)",
                      "0 4px 25px rgba(220, 38, 38, 0.5)",
                      "0 4px 15px rgba(220, 38, 38, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-white font-bold text-xl">S</span>
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  ShopHub
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-gray-700 hover:text-red-600 font-semibold transition-colors group"
                >
                  {link.name}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-600 to-red-800"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-3 md:space-x-4 relative z-[102]">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden sm:block p-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <FiSearch className="w-5 h-5" />
              </motion.button>

              {/* Wishlist */}
              <Link to="/wishlist">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2 text-gray-700 hover:text-red-500 transition-colors"
                >
                  <motion.div
                    animate={{ 
                      scale: wishlist.length > 0 ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiHeart className="w-5 h-5" />
                  </motion.div>
                  {wishlist.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
                    >
                      {wishlist.length}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {getCartCount() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-red-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg"
                    >
                      {getCartCount()}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* User Account */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="hidden sm:block p-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <FiUser className="w-5 h-5" />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-red-600 transition-colors relative z-[102]"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiX className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiMenu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <form onSubmit={handleSearch} className="pb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-3 pl-10 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      autoFocus
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[98] md:hidden"
            />
            
            {/* Slide-in Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[99] md:hidden overflow-y-auto shadow-2xl"
            >
              {/* Menu Header with gradient */}
              <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-800 p-6 shadow-lg z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <span className="text-red-600 font-bold text-xl">S</span>
                    </div>
                    <span className="text-2xl font-bold text-white">Menu</span>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all"
                      >
                        <link.icon className="w-5 h-5" />
                      </motion.div>
                      <span className="text-lg font-semibold">{link.name}</span>
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="ml-auto"
                      >
                        <FiShoppingBag className="w-5 h-5" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="px-6 pb-6"
              >
                <div className="border-t-2 border-gray-100 pt-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Search Products
                  </h3>
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-4 py-3 pl-11 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      />
                      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </form>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="px-6 pb-6"
              >
                <div className="border-t-2 border-gray-100 pt-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl hover:shadow-lg transition-all group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg transition-all"
                      >
                        <FiHeart className="w-6 h-6 text-red-500" />
                      </motion.div>
                      <span className="text-sm font-semibold text-gray-700">Wishlist</span>
                      {wishlist.length > 0 && (
                        <span className="text-xs text-red-600 font-bold mt-1">
                          {wishlist.length} items
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/cart"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl hover:shadow-lg transition-all group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-md group-hover:shadow-lg transition-all"
                      >
                        <FiShoppingCart className="w-6 h-6 text-red-600" />
                      </motion.div>
                      <span className="text-sm font-semibold text-gray-700">Cart</span>
                      {getCartCount() > 0 && (
                        <span className="text-xs text-red-600 font-bold mt-1">
                          {getCartCount()} items
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* User Profile Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="px-6 pb-8"
              >
                <div className="border-t-2 border-gray-100 pt-6">
                  <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all group">
                    <FiUser className="w-5 h-5" />
                    <span>Sign In / Register</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;