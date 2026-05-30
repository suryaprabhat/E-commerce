import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import API from '../lib/api';
import electronicsImg from '../assets/categories/electronics.webp';
import furnitureImg from '../assets/categories/furniture.webp';
import decorImg from '../assets/categories/decorbg.webp';

const categoryImages: Record<string, string> = {
  'Electronics': electronicsImg,
  'Furniture': furnitureImg,
  'Home Decor': decorImg
};

const brands = [
  { name: "Nordic Design", logo: "https://ui-avatars.com/api/?name=Nordic+Design&background=6366F1&color=fff&size=128&bold=true&format=svg" },
  { name: "Techify", logo: "https://ui-avatars.com/api/?name=Techify&background=EC4899&color=fff&size=128&bold=true&format=svg" },
  { name: "EcoHome", logo: "https://ui-avatars.com/api/?name=EcoHome&background=8B5CF6&color=fff&size=128&bold=true&format=svg" },
  { name: "LuxeLiving", logo: "https://ui-avatars.com/api/?name=Luxe+Living&background=3B82F6&color=fff&size=128&bold=true&format=svg" }
];

const Home: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get('/products');
        const cats = Array.from(new Set<string>(data.map((p: any) => p.category)));
        setCategories(cats);
        const counts: Record<string, number> = {};
        cats.forEach((cat) => { counts[cat] = data.filter((p: any) => p.category === cat).length; });
        setCategoryCounts(counts);
        const featured = cats.flatMap((cat) => data.filter((p: any) => p.category === cat).slice(0, 1));
        setFeaturedProducts(featured);
      } catch (err) {
        console.error('Failed to fetch products for home', err);
      }
    };
    fetchData();
  }, []);

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
          <Link to="/products" className="hero-cta">Shop Now →</Link>
        </div>
      </div>

      <div className="categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find what you're looking for in our carefully curated collections</p>
        </div>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={category} className="motion-div" style={{ '--index': index } as React.CSSProperties}>
              <CategoryCard
                category={category}
                productCount={categoryCounts[category] || 0}
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
            <Link key={product._id} to={`/details/${product._id}`} className="featured-card">
              <div className="featured-image-container">
                <img src={product.images[0]} alt={product.name} className="featured-image" />
              </div>
              <div className="featured-info">
                <h3>{product.name}</h3>
                <p className="featured-price">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            </Link>
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
              <div className="brand-logo"><img src={brand.logo} alt={brand.name} /></div>
              <span className="brand-name">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;