
import React from 'react';
import './FilterBar.css';

const categories = [
    'Todos',
    'Novos',
    'Destaques',
    'Tech',
    'Escritório',
    'Casa',
    'Acessórios',
    'Livros',
    'Estilo de Vida'
];

const FilterBar = ({ activeCategory, setActiveCategory }) => {
    return (
        <div className="filter-bar-container">
            <div className="filter-scroll">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
                <button className="filter-pill see-more">
                    Ver Mais
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
