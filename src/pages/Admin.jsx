
import React, { useState, useEffect } from 'react';
import { Plus, Package, List as ListIcon, Image as ImageIcon, Link as LinkIcon, Save, Trash, LogOut } from 'lucide-react';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth, googleProvider } from "../firebase";
import { getLists } from "../data";
import './Admin.css';

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
        badge: ''
    });

    const [lists, setLists] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

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
                const listsData = await getLists();
                setLists(listsData);

                const feedbackSnapshot = await getDocs(collection(db, "feedback"));
                const feedbackData = feedbackSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFeedback(feedbackData);

                setLoading(false);
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

    const handleSubmit = async (e) => {
        // ... (existing submit logic)
        e.preventDefault();
        try {
            const newProduct = { ...product, createdAt: serverTimestamp() };
            await addDoc(collection(db, "products"), newProduct);
            alert('Produto salvo com sucesso!');
            setProduct({ title: '', brand: '', category: 'Tech', price: '', image: '', url: '', badge: '' });
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
                        <h2><Package size={20} /> Novo Produto</h2>
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
                                        <option>Tech</option>
                                        <option>Casa</option>
                                        <option>Escritório</option>
                                        <option>Acessórios</option>
                                        <option>Relógios</option>
                                        <option>Pessoal</option>
                                        <option>Livros</option>
                                        <option>Viagem</option>
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
                                    <label>Badge (Opcional)</label>
                                    <input
                                        type="text"
                                        name="badge"
                                        value={product.badge}
                                        onChange={handleInputChange}
                                        placeholder="Ex: Destaque"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label><ImageIcon size={14} style={{ marginRight: '4px' }} /> URL da Imagem</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={product.image}
                                    onChange={handleInputChange}
                                    placeholder="https://..."
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label><LinkIcon size={14} style={{ marginRight: '4px' }} /> Link do Produto</label>
                                <input
                                    type="url"
                                    name="url"
                                    value={product.url}
                                    onChange={handleInputChange}
                                    placeholder="https://..."
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary">
                                <Save size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                Publicar Produto
                            </button>
                        </form>
                    </section>
                </main>

                <aside className="admin-sidebar">
                    <section className="admin-section">
                        <h2><ListIcon size={20} /> Listas / Coleções</h2>
                        <div className="list-manager">
                            {lists.map(list => (
                                <div key={list.id} className="list-manager-item">
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
                                feedback.map(item => (
                                    <div key={item.id} className="feedback-item">
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
