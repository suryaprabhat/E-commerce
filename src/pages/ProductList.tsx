import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products as allProducts } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { Filter } from "../components/Filter";
import { Sort } from "../components/Sort";

export const ProductList: React.FC = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const navigate = useNavigate();
    const [sortKey, setSortKey] = useState("");
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);

    // Filter products based *only* on the category from the URL parameter
    const filteredByCategory = categoryName
        ? allProducts.filter((p) => p.category === categoryName)
        : allProducts;

    // Filter by price
    const filteredByPrice = filteredByCategory.filter((p) => {
        if (minPrice && p.price < minPrice) return false;
        if (maxPrice && p.price > maxPrice) return false;
        return true;
    });

    // Sort the remaining products
    const sorted = [...filteredByPrice].sort((a, b) => {
        if (sortKey === "price") return a.price - b.price;
        if (sortKey === "rating") return b.rating - a.rating;
        if (sortKey === "reviews") return b.reviews - a.reviews;
        return 0;
    });

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="product-list-container">
            <div className="page-header">
                <button className="back-button" onClick={handleBackClick}>&#8592; Back</button>
                <h1>{categoryName ? `${categoryName} Products` : 'All Products'}</h1>
            </div>
            {/* Wrapper for Filter and Sort */}
            <div className="filter-sort-wrapper">
                <Filter
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                />
                <Sort sortKey={sortKey} setSortKey={setSortKey} />
            </div>
            <div className="product-grid">
                {sorted.map((product, index) => (
                    <div
                        key={product.id}
                        className="motion-div product-card-wrapper"
                        style={{ '--index': index } as React.CSSProperties}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}; 