
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { getProducts, getLists } from '../data';
import { ArrowLeft } from 'lucide-react';
import './ListView.css';

const ListView = () => {
    const { slug } = useParams();
    const [list, setList] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [allLists, allProducts] = await Promise.all([
                getLists(),
                getProducts()
            ]);

            const currentList = allLists.find(l => l.slug === slug || l.id === slug);
            setList(currentList);

            if (currentList) {
                // Filter products that belong to this list
                // For now, we use the images array as a proxy if explicit list association is missing
                const listProducts = allProducts.filter(p => {
                    // Check if product specifically has this list slug
                    if (p.lists && p.lists.includes(slug)) return true;
                    if (p.list === slug) return true;

                    // Fallback: check if the product's image is one of the list's preview images
                    if (currentList.images && currentList.images.includes(p.image)) return true;

                    // Additional heuristic: if list name matches category
                    if (currentList.name.toLowerCase().includes(p.category.toLowerCase())) return true;

                    return false;
                });
                setProducts(listProducts);
            }
            setLoading(false);
        };
        fetchData();
    }, [slug]);

    if (loading) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Carregando lista...</div>;
    }

    if (!list) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2>Lista não encontrada</h2>
                <Link to="/browse" className="btn-secondary" style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={16} /> Voltar para Navegar
                </Link>
            </div>
        );
    }

    return (
        <main className="container list-view-page">
            <header className="list-header">
                <Link to="/browse" className="back-link">
                    <ArrowLeft size={16} /> <span>Voltar</span>
                </Link>
                <div className="list-meta">
                    <h1 className="list-title">{list.name}</h1>
                    <span className="list-count">{products.length} produtos</span>
                </div>
            </header>

            {products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <div className="empty-list">
                    <p>Nenhum produto encontrado nesta lista no momento.</p>
                </div>
            )}
        </main>
    );
};

export default ListView;
