import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { motion, AnimatePresence } from 'framer-motion';
import { FiGrid, FiList, FiHeart, FiShoppingCart, FiStar, FiArrowRight } from 'react-icons/fi';
import { productsData } from '../data/productsData';

const categoryIcons = {
  shoes: '👟',
  clothes: '👕',
  accessories: '🎒',
  electronics: '💻',
};

const heroSlides = [
  {
    tag: 'Tech Capsule · Limited',
    title: 'Modular layers engineered for hybrid teams',
    description: 'Architected to move from design reviews to red-eye flights without missing a beat.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600',
    category: 'clothes',
    cta: 'Shop Capsule',
  },
  {
    tag: 'Studio Essentials',
    title: 'Soft-touch footwear crafted for all-day sprints',
    description: 'A rotation of breathable silhouettes tuned for founders and product squads.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600',
    category: 'shoes',
    cta: 'Browse Footwear',
  },
  {
    tag: 'Desk to Drift',
    title: 'Objects that elevate remote work rituals',
    description: 'Sculpted accessories, tactile sound, and motion-friendly carry systems.',
    image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1600',
    category: 'electronics',
    cta: 'Discover Objects',
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const categories = useMemo(() => {
    const counts = productsData.reduce((acc, product) => {
      const categoryKey = product.category;
      acc[categoryKey] = (acc[categoryKey] || 0) + 1;
      return acc;
    }, {});

    return [
      { id: 'all', name: 'All Products', icon: '🛍️', count: productsData.length },
      ...Object.entries(counts).map(([key, count]) => ({
        id: key,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        icon: categoryIcons[key] || '🛒',
        count,
      })),
    ];
  }, []);
  const activeCategoryName = selectedCategory === 'all'
    ? 'All Products'
    : categories.find((cat) => cat.id === selectedCategory)?.name || 'Products';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = productsData;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Price filter
    if (priceRange === 'Under $50') {
      filtered = filtered.filter(p => p.price < 50);
    } else if (priceRange === '$50-$100') {
      filtered = filtered.filter(p => p.price >= 50 && p.price <= 100);
    } else if (priceRange === '$100-$200') {
      filtered = filtered.filter(p => p.price > 100 && p.price <= 200);
    } else if (priceRange === 'Over $200') {
      filtered = filtered.filter(p => p.price > 200);
    }

    // Sorting
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroSlides[currentSlide].title}
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-black/70 to-slate-900/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <motion.span
              key={heroSlides[currentSlide].tag}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 text-xs tracking-[0.3em]"
            >
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              {heroSlides[currentSlide].tag}
            </motion.span>
            <motion.h1
              key={heroSlides[currentSlide].title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            <motion.p
              key={heroSlides[currentSlide].description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-white/85 max-w-2xl mb-10"
            >
              {heroSlides[currentSlide].description}
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(248,113,113,0.35)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(heroSlides[currentSlide].category || 'all')}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-full shadow-2xl"
              >
                {heroSlides[currentSlide].cta}
              </motion.button>
              <motion.a
                href="#products-grid"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/40 rounded-full text-white font-semibold backdrop-blur hover:bg-white/10 transition"
              >
                Browse Catalog
              </motion.a>
            </div>
          </div>
          <div className="mt-10 flex gap-3">
            {heroSlides.map((_, index) => (
              <motion.button
                key={`indicator-${index}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${currentSlide === index ? 'w-16 bg-white' : 'w-6 bg-white/40 hover:bg-white/70'}`}
                whileHover={{ scale: 1.1 }}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.3em] text-white/70"
          >
            Discover by category
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black mb-3">
              {activeCategoryName}
            </h1>
            <p className="text-xl text-red-100">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available right now
            </p>
          </motion.div>
        </div>
      </div>

      <div id="products-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 overflow-x-auto"
        >
          <div className="flex gap-3 pb-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span>{category.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  selectedCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Filters and View Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-wrap gap-3">
            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 font-semibold text-gray-700"
            >
              <option value="All">All Prices</option>
              <option value="Under $50">Under $50</option>
              <option value="$50-$100">$50 - $100</option>
              <option value="$100-$200">$100 - $200</option>
              <option value="Over $200">Over $200</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 font-semibold text-gray-700"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <FiGrid className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <FiList className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'flex flex-col gap-4'
              }
            >
              {filteredProducts.map((product, index) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    onHoverStart={() => setHoveredProduct(product.id)}
                    onHoverEnd={() => setHoveredProduct(null)}
                    className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer group ${
                      viewMode === 'list' ? 'flex flex-row' : ''
                    }`}
                  >
                    {/* Product Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 h-48' : 'h-64'
                    }`}>
                      <motion.img
                        src={product.colors?.[0]?.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Overlay Actions */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-800/50 to-transparent flex items-end justify-center pb-4 gap-3"
                      >
                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.preventDefault()}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-600 shadow-lg"
                        >
                          <FiHeart className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.preventDefault()}
                          className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"
                        >
                          <FiShoppingCart className="w-5 h-5" />
                        </motion.button>
                      </motion.div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-red-600">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className={`p-5 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                      <div>
                        <div className="flex items-center gap-1 mb-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                          <span>{product.category}</span>
                          <span className="text-gray-400">•</span>
                          <span className="flex items-center gap-1">
                            <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            {product.rating}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <p className="text-sm text-gray-500 mb-3">
                          {product.reviews} reviews
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-black text-red-600">
                          ${product.price.toFixed(2)}
                        </p>
                        
                        {viewMode === 'list' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.preventDefault()}
                            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-full flex items-center gap-2"
                          >
                            View Details
                            <FiArrowRight className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange('All');
                }}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-full"
              >
                Reset Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Shop;