
import React, { useState } from 'react';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data';

const Home = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");

    const getFilteredProducts = () => {
        if (activeCategory === "Todos") return products;
        if (activeCategory === "Destaques") return products.filter(p => p.badge);
        if (activeCategory === "Novos") return products.slice(0, 6);
        return products.filter(p => p.category === activeCategory);
    };

    return (
        <main className="container">
            <Hero />
            <FilterBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <ProductGrid products={getFilteredProducts()} />
        </main>
    );
};

export default Home;
