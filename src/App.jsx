
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Browse from './pages/Browse';
import Admin from './pages/Admin';
import Legal from './pages/Legal';
import ProductDetail from './pages/ProductDetail';
import ListView from './pages/ListView';
import CategoryView from './pages/CategoryView';
import './index.css';

const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--border-color)', marginTop: '80px', padding: '80px 0' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '40px' }}>
      <div>
        <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Navegação</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Descobrir</Link>
          <Link to="/browse" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Listas</Link>
          <Link to="/brands" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Marcas</Link>
          <Link to="/categories" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Categorias</Link>
          <Link to="/index" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Índice</Link>
        </div>
      </div>
      <div>
        <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Info</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/about" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Sobre</Link>
          <Link to="/legal" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Legal</Link>
          <a href="https://x.com/mtheusroque" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>X</a>
          <a href="mailto:appplanora@gmail.com" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Email</a>
        </div>
      </div>
      <div>
        <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Categorias</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/categories/tech" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Tech</Link>
          <Link to="/categories/casa" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Casa</Link>
          <Link to="/categories/escritorio" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Escritório</Link>
          <Link to="/categories/acessorios" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Acessórios</Link>
          <Link to="/categories/relogios" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Relógios</Link>
          <Link to="/categories/pessoal" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Pessoal</Link>
          <Link to="/categories/livros" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Livros</Link>
          <Link to="/categories/viagem" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Viagem</Link>
        </div>
      </div>
      <div>
        <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Listas</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/lists/office" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Melhores para Escritório</Link>
          <Link to="/lists/coffee" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Ritual do Grão</Link>
          <Link to="/lists/coffeetable" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Essenciais</Link>
          <Link to="/lists/audio" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Acústica</Link>
          <Link to="/lists/charging" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Paredes e Decorações</Link>
          <Link to="/lists/everyday" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Signature</Link>
          <Link to="/lists/desk" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Para a Mesa de Centro</Link>
          <Link to="/lists/athletes" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Endorfina</Link>
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
        <Route path="/lists/:slug" element={<ListView />} />
        <Route path="/categories/:category" element={<CategoryView />} />
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
