
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLists } from '../data';
import './Browse.css';

const categories = [
    { name: 'Tech', image: 'https://assets.curated.supply/studio%20display.webp', count: 179 },
    { name: 'Casa', image: 'https://assets.curated.supply/Kismas_Doric%20Lamp%2001.webp', count: 135 },
    { name: 'Escritório', image: 'https://assets.curated.supply/Oakywood_Standing%20Desk%20Pro.webp', count: 180 },
    { name: 'Acessórios', image: 'https://assets.curated.supply/Nomad_%20Card%20Wallet.webp', count: 148 },
    { name: 'Relógios', image: 'https://assets.curated.supply/Rolex_Datejust.webp', count: 68 },
    { name: 'Cuidados', image: 'https://assets.curated.supply/Aesop_Reverence%20Aromatique%20Hand%20Wash.webp', count: 30 },
    { name: 'Livros', image: 'https://assets.curated.supply/LMS_Helvetica%20Forever.webp', count: 47 },
    { name: 'Viagem', image: 'https://assets.curated.supply/Away_The%20Large_%20Aluminium%20Edition.webp', count: 15 },
    { name: 'Estilo de Vida', image: 'https://assets.curated.supply/Nike_Killshot%202.webp', count: 51 },
    { name: 'Câmeras', image: 'https://assets.curated.supply/Leica%20M11.webp', count: 15 },
    { name: 'Café', image: 'https://assets.curated.supply/xbloomstudio.webp', count: 32 },
    { name: 'Veículos', image: 'https://assets.curated.supply/911.webp', count: 19 },
];

const brands = [
    { name: 'Apple', image: 'https://assets.curated.supply/apple_brand.svg' },
    { name: 'Teenage Engineering', image: 'https://assets.curated.supply/brand_te.svg' },
    { name: 'Herman Miller', image: 'https://assets.curated.supply/brand_hermanmiller.svg' },
    { name: 'Lego', image: 'https://assets.curated.supply/brand_lego.svg' },
    { name: 'Dyson', image: 'https://assets.curated.supply/brand_dyson.svg' },
    { name: 'Fellow', image: 'https://assets.curated.supply/brand_fellow.svg' },
    { name: 'Omega', image: 'https://assets.curated.supply/brand_omega.svg' },
    { name: 'Leica', image: 'https://assets.curated.supply/brand_leica.svg' },
];

const Browse = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            const data = await getLists();
            setLists(data);
            setLoading(false);
        };
        fetchLists();
    }, []);

    if (loading) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Carregando dados...</div>;
    }
    return (
        <div className="container browse-page">
            <h1 className="browse-title">Navegar</h1>

            <section className="browse-section">
                <div className="section-header" style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: 0 }}>Listas</h4>
                    <Link to="/lists" className="see-all" style={{ textDecoration: 'none', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.05em' }}>Ver tudo</Link>
                </div>
                <div className="browse-grid lists-grid">
                    {lists.map((list, index) => (
                        <Link to={`/lists/${list.slug || list.id}`} key={index} className="browse-card list-card">
                            <div className="list-images-grid">
                                {(list.images && list.images.length > 0) ? (
                                    list.images.slice(0, 4).map((img, i) => (
                                        <div key={i} className="list-image-item">
                                            <img src={img} alt="" loading="lazy" />
                                        </div>
                                    ))
                                ) : (
                                    Array(4).fill(0).map((_, i) => (
                                        <div key={i} className="list-image-item" style={{ background: '#f5f5f5' }}></div>
                                    ))
                                )}
                            </div>
                            <div className="card-info">
                                <span className="card-title">{list.name}</span>
                                <span className="card-count">{list.count || 0}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="browse-section">
                <div className="section-header">
                    <h2>Por categoria</h2>
                    <a href="/categories" className="see-all">Ver tudo</a>
                </div>
                <div className="browse-grid categories-grid">
                    {categories.map((cat, index) => (
                        <a href={`/categories/${cat.name.toLowerCase()}`} key={index} className="browse-card">
                            <div className="card-image">
                                <img src={cat.image} alt={cat.name} loading="lazy" />
                            </div>
                            <div className="card-info">
                                <span className="card-title">{cat.name}</span>
                                <span className="card-count">{cat.count}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            <section className="browse-section">
                <div className="section-header">
                    <h2>Por marca</h2>
                    <a href="/brands" className="see-all">Ver tudo</a>
                </div>
                <div className="browse-grid brands-grid">
                    {brands.map((brand, index) => (
                        <a href={`/brands/${brand.name.toLowerCase()}`} key={index} className="browse-card brand-card">
                            <div className="card-image brand-image">
                                <img src={brand.image} alt={brand.name} loading="lazy" />
                            </div>
                            <div className="card-info brand-info">
                                <span className="card-title">{brand.name}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Browse;
