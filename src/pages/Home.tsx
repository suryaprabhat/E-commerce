import React from 'react';
import { CategoryCard } from '../components/CategoryCard';
import { products } from '../data/products';
import electronicsImg from '../assets/categories/electronics.webp';
import furnitureImg from '../assets/categories/furniture.webp';
import decorImg from '../assets/categories/decorbg.webp';
import pepperfryLogo from '../assets/categories/pepperfry.png';
import cromaLogo from '../assets/categories/croma.png';
import fabindiaLogo from '../assets/categories/fabindia.png';
import boatLogo from '../assets/categories/boat.png';

const Home: React.FC = () => {
    // Get unique categories and their counts
    const categories = Array.from(new Set(products.map(product => product.category)));

    // Map categories to their images
    const categoryImages: Record<string, string> = {
        'Electronics': electronicsImg,
        'Furniture': furnitureImg,
        'Home Decor': decorImg
    };

    // Get featured products (first 3 from each category)
    const featuredProducts = categories.flatMap(category =>
        products.filter(p => p.category === category).slice(0, 1)
    );

    // Popular brands with logos (Updated with Indian Brands & Local Logos)
    const brands = [
        { name: "Croma", logo: cromaLogo },
        { name: "boAt (Techify)", logo: boatLogo },
        { name: "Pepperfry", logo: pepperfryLogo },
        { name: "FabIndia", logo: fabindiaLogo }
    ];

    return (
        <>
            <div className="hero-section">
                <div className="hero-content">
                    <div className="welcome-text">
                        {Array.from("Welcome").map((letter, index) => (
                            <span key={index} className="welcome-letter">{letter}</span>
                        ))}
                    </div>
                    <h1 className="store-title">Elegant Living</h1>
                    <p className="hero-subtitle">Discover premium products for your lifestyle</p>
                    <div className="hero-badges">
                        <span className="badge">Premium Quality</span>
                        <span className="badge">Fast Delivery</span>
                        <span className="badge">Best Prices</span>
                    </div>
                </div>
            </div>

            <div className="categories-section">
                <div className="section-header">
                    <h2>Shop by Category</h2>
                    <p>Find what you're looking for in our carefully curated collections</p>
                </div>
                <div className="categories-grid">
                    {categories.map((category, index) => (
                        <div
                            key={category}
                            className="motion-div"
                            style={{ '--index': index } as React.CSSProperties}
                        >
                            <CategoryCard
                                category={category}
                                productCount={products.filter(p => p.category === category).length}
                                image={categoryImages[category]}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="featured-section">
                <div className="featured-content">
                    <h2>Featured Collections</h2>
                    <p>Our most popular products and trending items</p>
                </div>
                <div className="featured-grid">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="featured-card">
                            <div className="featured-image-container">
                                <img src={product.images[0]} alt={product.name} className="featured-image" />
                            </div>
                            <div className="featured-info">
                                <h3>{product.name}</h3>
                                <p className="featured-price">${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="brands-section">
                <div className="section-header">
                    <h2>Popular Brands</h2>
                    <p>Quality products from trusted manufacturers</p>
                </div>
                <div className="brands-grid">
                    {brands.map((brand) => (
                        <div key={brand.name} className="brand-card">
                            <div className="brand-logo">
                                <img src={brand.logo} alt={brand.name} />
                            </div>
                            <span className="brand-name">{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home; 