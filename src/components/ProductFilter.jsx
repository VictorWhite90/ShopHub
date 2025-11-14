// src/components/ProductFilter.jsx
import { useState } from 'react';
import { Filter } from 'lucide-react';

export const ProductFilter = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [open, setOpen] = useState(false);

  const categories = ['All', 'Clothes', 'Shoes', 'Accessories', 'Electronics'];
  const prices = ['All', 'Under $50', '$50 - $100', 'Over $100'];

  const applyFilter = () => {
    onFilter({ category, priceRange });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
      >
        <Filter className="w-5 h-5" />
        Filters
      </button>

      {open && (
        <div className="absolute top-full mt-3 left-0 bg-white rounded-2xl shadow-xl p-6 w-80 z-50 border">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Category</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={category === cat}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Price</h4>
              <div className="space-y-2">
                {prices.map((range) => (
                  <label key={range} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      value={range}
                      checked={priceRange === range}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm">{range}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={applyFilter}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-accent transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};