
import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, googleProvider, storage } from "../firebase";
import { getLists, getProducts } from "../data";
import { Plus, Package, List as ListIcon, Image as ImageIcon, Link as LinkIcon, Save, Trash, LogOut, Archive, Camera, Coffee, Car, Watch, Laptop, ShoppingBag, Briefcase, User, Book, Plane, Heart, Home as HomeIcon, Edit2, X, Loader2, Upload } from 'lucide-react';
import './Admin.css';

const PRODUCT_CATEGORIES = [
    { name: 'Tech', icon: Laptop, image: 'https://assets.curated.supply/studio%20display.webp' },
    { name: 'Casa', icon: HomeIcon, image: 'https://assets.curated.supply/Kismas_Doric%20Lamp%2001.webp' },
    { name: 'Escritório', icon: Briefcase, image: 'https://assets.curated.supply/Oakywood_Standing%20Desk%20Pro.webp' },
    { name: 'Acessórios', icon: ShoppingBag, image: 'https://assets.curated.supply/Nomad_%20Card%20Wallet.webp' },
    { name: 'Relógios', icon: Watch, image: 'https://assets.curated.supply/Rolex_Datejust.webp' },
    { name: 'Cuidados', icon: User, image: 'https://assets.curated.supply/Aesop_Reverence%20Aromatique%20Hand%20Wash.webp' },
    { name: 'Livros', icon: Book, image: 'https://assets.curated.supply/LMS_Helvetica%20Forever.webp' },
    { name: 'Viagem', icon: Plane, image: 'https://assets.curated.supply/Away_The%20Large_%20Aluminium%20Edition.webp' },
    { name: 'Estilo de Vida', icon: Heart, image: 'https://assets.curated.supply/Nike_Killshot%202.webp' },
    { name: 'Câmeras', icon: Camera, image: 'https://assets.curated.supply/Leica%20M11.webp' },
    { name: 'Café', icon: Coffee, image: 'https://assets.curated.supply/xbloomstudio.webp' },
    { name: 'Veículos', icon: Car, image: 'https://assets.curated.supply/911.webp' }
];

const AUTHORIZED_EMAIL = "appplanora@gmail.com";

const Admin = () => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [product, setProduct] = useState({
        title: '',
        brand: '',
        category: 'Tech',
        price: '',
        image: '',
        url: '',
        badge: '',
        about: '',
        priceTier: '$$',
        list: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [lists, setLists] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const [scrapedImages, setScrapedImages] = useState([]);
    const [fetchingImages, setFetchingImages] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && currentUser.email === AUTHORIZED_EMAIL) {
                setUser(currentUser);
            } else if (currentUser) {
                // User logged in but with wrong email
                signOut(auth);
                alert("Acesso negado: este e-mail não tem permissão de administrador.");
            } else {
                setUser(null);
            }
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    // Fetch lists (has protective fallback in data.js)
                    const listsData = await getLists();
                    setLists(listsData);

                    // Fetch products (has protective fallback in data.js)
                    const productsData = await getProducts();
                    setAllProducts(productsData);

                    // Fetch feedback (needs direct protection here)
                    try {
                        const feedbackSnapshot = await getDocs(collection(db, "feedback"));
                        const feedbackData = feedbackSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));
                        setFeedback(feedbackData);
                    } catch (fbErr) {
                        console.warn("Não foi possível carregar feedback (provavelmente regras de segurança):", fbErr.message);
                        setFeedback([]); // Fallback to empty
                    }
                } catch (err) {
                    console.error("Erro ao carregar dados do Firebase:", err);
                    if (err.message.includes("permission-denied") || err.code === "permission-denied") {
                        console.error("DICA: Suas regras do Firestore podem estar bloqueando o acesso. Vá no Console do Firebase > Firestore > Regras e certifique-se de que a leitura está permitida.");
                    }
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [user]);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    const handleLogout = () => signOut(auth);

    const [newListName, setNewListName] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleAddList = async () => {
        if (newListName.trim()) {
            try {
                const newList = { name: newListName, count: 0, createdAt: serverTimestamp() };
                const docRef = await addDoc(collection(db, "lists"), newList);
                setLists(prev => [...prev, { id: docRef.id, ...newList }]);
                setNewListName('');
            } catch (error) {
                console.error("Error adding list:", error);
                // Fallback for demo
                setLists(prev => [...prev, { id: Date.now(), name: newListName, count: 0 }]);
                setNewListName('');
            }
        }
    };

    const handleDeleteList = async (id) => {
        try {
            await deleteDoc(doc(db, "lists", id));
            setLists(prev => prev.filter(l => l.id !== id));
        } catch (error) {
            console.error("Error deleting list:", error);
        }
    };

    const handleDeleteFeedback = async (id) => {
        try {
            await deleteDoc(doc(db, "feedback", id));
            setFeedback(prev => prev.filter(f => f.id !== id));
        } catch (error) {
            console.error("Error deleting feedback:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
        try {
            await deleteDoc(doc(db, "products", id));
            setAllProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleArchiveProduct = async (id, currentStatus) => {
        try {
            await updateDoc(doc(db, "products", id), {
                archived: !currentStatus
            });
            setAllProducts(prev => prev.map(p => p.id === id ? { ...p, archived: !currentStatus } : p));
        } catch (error) {
            console.error("Error archiving product:", error);
        }
    };

    const scrapeProductData = async (url) => {
        if (!url || !url.startsWith('http')) return;
        setFetchingImages(true);
        setScrapedImages([]);

        let contents = null;
        let success = false;

        // Limpeza de URL - Mantemos a URL completa para shortlinks de ML e Amazon
        const isShort = url.includes('amzn.to') || url.includes('mercadolivre.com/sec/') || url.includes('mlb.link');
        const cleanUrl = isShort ? url : url.split('?')[0];

        const proxies = [
            { fn: (u) => `https://api.allorigins.win/get?url=${encodeURIComponent(u)}`, type: 'json' },
            { fn: (u) => `https://corsproxy.io/?${encodeURIComponent(u)}`, type: 'text' },
            { fn: (u) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`, type: 'text' }
        ];

        for (const proxy of proxies) {
            if (success) break;
            try {
                const response = await fetch(proxy.fn(cleanUrl));
                if (response.ok) {
                    contents = proxy.type === 'json' ? (await response.json()).contents : await response.text();
                    if (contents && contents.length > 500) success = true;
                }
            } catch (e) {
                // Falha silenciosa para não poluir o console do usuário
            }
        }

        if (!success) {
            setFetchingImages(false);
            alert('Não foi possível buscar os dados automaticamente. \nDICA: Tente usar o link completo da página ou preencha manualmente.');
            return;
        }

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(contents, 'text/html');

            // 1. Extract Images
            const images = Array.from(doc.querySelectorAll('img'))
                .map(img => img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src') || img.getAttribute('data-zoom-image'))
                .filter(src => src && (src.startsWith('http') || src.startsWith('//')))
                .map(src => src.startsWith('//') ? `https:${src}` : src)
                .filter(src => !src.includes('pixel') && !src.includes('analytics') && !src.includes('sprite') && !src.includes('logo'))
                .slice(0, 20);

            const ogImage = doc.querySelector('meta[property="og:image"]')?.content;
            const twitterImage = doc.querySelector('meta[name="twitter:image"]')?.content;
            const finalImages = [...new Set([ogImage, twitterImage, ...images].filter(Boolean))];
            setScrapedImages(finalImages);
            if (finalImages[0]) setProduct(prev => ({ ...prev, image: finalImages[0] }));

            // 2. Extract Title
            const ogTitle = doc.querySelector('meta[property="og:title"]')?.content;
            const pageTitle = doc.querySelector('h1')?.innerText || doc.title;
            const mlTitle = doc.querySelector('.ui-pdp-title')?.innerText;
            const amzTitle = doc.querySelector('#productTitle')?.innerText;

            const finalTitle = (amzTitle || mlTitle || ogTitle || pageTitle || '').trim();
            if (finalTitle) setProduct(prev => ({ ...prev, title: finalTitle }));

            // 3. Extract Price
            const ogPrice = doc.querySelector('meta[property="product:price:amount"]')?.content;
            const metaPrice = doc.querySelector('meta[itemprop="price"]')?.content;
            const amzPrice = doc.querySelector('.a-price .a-offscreen')?.innerText || doc.querySelector('#priceblock_ourprice')?.innerText;

            // Mercado Livre Price (Fraction + Cents)
            const mlPriceFrac = doc.querySelector('.andes-money-amount__fraction')?.innerText;
            const mlPriceCents = doc.querySelector('.andes-money-amount__cents')?.innerText;
            const mlPriceSym = doc.querySelector('.andes-money-amount__currency-symbol')?.innerText || 'R$';

            let detectedPrice = '';
            if (amzPrice) {
                detectedPrice = amzPrice.trim();
            } else if (mlPriceFrac) {
                detectedPrice = `${mlPriceSym} ${mlPriceFrac}${mlPriceCents ? ',' + mlPriceCents : ''}`;
            } else if (ogPrice || metaPrice) {
                detectedPrice = ogPrice || metaPrice;
            }

            if (detectedPrice) {
                setProduct(prev => ({ ...prev, price: detectedPrice }));
                const numericStr = detectedPrice.replace(/[^\d.,]/g, '').replace('.', '').replace(',', '.');
                const numericPrice = parseFloat(numericStr);
                if (!isNaN(numericPrice)) {
                    if (numericPrice > 2000) setProduct(prev => ({ ...prev, priceTier: '$$$' }));
                    else if (numericPrice > 500) setProduct(prev => ({ ...prev, priceTier: '$$' }));
                    else setProduct(prev => ({ ...prev, priceTier: '$' }));
                }
            }

            // 4. Extract Brand
            const mlBrand = doc.querySelector('.ui-pdp-brand-link')?.innerText;
            const amzBrand = doc.querySelector('#bylineInfo')?.innerText || doc.querySelector('#brand')?.innerText;
            const metaBrand = doc.querySelector('meta[property="product:brand"]')?.content;

            const cleanAmzBrand = amzBrand ? amzBrand.replace('Visite a loja ', '').replace('Marca: ', '').trim() : null;
            const finalBrand = (mlBrand || cleanAmzBrand || metaBrand || '').trim();
            if (finalBrand) setProduct(prev => ({ ...prev, brand: finalBrand }));

            // 5. Extract Description
            const ogDesc = doc.querySelector('meta[property="og:description"]')?.content;
            const metaDesc = doc.querySelector('meta[name="description"]')?.content;
            const amzDesc = doc.querySelector('#feature-bullets')?.innerText;

            const finalDesc = (amzDesc || ogDesc || metaDesc || '').trim().substring(0, 500);
            if (finalDesc) setProduct(prev => ({ ...prev, about: finalDesc }));
        } catch (error) {
            console.error("Error scraping product data:", error);
            if (error.message.includes('Failed to fetch')) {
                alert('Erro de conexão ao buscar dados. O site pode estar bloqueando o acesso automático. Tente preencher manualmente ou tente novamente em instantes.');
            }
        } finally {
            setFetchingImages(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setProduct(prev => ({ ...prev, image: downloadURL }));
            alert('Imagem carregada com sucesso!');
        } catch (error) {
            console.error("Error uploading image:", error);
            alert('Erro ao carregar imagem.');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleEditProduct = (item) => {
        setIsEditing(true);
        setEditingId(item.id);
        setProduct({
            title: item.title || '',
            brand: item.brand || '',
            category: item.category || 'Tech',
            price: item.price || '',
            image: item.image || '',
            url: item.url || '',
            badge: item.badge || '',
            about: item.about || '',
            priceTier: item.priceTier || '$$',
            list: item.list || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditingId(null);
        setProduct({ title: '', brand: '', category: 'Tech', price: '', image: '', url: '', badge: '', about: '', priceTier: '$$', list: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const productRef = doc(db, "products", editingId);
                await updateDoc(productRef, {
                    ...product,
                    updatedAt: serverTimestamp()
                });
                setAllProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...product } : p));
                alert('Produto atualizado com sucesso!');
                cancelEdit();
            } else {
                const newProduct = {
                    ...product,
                    createdAt: serverTimestamp(),
                    archived: false
                };
                const docRef = await addDoc(collection(db, "products"), newProduct);
                setAllProducts(prev => [{ id: docRef.id, ...newProduct }, ...prev]);
                alert('Produto salvo com sucesso!');
                setProduct({ title: '', brand: '', category: 'Tech', price: '', image: '', url: '', badge: '', about: '', priceTier: '$$', list: '' });
            }
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar.');
        }
    };

    if (authLoading) {
        return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Verificando permissões...</div>;
    }

    if (!user) {
        return (
            <div className="container" style={{ padding: '120px 0', textAlign: 'center', maxWidth: '400px' }}>
                <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <img src="/acervo.png" alt="Acervo Logo" style={{ height: '42px', marginBottom: '24px' }} />
                    <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>Acesso Restrito</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Faça login com sua conta do Google para gerenciar o acervo.</p>
                    <button onClick={handleLogin} className="btn-primary">
                        Entrar com Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container admin-container">
            <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1>Painel Administrativo</h1>
                    <p>Olá, {user.displayName} ({user.email}).</p>
                </div>
                <button onClick={handleLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <LogOut size={16} /> Sair
                </button>
            </header>

            <div className="admin-grid">
                <main className="admin-main">
                    <section className="admin-section">
                        <h2><Package size={20} /> {isEditing ? 'Editar Produto' : 'Novo Produto'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Título do Produto</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={product.title}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Studio Display"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Marca</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={product.brand}
                                        onChange={handleInputChange}
                                        placeholder="Ex: Apple"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Categoria</label>
                                    <select
                                        name="category"
                                        value={product.category}
                                        onChange={handleInputChange}
                                    >
                                        {PRODUCT_CATEGORIES.map(cat => (
                                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Preço</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={product.price}
                                        onChange={handleInputChange}
                                        placeholder="Ex: $1,599"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Faixa de Preço</label>
                                    <div className="price-tier-selector">
                                        {['$', '$$', '$$$'].map(tier => (
                                            <button
                                                key={tier}
                                                type="button"
                                                className={`tier-btn ${product.priceTier === tier ? 'active' : ''}`}
                                                onClick={() => setProduct(prev => ({ ...prev, priceTier: tier }))}
                                            >
                                                {tier}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Badge (Opcional)</label>
                                <input
                                    type="text"
                                    name="badge"
                                    value={product.badge}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Destaque"
                                />
                            </div>

                            <div className="form-group">
                                <label>Vincular a uma Lista (Opcional)</label>
                                <select
                                    name="list"
                                    value={product.list}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Nenhuma lista</option>
                                    {lists.map((l, idx) => (
                                        <option key={l.id || l.slug || `list-opt-${idx}`} value={l.slug || l.id}>{l.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label><LinkIcon size={14} style={{ marginRight: '4px' }} /> Link do Produto</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="url"
                                        name="url"
                                        value={product.url}
                                        onChange={handleInputChange}
                                        onBlur={(e) => scrapeProductData(e.target.value)}
                                        placeholder="https://..."
                                        required
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={() => scrapeProductData(product.url)}
                                        disabled={fetchingImages}
                                        style={{ width: 'auto', padding: '0 12px' }}
                                    >
                                        {fetchingImages ? <Loader2 size={16} className="animate-spin" /> : 'Buscar Dados'}
                                    </button>
                                </div>
                            </div>

                            {scrapedImages.length > 0 && (
                                <div className="form-group">
                                    <label>Fotos encontradas (clique para selecionar)</label>
                                    <div className="scraped-images-grid">
                                        {scrapedImages.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className={`scraped-img-item ${product.image === img ? 'selected' : ''}`}
                                                onClick={() => setProduct(prev => ({ ...prev, image: img }))}
                                            >
                                                <img src={img} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <label><ImageIcon size={14} style={{ marginRight: '4px' }} /> URL da Imagem</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="url"
                                        name="image"
                                        value={product.image}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                        required
                                        style={{ flex: 1 }}
                                    />
                                    <label className="btn-secondary" style={{ width: 'auto', padding: '0 12px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        {uploadingImage ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                                        <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Descrição do Produto (Sobre)</label>
                                <textarea
                                    name="about"
                                    value={product.about}
                                    onChange={handleInputChange}
                                    placeholder="Descreva os detalhes, materiais e o que torna este produto especial..."
                                    rows={4}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button type="submit" className="btn-primary">
                                    <Save size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                    {isEditing ? 'Salvar Alterações' : 'Publicar Produto'}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={cancelEdit} className="btn-secondary" style={{ width: 'auto' }}>
                                        <X size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </section>

                    <section className="admin-section">
                        <h2><ListIcon size={20} /> Categorias do acervo.</h2>
                        <div className="admin-categories-browser">
                            {PRODUCT_CATEGORIES.map((cat, idx) => {
                                const Icon = cat.icon;
                                const count = allProducts.filter(p => p.category === cat.name).length;
                                return (
                                    <button
                                        key={`cat-${cat.name}-${idx}`}
                                        className={`category-pill-admin ${selectedCategory === cat.name ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                                    >
                                        <Icon size={16} />
                                        <span>{cat.name}</span>
                                        <span className="count-tag">{count}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {selectedCategory && (
                            <div className="category-products-list">
                                <h3>Gerenciando: {selectedCategory}</h3>
                                {allProducts.filter(p => p.category === selectedCategory).length > 0 ? (
                                    <div className="admin-products-table">
                                        {allProducts
                                            .filter(p => p.category === selectedCategory)
                                            .map(item => (
                                                <div key={item.id} className={`admin-product-row ${item.archived ? 'is-archived' : ''}`}>
                                                    <div className="prod-main-info">
                                                        <img src={item.image} alt="" className="prod-thumb" />
                                                        <div>
                                                            <div className="prod-item-title">{item.title}</div>
                                                            <div className="prod-item-brand">{item.brand} • {item.price}</div>
                                                        </div>
                                                    </div>
                                                    <div className="prod-actions">
                                                        <button
                                                            title="Editar"
                                                            onClick={() => handleEditProduct(item)}
                                                            className="action-btn"
                                                        >
                                                            <Edit2 size={14} />
                                                        </button>
                                                        <button
                                                            title={item.archived ? "Desarquivar" : "Arquivar"}
                                                            onClick={() => handleArchiveProduct(item.id, item.archived)}
                                                            className="action-btn"
                                                        >
                                                            <Archive size={14} color={item.archived ? "var(--accent-color)" : "currentColor"} />
                                                        </button>
                                                        <button
                                                            title="Excluir"
                                                            onClick={() => handleDeleteProduct(item.id)}
                                                            className="action-btn text-danger"
                                                        >
                                                            <Trash size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <p className="empty-msg">Nenhum produto cadastrado nesta categoria.</p>
                                )}
                            </div>
                        )}
                    </section>
                </main>

                <aside className="admin-sidebar">
                    <section className="admin-section">
                        <h2><ListIcon size={20} /> Listas / Coleções</h2>
                        <div className="list-manager">
                            {lists.map((list, idx) => (
                                <div key={list.id || `list-${idx}`} className="list-manager-item">
                                    <div className="list-info">
                                        <span className="list-name">{list.name}</span>
                                        <span className="list-count">{list.count || 0} produtos</span>
                                    </div>
                                    <button className="text-secondary" onClick={() => handleDeleteList(list.id)}><Trash size={14} /></button>
                                </div>
                            ))}
                        </div>
                        <div className="form-group" style={{ marginTop: '24px', marginBottom: '0' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    placeholder="Nova lista..."
                                    value={newListName}
                                    onChange={(e) => setNewListName(e.target.value)}
                                    style={{ padding: '8px 12px' }}
                                />
                                <button className="btn-secondary" onClick={handleAddList}><Plus size={18} /></button>
                            </div>
                        </div>
                    </section>

                    <section className="admin-section">
                        <h2><Package size={20} /> Solicitações / Feedback</h2>
                        <div className="feedback-manager">
                            {feedback.length > 0 ? (
                                feedback.map((item, idx) => (
                                    <div key={item.id || `fb-${idx}`} className="feedback-item">
                                        <div className="feedback-header">
                                            <strong>{item.name}</strong>
                                            <button className="text-secondary" onClick={() => handleDeleteFeedback(item.id)}><Trash size={12} /></button>
                                        </div>
                                        <span className="feedback-email">{item.email}</span>
                                        <p className="feedback-msg">{item.message}</p>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Nenhuma solicitação no momento.</p>
                            )}
                        </div>
                    </section>

                    <section className="admin-section">
                        <h2>Prévia</h2>
                        <div className="preview-card-compact">
                            <div className="preview-image">
                                {product.image ? (
                                    <img src={product.image} alt="Preview" />
                                ) : (
                                    <ImageIcon size={40} color="var(--border-color)" />
                                )}
                            </div>
                            <div className="preview-details">
                                <div className="preview-brand">{product.brand || 'Marca'}</div>
                                <h3 className="preview-title">{product.title || 'Título do Produto'}</h3>
                                <div className="preview-price" style={{ fontWeight: '600' }}>{product.price || '$0'}</div>
                            </div>
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default Admin;
