import React, { useState } from 'react';
import { Product } from "../data/products";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    setImgError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info(`Proceeding to checkout...`);
  };

  const filledStars = Math.floor(product.rating);

  return (
    <Link to={`/details/${product.id}`} className="product-card">
      <div className="product-image-container">
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
        <img
          src={
            imgError
              ? `https://source.unsplash.com/500x500/?${product.name.toLowerCase().replace(/ /g, '-')}`
              : product.images[0]
          }
          alt={product.name}
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`product-image ${isLoading ? 'loading' : 'loaded'}`}
        />
        {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-price-rating">
          <p className="price">₹{product.price.toFixed(2)}</p>
          <div className="rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < filledStars ? 'filled' : ''}`}>
                  ★
                </span>
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
          >
            Add to Cart
          </button>
          <button
            className="buy-now-btn"
            onClick={handleBuyNow}
            disabled={!product.inStock}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Toast notifications container at top-center */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </Link>
  );
};

export default ProductCard;
