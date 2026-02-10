
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

// Hardcoded fallback data
export const hardcodedProducts = [
    { id: 1, title: "Studio Display", brand: "Apple", category: "Tech", price: "$1,599", image: "https://assets.curated.supply/studio%20display.webp", url: "#" },
    { id: 2, title: "151 Stealth Backpack", brand: "Grams28", category: "Acessórios", price: "$889", image: "https://assets.curated.supply/Grams28_151%20Stealth%20Backpack.webp", url: "#" },
    { id: 3, title: "Aeron", brand: "Herman Miller", category: "Escritório", price: "$1,930", image: "https://assets.curated.supply/aeron.webp", url: "#" },
    { id: 4, title: "Stagg EKG Electric Kettle", brand: "Fellow", category: "Casa", price: "$200", image: "https://assets.curated.supply/fellow_stagg.webp", url: "#" },
    { id: 5, title: "911 Turbo S", brand: "Porsche", category: "Transporte", price: "$270,000", image: "https://assets.curated.supply/911.webp", url: "#", badge: "Destaque" },
    { id: 6, title: "Speedmaster", brand: "Omega", category: "Relógios", price: "$7,800", image: "https://assets.curated.supply/Omega_Speedmaster.webp", url: "#", badge: "Destaque" },
    { id: 7, title: "Dieter Rams: The Complete Works", brand: "Phaidon", category: "Livros", price: "$59", image: "https://assets.curated.supply/Phaidon_Dieter%20Rams_%20The%20Complete%20Works.webp", url: "#" },
    { id: 8, title: "Virgil Abloh. Nike. ICONS", brand: "Taschen", category: "Livros", price: "$59", image: "https://assets.curated.supply/Taschen_Virgil%20Abloh.%20Nike.%20ICONS.webp", url: "#", badge: "Destaque" },
    { id: 9, title: "Icons 10295 Porsche 911", brand: "Lego", category: "Casa", price: "$170", image: "https://assets.curated.supply/Lego%20_%20Icons%2010295%20Porsche%20911.webp", url: "#", badge: "Destaque" },
    { id: 10, title: "k•no•b•1", brand: "Work Louder", category: "Escritório", price: "$439", image: "https://assets.curated.supply/Work Louder_k%E2%80%A2no%E2%80%A2b%E2%80%A21.webp", url: "#", badge: "Destaque" },
    { id: 11, title: "Nothing Phone (3)", brand: "Nothing", category: "Tech", price: "$799", image: "https://assets.curated.supply/Nothing_Phone(3).webp", url: "#" },
    { id: 12, title: "BF", brand: "Sigma", category: "Câmeras", price: "$2,199", image: "https://assets.curated.supply/Sigma_BF.webp", url: "#", badge: "Destaque" },
    { id: 13, title: "Datejust", brand: "Rolex", category: "Relógios", price: "$10,000", image: "https://assets.curated.supply/Rolex_Datejust.webp", url: "#", badge: "Destaque" },
    { id: 14, title: "Saint-Florentin Wallet", brand: "Goyard", category: "Acessórios", price: "$1,500", image: "https://assets.curated.supply/goyard_saintflorentinwallet.webp", url: "#" },
    { id: 15, title: "Base One Max 3-in-1", brand: "Nomad", category: "Tech", price: "$150", image: "https://assets.curated.supply/Nomad_%20Base%20One%20Max%203-in-1.webp", url: "#" }
];

export const hardcodedLists = [
    {
        name: 'Home Office Goals',
        slug: 'office',
        count: 12,
        images: [
            'https://assets.curated.supply/studio%20display.webp',
            'https://assets.curated.supply/aeron.webp',
            'https://assets.curated.supply/Work Louder_k%E2%80%A2no%E2%80%A2b%E2%80%A21.webp',
            'https://assets.curated.supply/Oakywood_Standing%20Desk%20Pro.webp'
        ]
    },
    {
        name: 'Cult of Coffee',
        slug: 'coffee',
        count: 8,
        images: [
            'https://assets.curated.supply/fellow_stagg.webp',
            'https://assets.curated.supply/xbloomstudio.webp',
            'https://assets.curated.supply/Terra%20Kaffe_TK-02.webp',
            'https://assets.curated.supply/Fellow%20Ode%20Brew%20Grinder%20Gen%202.webp'
        ]
    },
    {
        name: 'For Your Coffee Table',
        slug: 'coffeetable',
        count: 15,
        images: [
            'https://assets.curated.supply/Phaidon_Dieter%20Rams_%20The%20Complete%20Works.webp',
            'https://assets.curated.supply/Taschen_Virgil%20Abloh.%20Nike.%20ICONS.webp',
            'https://assets.curated.supply/Phaidon_Braun_%20Designed%20to%20Keep.webp',
            'https://assets.curated.supply/LMS_Helvetica%20Forever.webp'
        ]
    },
    {
        name: 'Audiophile Core',
        slug: 'audio',
        count: 6,
        images: [
            'https://assets.curated.supply/airpods%20max.webp',
            'https://assets.curated.supply/BangOlufsen_Beosound%20Level.webp',
            'https://assets.curated.supply/Nothing_Headphones(1).webp',
            'https://assets.curated.supply/BangOlufsen_Beosound%20A1%203rd%20Gen.webp'
        ]
    },
    {
        name: 'Charging Design',
        slug: 'charging',
        count: 5,
        images: [
            'https://assets.curated.supply/Nomad_%20Base%20One%20Max%203-in-1.webp',
            'https://assets.curated.supply/Aulumu_M01%204-in-1%20Folding%20Wireless%20Charging%20Station%20%26%20Pad.webp',
            'https://assets.curated.supply/Native Union_Rise%203-in-1%20Magnetic%20Wireless%20Charger.webp',
            'https://assets.curated.supply/Courant_CATCH_3%20Classics.webp'
        ]
    },
    {
        name: 'Nicer Everyday Objects',
        slug: 'everyday',
        count: 20,
        images: [
            'https://assets.curated.supply/Aesop%20Polish%20Bar.webp',
            'https://assets.curated.supply/Dyson%20v15.webp',
            'https://assets.curated.supply/Elago_Magnetic%20Leather%20Card%20Holder.webp',
            'https://assets.curated.supply/Crust_P%E2%80%931%20Pepper%20Mill.webp'
        ]
    },
    {
        name: 'Deskworthy',
        slug: 'desk',
        count: 18,
        images: [
            'https://assets.curated.supply/Lofree_%20Flow%202.webp',
            'https://assets.curated.supply/Lofree_%20Flow%2084.webp',
            'https://assets.curated.supply/Native Union_Rise%203-in-1%20Magnetic%20Wireless%20Charger.webp',
            'https://assets.curated.supply/Nomad_%20Base%20One%20Max%203-in-1.webp'
        ]
    },
    {
        name: 'Athletes Only',
        slug: 'athletes',
        count: 4,
        images: [
            'https://assets.curated.supply/Killspencer_Indoor%20Mini%20Basketball%20Kit.webp',
            'https://assets.curated.supply/Killspencer_Soccer%20Ball.webp',
            'https://assets.curated.supply/Killspencer_Indoor%20Mini%20Basketball.webp',
            'https://assets.curated.supply/Adidas_Copa%20Mundial.webp'
        ]
    }
];

export const products = hardcodedProducts;

export const getProducts = async () => {
    try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return products.length > 0 ? products : hardcodedProducts;
    } catch (error) {
        console.error("Error fetching products from Firestore:", error);
        return hardcodedProducts;
    }
};

export const getLists = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "lists"));
        const lists = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return lists.length > 0 ? lists : hardcodedLists;
    } catch (error) {
        console.error("Error fetching lists from Firestore:", error);
        return hardcodedLists;
    }
};
export const getProductById = async (id) => {
    try {
        const products = await getProducts();
        // Try to find by id (string or number)
        return products.find(p => p.id.toString() === id.toString());
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return hardcodedProducts.find(p => p.id.toString() === id.toString());
    }
};
