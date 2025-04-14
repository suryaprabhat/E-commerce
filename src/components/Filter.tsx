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
        <label htmlFor="min-price">Price Range (₹):</label>
        <div className="price-range">
          <input
            type="number"
            id="min-price"
            placeholder="Min"
            value={minPrice || ""}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            min="0"
            aria-label="Minimum Price"
          />
          <span aria-hidden="true">to</span>
          <input
            type="number"
            id="max-price"
            placeholder="Max"
            value={maxPrice || ""}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            min="0"
            aria-label="Maximum Price"
          />
        </div>
      </div>
    </div>
  );
};
