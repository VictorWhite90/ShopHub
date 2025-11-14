import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    const defaultColor = product.colors[0];
    const defaultSize = product.sizes[0];
    addToCart(product, defaultColor, defaultSize, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          <motion.img
            src={product.colors[0].images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickAdd}
              className="p-3 bg-white rounded-full shadow-lg hover:bg-teal-600 hover:text-white transition-colors"
              title="Quick Add to Cart"
            >
              <FiShoppingCart className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white rounded-full shadow-lg"
              title="Quick View"
            >
              <FiEye className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all ${
              inWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
              Featured
            </div>
          )}

          {/* Color Dots */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            {product.colors.slice(0, 4).map((color, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                className="w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-6 h-6 rounded-full bg-gray-800 text-white text-xs flex items-center justify-center border-2 border-white shadow-md">
                +{product.colors.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-teal-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${product.price}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleQuickAdd}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;