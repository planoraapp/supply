
import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="container about-page">
            <div className="about-content">
                <h1 className="about-title">
                    Feito para aqueles que se importam com o que trazem para suas vidas
                </h1>

                <div className="about-text-section">
                    <p>
                        Este site existe porque o mundo não precisa de mais coisas, precisa de coisas melhores.
                    </p>
                    <p>
                        Estamos cercados de coisas construídas rápido, feitas para vender e destinadas a serem substituídas. Mas há um tipo silencioso de luxo em escolher bem.
                    </p>
                    <p>
                        Tudo aqui é escolhido por sua qualidade e utilidade.<br /><br />
                        Ferramentas e objetos que tornam a vida mais simples, não mais ocupada. Materiais que melhoram com o tempo. Produtos que parecem tão considerados quanto os espaços que habitam.<br /><br />
                        Não é sobre como as coisas parecem, mas como elas duram. Não objetos de status, mas padrões. Não o que fazem, mas quão bem é feito.<br /><br />
                        Design que respeita seu tempo e atenção.
                    </p>
                    <p>
                        Bem-vindo ao Curated Supply, um lugar para aqueles que acreditam que o que você possui deve importar.
                    </p>
                </div>

                <div className="about-profile">
                    <div className="profile-image">
                        <img
                            src="https://framerusercontent.com/images/bc14OlodPa2Iur5xRRAE1llao.jpg?width=654&height=655"
                            alt="Justin Profile"
                        />
                    </div>
                    <div className="profile-details">
                        <span className="profile-name">Justin</span>
                        <span className="profile-role">Designer & Curador</span>
                    </div>
                </div>

                <div className="about-divider"></div>

                <div className="contact-section" id="contact">
                    <div className="contact-header">
                        <h3>Contato</h3>
                        <p>Tem uma pergunta ou produto que vale a pena compartilhar? Eu leio tudo.</p>
                    </div>

                    <form className="contact-form">
                        <input type="text" placeholder="Seu nome" required className="contact-input" />
                        <input type="email" placeholder="Seu email" required className="contact-input" />
                        <textarea placeholder="Sua mensagem" required className="contact-textarea"></textarea>
                        <button type="submit" className="contact-submit">Enviar mensagem</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default About;
