// src/components/ColorSelector.jsx
import { motion } from 'framer-motion';

export const ColorSelector = ({ colors, selectedColor, onSelect }) => {
  return (
    <div className="flex gap-3 flex-wrap">
      {colors.map((color, index) => (
        <motion.button
          key={color.name}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(color)}
          className={`w-10 h-10 rounded-full border-3 transition-all duration-300 relative overflow-hidden ${
            selectedColor?.name === color.name
              ? 'border-primary shadow-lg ring-4 ring-primary/30'
              : 'border-white shadow-md'
          }`}
          style={{ backgroundColor: color.hex }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          {selectedColor?.name === color.name && (
            <motion.div
              layoutId="color-indicator"
              className="absolute inset-1 bg-white/30 rounded-full"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};