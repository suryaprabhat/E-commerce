import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import API from '../lib/api';
import 'react-toastify/dist/ReactToastify.css';

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

export const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setSelectedImage(data.images[0]);
      } catch {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading-container"><div className="spinner" /></div>;
  if (error || !product) return <div className="error-message">{error}</div>;

  const handleAddToCart = () => {
    addToCart({ productId: product._id, name: product.name, price: product.price, image: product.images[0] }, quantity);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="product-details">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-details-content">
        <div className="product-gallery">
          <div className="main-image">
            <img src={selectedImage} alt={product.name} className="product-image" loading="lazy" />
            {!product.inStock && <span className="out-of-stock">Out of Stock</span>}
          </div>
          <div className="thumbnail-list">
            {product.images.map((img, idx) => (
              <button key={idx} className={`thumbnail ${selectedImage === img ? 'active' : ''}`} onClick={() => setSelectedImage(img)} aria-label={`Select image ${idx + 1}`}>
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="thumbnail-image" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-meta">
            <span className="category">{product.category}</span>
            <div className="rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>★</span>
                ))}
              </div>
              <span className="rating-value">{product.rating.toFixed(1)}</span>
              <span className="reviews">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="price-section">
            <span className="price">₹{product.price.toFixed(2)}</span>
            <span className={`stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          <div className="purchase-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              {product.inStock ? (
                <select id="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="quantity-select">
                  {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                </select>
              ) : <span>N/A</span>}
              <span className="total-price">Total: ₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart" disabled={!product.inStock} onClick={handleAddToCart}>
                Add to Cart
              </button>
              <Link to="/cart" className="buy-now" style={{ textDecoration: 'none', textAlign: 'center' }}>
                Go to Cart
              </Link>
            </div>
          </div>

          <div className="additional-info">
            <div className="info-item"><span className="icon">🚚</span><div className="info-content"><h3>Free Shipping</h3><p>On orders over ₹500</p></div></div>
            <div className="info-item"><span className="icon">🔄</span><div className="info-content"><h3>Easy Returns</h3><p>30-day return policy</p></div></div>
            <div className="info-item"><span className="icon">🔒</span><div className="info-content"><h3>Secure Checkout</h3><p>SSL Encrypted Payment</p></div></div>
          </div>
        </div>
      </div>

      <Link to="/products" className="back-button">← Back to Products</Link>
    </div>
  );
};
