import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Sort } from '../components/Sort';
import API from '../lib/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  images: string[];
}

export const ProductList: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryName || '');
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['', 'Electronics', 'Furniture', 'Home Decor'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = {};
        if (selectedCategory) params.category = selectedCategory;
        if (searchQuery) params.search = searchQuery;
        if (sortOption) params.sort = sortOption;
        const { data } = await API.get('/products', { params });
        setProducts(data);
      } catch {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, sortOption, searchQuery]);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-list-page">
      <div className="product-list-header">
        <h1>{selectedCategory || 'All Products'}</h1>
        <div className="search-bar-wrap">
          <input
            type="text"
            className="search-bar"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="product-list-toolbar">
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat || 'all'}
              className={`category-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat || 'All'}
            </button>
          ))}
        </div>
        <Sort sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      {loading ? (
        <div className="loading-container"><div className="spinner" /></div>
      ) : products.length === 0 ? (
        <div className="no-products">No products found.</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};