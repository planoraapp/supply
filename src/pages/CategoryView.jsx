
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../data';
import './CategoryView.css';

const CategoryView = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const allProducts = await getProducts();
            
            // Filter products by category (case-insensitive)
            const filteredProducts = allProducts.filter(p => 
                p.category.toLowerCase().replace(/á|à|â|ã/g, 'a').replace(/é|è|ê/g, 'e').replace(/í|ì|î/g, 'i').replace(/ó|ò|ô|õ/g, 'o').replace(/ú|ù|û/g, 'u').replace(/ç/g, 'c') 
                === category.toLowerCase()
                || p.category.toLowerCase() === category.toLowerCase()
            );
            
            setProducts(filteredProducts);
            setLoading(false);
        };
        fetchData();
    }, [category]);

    // Format category name for display
    const displayName = category.charAt(0).toUpperCase() + category.slice(1);

    if (loading) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Carregando categoria...</div>;
    }

    return (
        <main className="container category-view-page">
            <header className="category-header">
                <div className="breadcrumb">
                    <Link to="/browse" className="breadcrumb-parent">Categorias</Link>
                    <span className="breadcrumb-separator">/</span>
                    <h1 className="breadcrumb-current">{displayName}</h1>
                </div>
            </header>

            {products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <div className="empty-category">
                    <p>Nenhum produto encontrado nesta categoria no momento.</p>
                </div>
            )}
        </main>
    );
};

export default CategoryView;
