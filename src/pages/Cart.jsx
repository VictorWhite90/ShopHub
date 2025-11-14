import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiTrash2, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-semibold"
          >
            <FiArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
          <div>
            <h1 className="text-4xl font-black mb-2">Your Cart</h1>
            <p className="text-red-100">
              {cart.length > 0
                ? `${cart.length} ${cart.length === 1 ? 'item' : 'items'} ready for checkout`
                : 'You haven’t added anything yet.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-10 text-center"
          >
            <FiShoppingCart className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Browse our shop and find something you love.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-full"
            >
              Start Shopping
              <FiArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.cartId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-2xl shadow-md p-5 flex gap-4 flex-col sm:flex-row"
                  >
                    <div className="w-full sm:w-40 h-40 rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={item.selectedColor?.images?.[0] || item.colors?.[0]?.images?.[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-red-600 hover:text-red-700"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500 mt-2 flex flex-wrap gap-4">
                          <span>Color: <strong className="text-gray-700">{item.selectedColor?.name}</strong></span>
                          {item.selectedSize && (
                            <span>Size: <strong className="text-gray-700">{item.selectedSize}</strong></span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:text-red-600 disabled:opacity-30"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:text-red-600"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-2xl font-black text-red-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
              <h3 className="text-2xl font-black text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span className="font-semibold text-gray-900">Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between text-xl font-black text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button className="w-full py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-full hover:shadow-lg transition-shadow">
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-3 border-2 border-red-200 text-red-600 font-bold rounded-full hover:bg-red-50 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

