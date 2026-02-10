import React, { useState } from 'react';
import './Hero.css';

const Hero = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle subscribe logic
    };

    return (
        <section className="hero-container">
            <div className="hero-badge">
                <div className="badge-icon"></div>
                <span>Atualizado todo domingo</span>
            </div>

            <h1 className="hero-title">
                Descubra produtos incríveis,<br />
                cuidadosamente selecionados
            </h1>

            <p className="hero-subtitle">
                Inscreva-se e junte-se a mais de 4.500 leitores para receber e-mails semanais<br />
                com produtos atemporais e de design para casa, trabalho e vida.
            </p>

            <div className="hero-form-container">
                <form onSubmit={handleSubmit} className="hero-form">
                    <input
                        type="email"
                        placeholder="nome@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="hero-input"
                        required
                    />
                    <button type="submit" className="hero-submit-btn">
                        Inscrever-se
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Hero;
