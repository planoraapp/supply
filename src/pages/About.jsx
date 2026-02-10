
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './About.css';

const About = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await addDoc(collection(db, "feedback"), {
                ...formData,
                createdAt: serverTimestamp()
            });
            setSent(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error("Error sending feedback:", error);
            alert("Erro ao enviar mensagem. Tente novamente.");
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div className="container about-page">
            <div className="about-content">
                <h1 className="about-title">
                    O filtro entre o consumo e a intenção.
                </h1>

                <div className="about-text-section">
                    <p>
                        O acervo. não é apenas uma lista de objetos; é uma resposta ao excesso. Na vida, o verdadeiro luxo contemporâneo não está no preço, mas na confiança de que cada escolha foi feita com critério.
                    </p>

                    <h3>Design com propósito</h3>
                    <p>
                        Aqui você verá um espectro de possibilidades. Você encontrará desde pequenos utilitários, itens essenciais. e até peças de design estrutural. Embora os valores variem, o rigor é mantido: do item mais acessível ao mais exclusivo, a exigência por uma estética inteligente e uma execução impecável permanece a mesma. Acreditamos que a qualidade deve ser democrática, mas ela nunca é comum.
                    </p>

                    <p>
                        Seu tempo é o seu recurso mais escasso. Por isso, fizemos o trabalho difícil por você. O acervo. elimina a fadiga da decisão e o ruído da busca infinita.
                    </p>

                    <p>
                        Não queremos que você perca horas comparando especificações; queremos que você ganhe anos utilizando algo que foi própriamente planejado. Cada minuto que você não gasta procurando o objeto ideal é um minuto devolvido ao que realmente importa em sua vida.
                    </p>

                    <p>
                        Continue nos visitando, sempre há algo novo pra você conhecer.
                    </p>
                </div>

                <div className="about-profile">
                    <a href="https://x.com/mtheusroque" target="_blank" rel="noopener noreferrer" className="profile-link">
                        <div className="profile-image">
                            <img
                                src="https://unavatar.io/twitter/mtheusroque"
                                alt="Matheus Roque"
                                onError={(e) => { e.target.src = 'https://framerusercontent.com/images/bc14OlodPa2Iur5xRRAE1llao.jpg?width=654&height=655' }}
                            />
                        </div>
                    </a>
                    <div className="profile-details">
                        <a href="https://x.com/mtheusroque" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <span className="profile-name">Matheus Roque</span>
                        </a>
                        <span className="profile-role">Designer & Curador</span>
                    </div>
                </div>

                <div className="about-divider"></div>

                <div className="contact-section" id="contact">
                    <div className="contact-header">
                        <h3>Contato</h3>
                        <p>Tem uma pergunta ou produto que vale a pena compartilhar? Eu leio tudo.</p>
                    </div>

                    {sent ? (
                        <div className="contact-success">
                            <p>Mensagem enviada com sucesso! Obrigado pelo feedback.</p>
                            <button onClick={() => setSent(false)} className="contact-submit" style={{ width: 'auto', padding: '12px 24px', marginTop: '16px' }}>Enviar outra</button>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Seu nome"
                                required
                                className="contact-input"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Seu email"
                                required
                                className="contact-input"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <textarea
                                placeholder="Sua mensagem"
                                required
                                className="contact-textarea"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                            <button type="submit" className="contact-submit" disabled={submitting}>
                                {submitting ? 'Enviando...' : 'Enviar mensagem'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default About;
