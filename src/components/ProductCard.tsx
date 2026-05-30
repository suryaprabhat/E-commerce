import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';

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

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ productId: product._id, name: product.name, price: product.price, image: product.images[0] || '' });
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const filledStars = Math.floor(product.rating);

  return (
    <Link to={`/details/${product._id}`} className="product-card">
      <div className="product-image-container">
        {isLoading && <div className="loading-spinner"><div className="spinner"></div></div>}
        <img
          src={imgError ? `https://placehold.co/500x500/1a1a2e/e1e1e1?text=${encodeURIComponent(product.name)}` : product.images[0]}
          alt={product.name}
          onError={() => { setImgError(true); setIsLoading(false); }}
          onLoad={() => setIsLoading(false)}
          className={`product-image ${isLoading ? 'loading' : 'loaded'}`}
        />
        {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-price-rating">
          <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
          <div className="rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < filledStars ? 'filled' : ''}`}>★</span>
              ))}
            </div>
            <span className="rating-value">{product.rating.toFixed(1)}</span>
            <span className="reviews">({product.reviews})</span>
          </div>
        </div>

        <div className="product-card-buttons">
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            id={`add-to-cart-${product._id}`}
          >
            Add to Cart
          </button>
          <Link
            to={`/details/${product._id}`}
            className="buy-now-btn"
            onClick={(e) => e.stopPropagation()}
          >
            View Details
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
