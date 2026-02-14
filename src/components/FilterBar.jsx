
import React from 'react';
import {
    LayoutGrid,
    Sparkles,
    Star,
    Cpu,
    Home,
    Package,
    BookOpen,
    Heart,
    Watch,
    User,
    Plane,
    Camera,
    Coffee,
    Car,
    Briefcase,
    Plus
} from 'lucide-react';
import './FilterBar.css';

const categories = [
    { label: 'Todos', icon: LayoutGrid },
    { label: 'Novos', icon: Sparkles },
    { label: 'Destaques', icon: Star },
    { label: 'Tech', icon: Cpu },
    { label: 'Escritório', icon: Briefcase },
    { label: 'Casa', icon: Home },
    { label: 'Acessórios', icon: Package },
    { label: 'Relógios', icon: Watch },
    { label: 'Cuidados', icon: User },
    { label: 'Livros', icon: BookOpen },
    { label: 'Viagem', icon: Plane },
    { label: 'Estilo de Vida', icon: Heart },
    { label: 'Câmeras', icon: Camera },
    { label: 'Café', icon: Coffee },
    { label: 'Veículos', icon: Car }
];

const FilterBar = ({ activeCategory, setActiveCategory }) => {
    return (
        <div className="filter-bar-container">
            <div className="filter-scroll">
                {categories.map((cat, index) => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={index}
                            className={`filter-pill ${activeCategory === cat.label ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.label)}
                        >
                            <Icon size={14} className="filter-icon" />
                            <span>{cat.label}</span>
                        </button>
                    );
                })}
                <button className="filter-pill see-more">
                    <Plus size={14} className="filter-icon" />
                    <span>Ver Mais</span>
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
