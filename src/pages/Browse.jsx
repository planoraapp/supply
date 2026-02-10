
import React from 'react';
import './Browse.css';

const lists = [
    {
        name: 'Home Office Goals',
        count: 68,
        slug: 'office-goals',
        images: [
            'https://assets.curated.supply/studio%20display.webp',
            'https://assets.curated.supply/aeron.webp',
            'https://assets.curated.supply/Work Louder_k%E2%80%A2no%E2%80%A2b%E2%80%A21.webp',
            'https://assets.curated.supply/Kismas_Doric%20Lamp%2001.webp'
        ]
    },
    {
        name: 'Cult of Coffee',
        count: 33,
        slug: 'cult-of-coffee',
        images: [
            'https://assets.curated.supply/fellow_stagg.webp',
            'https://assets.curated.supply/xbloomstudio.webp',
            'https://assets.curated.supply/Terra%20Kaffe_TK-02.webp',
            'https://assets.curated.supply/Fellow%20Ode%20Brew%20Grinder%20Gen%202.webp'
        ]
    },
    {
        name: 'For Your Coffee Table',
        count: 41,
        slug: 'coffee-table',
        images: [
            'https://assets.curated.supply/Phaidon_Dieter%20Rams_%20The%20Complete%20Works.webp',
            'https://assets.curated.supply/Taschen_Virgil%20Abloh.%20Nike.%20ICONS.webp',
            'https://assets.curated.supply/Phaidon_Braun_%20Designed%20to%20Keep.webp',
            'https://assets.curated.supply/Taschen_Design%20of%20the%2020th%20Century.webp'
        ]
    },
    {
        name: 'Audiophile Core',
        count: 72,
        slug: 'audiophile',
        images: [
            'https://assets.curated.supply/Nothing_Headphones(1).webp',
            'https://assets.curated.supply/airpods%20max.webp',
            'https://assets.curated.supply/BangOlufsen_Beosound%20Level.webp',
            'https://assets.curated.supply/BangOlufsen_Beosound%20A1%203rd%20Gen.webp'
        ]
    },
    {
        name: 'Even Charging can Look Good',
        count: 56,
        slug: 'charging',
        images: [
            'https://assets.curated.supply/Nomad_%20Base%20One%20Max%203-in-1.webp',
            'https://assets.curated.supply/Aulumu_M01%204-in-1%20Folding%20Wireless%20Charging%20Station%20%26%20Pad.webp',
            'https://assets.curated.supply/Native Union_Rise%203-in-1%20Magnetic%20Wireless%20Charger.webp',
            'https://assets.curated.supply/Courant_CATCH_3%20Classics.webp'
        ]
    },
    {
        name: 'Nicer Everyday Objects',
        count: 93,
        slug: 'everyday',
        images: [
            'https://assets.curated.supply/Crust_P%E2%80%931%20Pepper%20Mill.webp',
            'https://assets.curated.supply/Aesop%20Polish%20Bar.webp',
            'https://assets.curated.supply/Dyson%20v15.webp',
            'https://assets.curated.supply/Elago_Magnetic%20Leather%20Card%20Holder.webp'
        ]
    },
    {
        name: 'Deskworthy',
        count: 141,
        slug: 'deskworthy',
        images: [
            'https://assets.curated.supply/Nomad_%20Base%20One%20Max%203-in-1.webp',
            'https://assets.curated.supply/Lofree_%20Flow%202.webp',
            'https://assets.curated.supply/Lofree_%20Flow%2084.webp',
            'https://assets.curated.supply/Native Union_Rise%203-in-1%20Magnetic%20Wireless%20Charger.webp'
        ]
    },
    {
        name: 'Athletes Only',
        count: 32,
        slug: 'athletes',
        images: [
            'https://assets.curated.supply/Killspencer_Indoor%20Mini%20Basketball%20Kit.webp',
            'https://assets.curated.supply/Killspencer_Soccer%20Ball.webp',
            'https://assets.curated.supply/Killspencer_Indoor%20Mini%20Basketball.webp',
            'https://assets.curated.supply/Adidas_Copa%20Mundial.webp'
        ]
    },
    {
        name: 'Leather Goods',
        count: 75,
        slug: 'leather',
        images: [
            'https://assets.curated.supply/Grams28_151%20Stealth%20Backpack.webp',
            'https://assets.curated.supply/Bellroy_Hide%20%26%20Seek.webp',
            'https://assets.curated.supply/Courant_CATCH_3%20Classics.webp',
            'https://assets.curated.supply/Hardgraft_Long%20Haul%20Briefcase.webp'
        ]
    }
];

const categories = [
    { name: 'Tech', image: 'https://assets.curated.supply/studio%20display.webp', count: 179 },
    { name: 'Casa', image: 'https://assets.curated.supply/Kismas_Doric%20Lamp%2001.webp', count: 135 },
    { name: 'Escritório', image: 'https://assets.curated.supply/Oakywood_Standing%20Desk%20Pro.webp', count: 180 },
    { name: 'Acessórios', image: 'https://assets.curated.supply/Nomad_%20Card%20Wallet.webp', count: 148 },
    { name: 'Relógios', image: 'https://assets.curated.supply/Rolex_Datejust.webp', count: 68 },
    { name: 'Pessoal', image: 'https://assets.curated.supply/Aesop_Reverence%20Aromatique%20Hand%20Wash.webp', count: 30 },
    { name: 'Livros', image: 'https://assets.curated.supply/LMS_Helvetica%20Forever.webp', count: 47 },
    { name: 'Viagem', image: 'https://assets.curated.supply/Away_The%20Large_%20Aluminium%20Edition.webp', count: 15 },
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
    return (
        <div className="container browse-page">
            <h1 className="browse-title">Navegar</h1>

            <section className="browse-section">
                <div className="section-header">
                    <h2>Por lista</h2>
                    <a href="/lists" className="see-all">Ver tudo</a>
                </div>
                <div className="browse-grid lists-grid">
                    {lists.map((list, index) => (
                        <a href={`/lists/${list.slug}`} key={index} className="browse-card list-card">
                            <div className="list-images-grid">
                                {list.images.map((img, i) => (
                                    <div key={i} className="list-image-item">
                                        <img src={img} alt="" loading="lazy" />
                                    </div>
                                ))}
                            </div>
                            <div className="card-info">
                                <span className="card-title">{list.name}</span>
                                <span className="card-count">{list.count}</span>
                            </div>
                        </a>
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
