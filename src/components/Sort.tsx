import React from 'react';

type SortProps = {
  sortOption: string;
  setSortOption: (key: string) => void;
};

export const Sort: React.FC<SortProps> = ({ sortOption, setSortOption }) => {
  return (
    <div className="sort">
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Default</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating">Rating: High to Low</option>
      </select>
    </div>
  );
};
