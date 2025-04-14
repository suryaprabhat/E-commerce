import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
    category: string;
    productCount: number;
    image: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, productCount, image }) => {
    return (
        <Link to={`/category/${category}`} className="category-card">
            <div className="category-image-container">
                <img
                    src={image}
                    alt={category}
                    className="category-image"
                    loading="lazy"
                />
            </div>
            <div className="category-info">
                <h3>{category}</h3>
                <p>{productCount} products</p>
            </div>
        </Link>
    );
};
