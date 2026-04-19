const headerHTML = `
    <header>
        <div class="header-top">
            <a href="index.html" class="header-logo">Tienda Nexus</a>
            <div class="search-group">
                <div class="categories-dropdown">
                    <button class="categories-btn" onclick="toggleCategories()" title="Abrir menú de categorías">
                        <span class="icon">📂</span>
                        <span class="text">Categorías</span>
                    </button>
                    <div class="dropdown-menu" id="dropdownMenu">
                        <a href="#" onclick="filterByCategory('Cocina')">Cocina</a>
                        <a href="#" onclick="filterByCategory('Refrigeración')">Refrigeración</a>
                        <a href="#" onclick="filterByCategory('Lavado')">Lavado</a>
                        <a href="#" onclick="filterByCategory('Entretenimiento')">Entretenimiento</a>
                        <a href="#" onclick="filterByCategory('Seguridad')">Seguridad</a>
                        <a href="#" onclick="filterByCategory('Todos')">Ver Todos</a>
                    </div>
                </div>
                <div class="search-container">
                    <input type="text" placeholder="Buscar electrodomésticos..." id="searchInput">
                    <button onclick="performSearch()" title="Buscar productos">🔍</button>
                </div>
            </div>
            <div class="header-right">
                <div class="header-account header-user">
                    <a href="login.html" title="Acceder a mi cuenta">
                        <span class="icon">👤</span>
                        <span class="text">Mi Cuenta</span>
                    </a>
                </div>
                <div class="header-account header-favorites">
                    <a href="favoritos.html" title="Ver productos favoritos">
                        <span class="icon">❤️</span>
                        <span class="text">Mis Favoritos</span>
                    </a>
                </div>
                <button class="cart-btn" onclick="openCart()" title="Ver carrito de compras">
                    <span class="icon">🛒</span>
                    <span class="text">Carrito</span>
                    <span class="cart-count">(<span id="cart-count">0</span>)</span>
                </button>
                <button class="theme-toggle" onclick="toggleTheme()" title="Modo oscuro">
                    <span class="icon">🌙</span>
                    <span class="text sr-only">Modo oscuro</span>
                </button>
            </div>
        </div>
    </header>
`;

let categoryMenu = null;

function insertSiteHeader() {
    const placeholder = document.getElementById('site-header');
    if (placeholder) {
        placeholder.innerHTML = headerHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
    categoryMenu = document.getElementById('dropdownMenu');
    updateCartCount();
    applyTheme();
    updateAllFavoriteButtons();
}

function toggleCategories() {
    if (!categoryMenu) {
        categoryMenu = document.getElementById('dropdownMenu');
    }
    if (categoryMenu) {
        categoryMenu.classList.toggle('active');
    }
}

function closeCategories() {
    if (categoryMenu) {
        categoryMenu.classList.remove('active');
    }
}

function isMainPage() {
    return window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
}

function filterByCategory(category) {
    closeCategories();
    if (isMainPage()) {
        const products = document.querySelectorAll('.products .product');
        products.forEach(product => {
            const productCategory = product.dataset.category || '';
            product.style.display = category === 'Todos' || productCategory === category ? 'block' : 'none';
        });
    } else {
        window.location.href = 'index.html#productos';
    }
}

function performSearch() {
    const query = document.getElementById('searchInput')?.value.trim();
    if (query) {
        window.location.href = `index.html?search=${encodeURIComponent(query)}`;
    } else {
        window.location.href = 'index.html#productos';
    }
}

function openCart() {
    window.location.href = 'carrito.html';
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const counter = document.getElementById('cart-count');
    if (counter) {
        counter.textContent = count;
    }
}

function toggleFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButton(id);
}

function updateFavoriteButton(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const btn = document.getElementById('fav-btn-' + id);
    if (btn) {
        if (favorites.includes(id)) {
            btn.classList.add('favorited');
            btn.textContent = '♥';
        } else {
            btn.classList.remove('favorited');
            btn.textContent = '♡';
        }
    }
}

function updateAllFavoriteButtons() {
    for (let i = 1; i <= 9; i++) {
        updateFavoriteButton(i);
    }
}

function applyTheme() {
    const storedTheme = localStorage.getItem('theme') || 'light';
    const darkMode = storedTheme === 'dark';
    document.body.classList.toggle('dark-mode', darkMode);
    updateThemeButton(darkMode);
}

function toggleTheme() {
    const darkMode = !document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    updateThemeButton(darkMode);
}

function updateThemeButton(isDark) {
    const button = document.querySelector('.theme-toggle');
    if (button) {
        button.textContent = isDark ? '☀️' : '🌙';
        button.title = isDark ? 'Modo claro' : 'Modo oscuro';
    }
}

document.addEventListener('click', (event) => {
    if (!event.target.closest('.categories-dropdown')) {
        closeCategories();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCategories();
    }
});

document.addEventListener('DOMContentLoaded', insertSiteHeader);
