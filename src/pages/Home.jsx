
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../data';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const getFilteredProducts = () => {
        if (activeCategory === "Todos") return products;
        if (activeCategory === "Destaques") return products.filter(p => p.badge);
        if (activeCategory === "Novos") return products.slice(0, 6);
        return products.filter(p => p.category === activeCategory);
    };

    if (loading) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Carregando produtos...</div>;
    }

    return (
        <main className="container">
            <Hero />
            <FilterBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <ProductGrid products={getFilteredProducts()} />
        </main>
    );
};

export default Home;
