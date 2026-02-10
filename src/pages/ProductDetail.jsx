import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProducts, getLists } from '../data';
import { ExternalLink, ChevronRight } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [featuredLists, setFeaturedLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const p = await getProductById(id);
            setProduct(p);

            if (p) {
                // Fetch related products (same category)
                const allProducts = await getProducts();
                const related = allProducts
                    .filter(item => item.category === p.category && item.id !== p.id)
                    .slice(0, 3);
                setRelatedProducts(related);

                // Fetch a couple of lists for the "Featured in" section
                const allLists = await getLists();
                setFeaturedLists(allLists.slice(0, 2));
            }
            setLoading(false);
            window.scrollTo(0, 0);
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Carregando...</div>;
    if (!product) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Produto não encontrado.</div>;

    return (
        <div className="container product-detail-page">
            <div className="product-intro">
                <div className="product-intro-container">
                    <div className="product-title-section">
                        <div className="product-metadata">
                            <Link to={`/brands/${product.brand?.toLowerCase()}`} className="metadata-link">{product.brand}</Link>
                            <span className="metadata-divider">·</span>
                            <Link to={`/categories/${product.category?.toLowerCase()}`} className="metadata-link">{product.category}</Link>
                        </div>
                        <h1 className="product-name">{product.title}</h1>
                    </div>

                    <div className="product-actions">
                        <div className="product-price">{product.price}</div>
                        <div className="actions-divider"></div>
                        <a href={product.url} target="_blank" rel="noopener noreferrer" className="purchase-button">
                            <span>Link de Compra</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>

                <div className="product-main-image">
                    <div className="image-aspect-wrapper">
                        <img src={product.image} alt={product.title} />
                    </div>
                </div>
            </div>

            <div className="product-content">
                <div className="product-details-grid">
                    <div className="details-col">
                        <h3 className="section-label">Sobre</h3>
                        <div className="about-text">
                            {product.about ? (
                                <p>{product.about}</p>
                            ) : (
                                <>
                                    <p>O {product.title} da {product.brand} representa o auge do design em sua categoria, combinando estética impecável com funcionalidade excepcional.</p>
                                    <p>Cada detalhe foi cuidadosamente planejado para oferecer a melhor experiência ao usuário, utilizando materiais de alta qualidade e processos de fabricação sustentáveis.</p>
                                    <p>Ideal para quem busca elevar seu espaço de trabalho ou vida cotidiana com um objeto que é tanto uma ferramenta quanto uma peça de arte.</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <section className="related-section">
                <div className="section-header">
                    <div className="header-titles">
                        <span className="label">Mais em</span>
                        <h2 className="title">{product.category}</h2>
                    </div>
                    <Link to={`/categories/${product.category?.toLowerCase()}`} className="see-all">Ver todos</Link>
                </div>

                <div className="product-grid">
                    {relatedProducts.map(item => (
                        <Link to={`/product/${item.id}`} key={item.id} className="product-card-related">
                            <div className="related-image-container">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="related-info">
                                <div className="related-meta">
                                    <span>{item.brand}</span>
                                    <span>·</span>
                                    <span>{item.category}</span>
                                </div>
                                <h4 className="related-title">{item.title}</h4>
                                <div className="related-footer">
                                    <span className="related-price">{item.price}</span>
                                    <div className="icon-btn-small">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="featured-lists-section">
                <div className="section-header">
                    <h2 className="title">Aparece em</h2>
                    <Link to="/lists" className="see-all">Ver todos</Link>
                </div>

                <div className="lists-grid-detail">
                    {featuredLists.map((list, index) => (
                        <Link to={`/lists/${list.slug || list.id}`} key={index} className="list-card-detail">
                            <div className="list-image-detail">
                                <img src={list.images?.[0] || product.image} alt={list.name} />
                            </div>
                            <div className="list-info-detail">
                                <h4 className="list-name-detail">{list.name}</h4>
                                <span className="list-count-detail">{list.count || 0}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
