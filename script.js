/**
 * Chicken World - Core Logic
 */

// --- Constants & Config ---
const ROLES = {
    CLIENT: 'client',
    SHOPKEEPER: 'shopkeeper',
    ADMIN: 'admin'
};

const DEFAULT_USERS = [
    { username: 'admin', password: '123', role: ROLES.ADMIN },
    { username: 'shop', password: '123', role: ROLES.SHOPKEEPER },
    { username: 'client', password: '123', role: ROLES.CLIENT }
];

const DEFAULT_FOOD_ITEMS = [
    {
        id: 1,
        name: 'Classic Chicken Burger',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60',
        price: 150,
        rating: 4.5
    },
    {
        id: 2,
        name: 'Spicy Fried Chicken',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=60',
        price: 220,
        rating: 4.8
    },
    {
        id: 3,
        name: 'Grilled Chicken Salad',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60',
        price: 180,
        rating: 4.2
    },
    {
        id: 4,
        name: 'Chicken Pizza',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60',
        price: 350,
        rating: 4.6
    },
    {
        id: 5,
        name: 'Chicken Wings (6pcs)',
        image: 'https://images.unsplash.com/photo-1527477396000-64ca9c0016cb?auto=format&fit=crop&w=500&q=60',
        price: 199,
        rating: 4.7
    },
    {
        id: 6,
        name: 'Chicken Wrap',
        image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=60',
        price: 130,
        rating: 4.3
    }
];

// --- Initialization ---
function initApp() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem('foodItems')) {
        localStorage.setItem('foodItems', JSON.stringify(DEFAULT_FOOD_ITEMS));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify({}));
    }
    if (!localStorage.getItem('wishlist')) {
        localStorage.setItem('wishlist', JSON.stringify({}));
    }
}

// --- Utils ---
function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function formatCurrency(amount) {
    return '₹' + amount.toFixed(2);
}

function showToast(message) {
    // Check if toast element exists, if not create it
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.innerText = message;
    toast.className = 'toast show';

    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// --- Auth Functions ---
function login(username, password, role) {
    const users = getData('users');
    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

function register(username, password, role) {
    const users = getData('users');
    if (users.find(u => u.username === username)) {
        return false; // User exists
    }

    users.push({ username, password, role });
    setData('users', users);
    return true;
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function checkSession(requiredRole = null) {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }

    if (requiredRole && user.role !== requiredRole) {
        alert('Unauthorized access');
        window.location.href = 'index.html'; // Or respective dashboard
        return null;
    }

    return user;
}

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}


// --- Execute Init ---
initApp();
