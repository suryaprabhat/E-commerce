import React from "react";

type FilterProps = {
  minPrice: number;
  setMinPrice: (price: number) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
};

export const Filter: React.FC<FilterProps> = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  return (
    <div className="filter">
      <div className="filter-group">
        <label>Price Range (₹):</label>
        <div className="price-range">
          <input
            type="number"
            placeholder="Min"
            value={minPrice || ""}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            min="0"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice || ""}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            min="0"
          />
        </div>
      </div>
    </div>
  );
};
