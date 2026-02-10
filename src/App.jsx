
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Browse from './pages/Browse';
import Admin from './pages/Admin';
import Legal from './pages/Legal';
import ProductDetail from './pages/ProductDetail';
import './index.css';

const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--border-color)', marginTop: '80px', padding: '80px 0' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '40px' }}>
      <div>
        <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Navegação</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="/" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Descobrir</a>
          <a href="/lists" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Listas</a>
          <a href="/brands" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Marcas</a>
          <a href="/categories" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Categorias</a>
          <a href="/index" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Índice</a>
        </div>
      </div>
      <div>
        <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Info</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="/about" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Sobre</a>
          <a href="/legal" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Legal</a>
          <a href="https://x.com/mtheusroque" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Twitter</a>
          <a href="mailto:appplanora@gmail.com" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Email</a>
        </div>
      </div>
      <div>
        <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Categorias</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="/categories/tech" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Tech</a>
          <a href="/categories/casa" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Casa</a>
          <a href="/categories/escritorio" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Escritório</a>
          <a href="/categories/acessorios" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Acessórios</a>
          <a href="/categories/relogios" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Relógios</a>
          <a href="/categories/pessoal" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Pessoal</a>
          <a href="/categories/livros" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Livros</a>
          <a href="/categories/viagem" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Viagem</a>
        </div>
      </div>
      <div>
        <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Listas</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="/lists/office" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Home Office Goals</a>
          <a href="/lists/coffee" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Cult of Coffee</a>
          <a href="/lists/coffeetable" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>For Your Coffee Table</a>
          <a href="/lists/audio" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Audiophile Core</a>
          <a href="/lists/charging" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Charging Design</a>
          <a href="/lists/everyday" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Nicer Everyday Objects</a>
          <a href="/lists/desk" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Deskworthy</a>
          <a href="/lists/athletes" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Athletes Only</a>
        </div>
      </div>
    </div>
  </footer>
);

function AppContent() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/inserir" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
