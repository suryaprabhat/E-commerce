import React, { useState, useEffect } from 'react';
import { Product } from "../data/products";
import { Link } from "react-router-dom";

type ProductDetailsProps = {
    product: Product;
};

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
    const [quantity, setQuantity] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(product.price);

    useEffect(() => {
        setTotalPrice(product.price * quantity);
    }, [quantity, product.price]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(Number(event.target.value));
    };

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
                        <img
                            src={selectedImage}
                            alt={product.name}
                            className="product-image"
                            loading="lazy"
                        />
                        {!product.inStock && (
                            <span className="out-of-stock">Out of Stock</span>
                        )}
                    </div>
                    <div className="thumbnail-list">
                        {product.images.map((img, index) => (
                            <button
                                key={index}
                                className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                                onClick={() => setSelectedImage(img)}
                                aria-label={`Select image ${index + 1}`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="thumbnail-image"
                                    loading="lazy"
                                />
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
                                    <span
                                        key={i}
                                        className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                                    >
                                        ★
                                    </span>
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
                                <select
                                    id="quantity"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="quantity-select"
                                >
                                    {[...Array(Math.min(10))].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            ) : (
                                <span>N/A</span>
                            )}
                            <span className="total-price">Total: ₹{totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="action-buttons">
                            <button className="add-to-cart" disabled={!product.inStock}>Add to Cart</button>
                            <button className="buy-now" disabled={!product.inStock}>Buy Now</button>
                        </div>
                    </div>

                    <div className="additional-info">
                        <div className="info-item">
                            <span className="icon">🚚</span>
                            <div className="info-content">
                                <h3>Free Shipping</h3>
                                <p>On orders over ₹500</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="icon">🔄</span>
                            <div className="info-content">
                                <h3>Easy Returns</h3>
                                <p>30-day return policy</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <span className="icon">🔒</span>
                            <div className="info-content">
                                <h3>Secure Checkout</h3>
                                <p>SSL Encrypted Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Link to="/" className="back-button">
                ← Back to Products
            </Link>
        </div>
    );
};
