
import React, { useRef, useState } from 'react';
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
    Plus,
    ChevronDown
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
    { label: 'Café', icon: Coffee }
];

const FilterBar = ({ activeCategory, setActiveCategory }) => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // multiplicador de velocidade
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="filter-bar-container">
            <div className="filter-sort-wrapper">
                <div 
                    className={`filter-scroll ${isDragging ? 'dragging' : ''}`}
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={index}
                                className={`filter-pill ${activeCategory === cat.label ? 'active' : ''}`}
                                onClick={() => {
                                    if (!isDragging) setActiveCategory(cat.label);
                                }}
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

                <div className="sort-container">
                    <button className="sort-button">
                        <span className="sort-label">Ordenar por:</span>
                        <span className="sort-current">Destaques</span>
                        <ChevronDown size={14} className="sort-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
