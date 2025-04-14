type SortProps = {
  sortKey: string;
  setSortKey: (key: string) => void;
};

export const Sort: React.FC<SortProps> = ({ sortKey, setSortKey }) => {
  return (
    <div className="sort">
      <label htmlFor="sort">Sort By:</label>
      <select
        id="sort"
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
      >
        <option value="">None</option>
        <option value="price">Price: Low to High</option>
        <option value="rating">Rating: High to Low</option>
        <option value="reviews">Most Reviews</option>
      </select>
    </div>
  );
};
