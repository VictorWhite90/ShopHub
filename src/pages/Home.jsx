import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiTrendingUp, FiPackage, FiTruck, FiShield, FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { productsData } from '../data/productsData';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  const heroSlides = [
    {
      title: "Summer Collection 2025",
      subtitle: "Discover the Latest Trends",
      description: "Explore our curated selection of premium products",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
      cta: "Shop Now",
    },
    {
      title: "Tech Essentials",
      subtitle: "Innovation Meets Style",
      description: "Upgrade your lifestyle with cutting-edge electronics",
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200",
      cta: "Explore Tech",
    },
    {
      title: "Premium Footwear",
      subtitle: "Step Into Comfort",
      description: "Find your perfect pair from our exclusive collection",
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200",
      cta: "Browse Shoes",
    },
    {
      title: "Fashion Forward",
      subtitle: "Elevate Your Wardrobe",
      description: "Trendsetting styles for the modern individual",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200",
      cta: "Shop Fashion",
    },
    {
      title: "Home & Living",
      subtitle: "Transform Your Space",
      description: "Designer pieces for every room in your home",
      image: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1200",
      cta: "Explore Home",
    },
    {
      title: "Luxury Watches",
      subtitle: "Timeless Elegance",
      description: "Precision crafted timepieces for distinguished taste",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200",
      cta: "View Watches",
    }
  ];

  const featuredProducts = productsData.filter(product => product.featured).slice(0, 8);

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '💻' },
    { id: 'fashion', name: 'Fashion', icon: '👔' },
    { id: 'home', name: 'Home & Living', icon: '🏠' },
    { id: 'sports', name: 'Sports', icon: '⚽' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      description: "On orders over $50",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: FiShield,
      title: "Secure Payment",
      description: "100% protected",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: FiPackage,
      title: "Easy Returns",
      description: "30-day guarantee",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: FiTrendingUp,
      title: "Best Quality",
      description: "Premium products",
      color: "bg-red-100 text-red-600"
    }
  ];

  const textAnimationVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-red-900/60 via-black/50 to-red-950/60 z-10"
              animate={{
                background: [
                  "linear-gradient(to bottom right, rgba(127, 29, 29, 0.6), rgba(0, 0, 0, 0.5), rgba(69, 10, 10, 0.6))",
                  "linear-gradient(to bottom right, rgba(153, 27, 27, 0.6), rgba(0, 0, 0, 0.5), rgba(127, 29, 29, 0.6))",
                  "linear-gradient(to bottom right, rgba(127, 29, 29, 0.6), rgba(0, 0, 0, 0.5), rgba(69, 10, 10, 0.6))"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src={heroSlides[currentSlide].image}
              alt="Hero"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  className="max-w-2xl"
                >
                  <motion.p
                    variants={textAnimationVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    className="text-red-400 font-bold text-lg mb-4 tracking-wider uppercase"
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.p>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 50, rotateX: -20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
                    style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
                  >
                    {heroSlides[currentSlide].title}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-xl text-gray-200 mb-8"
                  >
                    {heroSlides[currentSlide].description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                  >
                    <motion.button
                      whileHover={{ 
                        scale: 1.08, 
                        boxShadow: "0 20px 40px rgba(220, 38, 38, 0.6)",
                        background: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ 
                        boxShadow: [
                          "0 10px 30px rgba(220, 38, 38, 0.4)",
                          "0 15px 40px rgba(220, 38, 38, 0.6)",
                          "0 10px 30px rgba(220, 38, 38, 0.4)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="group px-10 py-5 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-lg rounded-full inline-flex items-center gap-3 shadow-2xl relative overflow-hidden"
                      onClick={() => navigate('/shop')}
                    >
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">{heroSlides[currentSlide].cta}</span>
                      <FiArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-3 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-red-500 w-12 shadow-lg shadow-red-500/50' 
                  : 'bg-white/50 hover:bg-white/75 w-3'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center p-6 rounded-2xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-gray-50"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  animate={floatAnimation}
                  className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <feature.icon className="w-10 h-10" />
                </motion.div>
                <motion.h3 
                  className="text-lg font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-5xl font-black text-gray-900 mb-4"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(220, 38, 38, 0)",
                  "0 0 20px rgba(220, 38, 38, 0.3)",
                  "0 0 20px rgba(220, 38, 38, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Shop by Category
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Explore our diverse collection
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  rotateZ: 2,
                  boxShadow: "0 25px 50px rgba(220, 38, 38, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group h-52 cursor-pointer"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-800/20"
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative h-full flex flex-col items-center justify-center p-6">
                  <motion.span 
                    className="text-6xl mb-4"
                    animate={floatAnimation}
                    transition={{ delay: index * 0.2 }}
                  >
                    {category.icon}
                  </motion.span>
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {category.name}
                  </motion.h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <motion.h2 
                className="text-5xl font-black text-gray-900 mb-4"
                animate={{ 
                  backgroundImage: [
                    "linear-gradient(45deg, #1f2937, #dc2626)",
                    "linear-gradient(45deg, #dc2626, #1f2937)",
                    "linear-gradient(45deg, #1f2937, #dc2626)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ 
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                }}
              >
                Featured Products
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Handpicked favorites just for you
              </motion.p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, x: 10 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-full shadow-lg hover:shadow-red-500/50 transition-all"
              onClick={() => navigate('/shop')}
            >
              View All
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -15, scale: 1.03 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/product/${product.id}`);
                }
              }}
              role="button"
              tabIndex={0}
              >
                <div className="relative overflow-hidden h-64">
                  <motion.img
                  src={product.colors?.[0]?.images?.[0] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-800/40 to-transparent flex items-end justify-center pb-6 gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-600 shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiHeart className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FiShoppingCart className="w-6 h-6" />
                    </motion.button>
                  </motion.div>
                </div>
                <motion.div 
                  className="p-6"
                  animate={hoveredProduct === product.id ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-black text-red-600">
                    ${product.price.toFixed(2)}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(220, 38, 38, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3 relative overflow-hidden group"
              onClick={() => navigate('/shop')}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">View All Products</span>
              <FiArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-900 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255, 255, 255, 0.5)",
                  "0 0 40px rgba(255, 255, 255, 0.8)",
                  "0 0 20px rgba(255, 255, 255, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl font-black text-white mb-4"
            >
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 mb-10"
            >
              Get exclusive deals and updates delivered to your inbox
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
            >
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-xl"
              />
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-red-600 font-black rounded-full hover:bg-gray-100 transition-all shadow-2xl relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-red-100 to-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Subscribe</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;