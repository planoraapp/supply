import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <div className="product-image-container">
                {product.badge && (
                    <div className="staff-pick-badge">
                        <span className="badge-star">✦</span>
                        <span>{product.badge}</span>
                    </div>
                )}
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x400/f2f2f2/999999?text=" + encodeURIComponent(product.title);
                    }}
                />
            </div>

            <div className="product-details">
                <div className="product-header">
                    <div className="product-meta">
                        <span className="product-brand">{product.brand}</span>
                        <span className="meta-separator">·</span>
                        <span className="product-category">{product.category}</span>
                    </div>
                    <h3 className="product-title">{product.title}</h3>
                </div>

                <div className="product-footer">
                    <span className="product-price">{product.price}</span>
                    <div className="product-link">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
