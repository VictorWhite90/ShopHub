// src/pages/ProductDetails.jsx
import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, Heart } from 'lucide-react';
import { FiArrowRight } from 'react-icons/fi';
import { productsData } from '../data/productsData';
import { ColorSelector } from '../components/ColorSelector';
import { useCart } from '../context/CartContext';

export const ProductDetails = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const badgeHighlights = [
    { title: 'Carbon Neutral Delivery', detail: 'Offset with every order' },
    { title: 'Designed for Teams', detail: 'Preferred by top tech hubs' },
    { title: '48h Fit Guarantee', detail: 'Instant exchanges worldwide' },
  ];
  const suggestedProducts = useMemo(() => {
    return productsData
      .filter((p) => p.id !== product?.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [product?.id]);

  // Reset image index when color changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedColor]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-full hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Blood Theme */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 font-semibold transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Shop
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedColor.name}-${selectedImageIndex}`}
                initial={{ opacity: 0, x: selectedColor.name.includes('Blue') ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: selectedColor.name.includes('Blue') ? 100 : -100 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={selectedColor.images[selectedImageIndex]}
                  alt={`${product.name} in ${selectedColor.name}`}
                  className="w-full h-full object-cover"
                />
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full cursor-pointer shadow-lg"
                >
                  <Heart className="w-6 h-6 text-gray-600 hover:text-red-500 transition" />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail Gallery for current color */}
            <div className="grid grid-cols-4 gap-3">
              {selectedColor.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-red-600 ring-2 ring-red-600/30 shadow-lg' 
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>

            {/* Color selector thumbnails */}
            <div className="border-t pt-6">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Available Colors</h4>
              <div className="grid grid-cols-4 gap-3">
                {product.colors.map((color) => (
                  <motion.button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedColor.name === color.name 
                        ? 'border-red-600 ring-2 ring-red-600/30 shadow-lg' 
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <img src={color.images[0]} alt={color.name} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm font-semibold text-gray-600">({product.reviews} reviews)</span>
              </div>
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120 }}
                className="mb-8 flex flex-col gap-4"
              >
                <p className="text-4xl font-black text-red-600">
                  ${product.price}
                </p>
                <div className="flex flex-wrap gap-3">
                  {badgeHighlights.map((badge, index) => (
                    <motion.div
                      key={badge.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 rounded-full bg-red-50 text-red-700 text-sm font-semibold border border-red-100 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span>{badge.title}</span>
                      <span className="text-red-400 font-normal">· {badge.detail}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 leading-relaxed text-lg"
            >
              {product.description}
            </motion.p>

            {/* Color */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-bold text-gray-900 mb-4">
                Color: <span className="text-red-600">{selectedColor.name}</span>
              </h3>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => (
                  <motion.button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? 'border-red-600 ring-4 ring-red-600/20 scale-110 shadow-lg'
                        : 'border-gray-300 hover:border-red-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </motion.div>

            {/* Size */}
            {product.sizes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-bold text-gray-900 mb-4">Size</h3>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-bold transition-all ${
                        selectedSize === size
                          ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg'
                          : 'bg-white border-2 border-gray-300 hover:border-red-600 text-gray-700'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(220, 38, 38, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product, selectedColor.name, selectedSize)}
                className="flex-1 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <ShoppingBag className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Add to Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl"
              >
                Buy Now
              </motion.button>
            </motion.div>

            {/* Specifications */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="border-t-2 border-gray-200 pt-8"
            >
              <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl">
                <h3 className="font-black text-xl text-gray-900 mb-4">Product Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2"></span>
                    <span className="text-gray-700 font-medium">Premium quality materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2"></span>
                    <span className="text-gray-700 font-medium">1-year warranty included</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2"></span>
                    <span className="text-gray-700 font-medium">Free returns within 30 days</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-red-600 rounded-full mt-2"></span>
                    <span className="text-gray-700 font-medium">Fast & secure shipping</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="border-t-2 border-gray-200 pt-10"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-red-500">Suggested</p>
                  <h3 className="text-3xl font-black text-gray-900">You may also like</h3>
                  <p className="text-gray-500">Hand-picked drops aligned with your selection.</p>
                </div>
                <Link
                  to="/shop"
                  className="hidden sm:inline-flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  View all
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {suggestedProducts.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition overflow-hidden"
                  >
                    <Link to={`/product/${item.id}`} className="block">
                      <div className="h-48 overflow-hidden">
                        <motion.img
                          src={item.colors?.[0]?.images?.[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <p className="text-xs uppercase tracking-wide text-gray-400">{item.category}</p>
                        <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{item.rating} ★</span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};