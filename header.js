const headerHTML = `
    <header>
        <div class="header-top">
            <a href="index.html" class="header-logo">
                <img src="images/logo.png" alt="SONIC BOX logo" class="header-logo-img">
            </a>
            <div class="search-group">
                <div class="categories-dropdown">
                    <button class="categories-btn" onclick="toggleCategories()" title="Filtrar por categoría">
                        <span class="icon"><img src="images/Categorias.png" alt="Categorías"></span>
                        <span class="text">Categorías</span>
                    </button>
                    <div class="dropdown-menu" id="dropdownMenu">
                        <a href="#" onclick="filterByCategory('Todos')">Todos</a>
                        <a href="#" onclick="filterByCategory('Audio')">Audio</a>
                        <a href="#" onclick="filterByCategory('Gaming')">Gaming</a>
                        <a href="como-conectar-bocina-bluetooth.html">Guía: conectar bocina Bluetooth</a>
                    </div>
                </div>
                <div class="search-container">
                    <input type="text" placeholder="Buscar en SONIC BOX" id="searchInput">
                    <button onclick="performSearch()" title="Buscar productos">
                        <img src="images/Buscador.png" alt="Buscar">
                    </button>
                </div>
            </div>
            <div class="header-right">
                <div class="header-account header-user" id="accountSection">
                    <!-- Se actualiza dinámicamente según el estado de sesión -->
                </div>
                <div class="header-account header-favorites">
                    <a href="favoritos.html" title="Ver productos favoritos">
                        <span class="icon"><img src="images/Favoritos.png" alt="Favoritos"></span>
                        <span class="text">Mis Favoritos</span>
                    </a>
                </div>
                
                <button class="cart-btn" onclick="openCart()" title="Ver carrito de compras">
                    <span class="icon"><img src="images/Carrito.png" alt="Carrito"></span>
                    <span class="text">Carrito</span>
                    <span class="cart-count cart-count--empty" aria-live="polite"><span id="cart-count">0</span></span>
                </button>
            </div>
        </div>
    </header>
`;

const chatHTML = `
    <button class="chat-bubble" id="chatBubble" onclick="openChat()" title="Abrir chat">
        <img src="images/Chat.png" alt="Chat">
    </button>
    <div class="chat-panel hidden" id="chatPanel">
        <div class="chat-header">
            <h3>SONIC BOX</h3>
            <button class="chat-close" onclick="closeChat()">✕</button>
        </div>
        <div class="chat-messages" id="chatMessages">
            <div class="chat-message bot">
                <strong>Hola, buenos tardes. 👋</strong><br>
                Gracias por su comunicación a SONIC BOX, mi nombre es Byron. 😊<br><br>
                ¿Con quién tenemos el gusto?
            </div>
        </div>
        <div class="chat-input-area">
            <div class="chat-actions">
                <button onclick="attachImage()" title="Enviar imagen">
                    <img src="images/Enviar imagen.png" alt="Enviar imagen">
                </button>
            </div>
            <textarea class="chat-input" id="chatInput" placeholder="Escribe tu mensaje..." rows="1"></textarea>
            <button class="chat-send" onclick="sendMessage()">➤</button>
        </div>
    </div>
`;

let categoryMenu = null;

function insertSiteHeader() {
    const placeholder = document.getElementById('site-header');
    if (placeholder) {
        placeholder.innerHTML = headerHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
    insertChatWidget();
    categoryMenu = document.getElementById('dropdownMenu');
    updateCartCount();
    applyTheme();
    insertProductFavoriteButton();
    updateAllFavoriteButtons();
    updateAccountSection();

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch();
            }
        });
    }
}

function updateAccountSection() {
    const accountSection = document.getElementById('accountSection');
    if (!accountSection) return;
    
    const user = getCurrentUser();
    if (user) {
        accountSection.innerHTML = `
            <a href="#" onclick="handleLogout()" title="Cerrar sesión">
                <span class="icon"><img src="images/Usuario.png" alt="Usuario"></span>
                <span class="text">${user.name}</span>
            </a>
        `;
    } else {
        accountSection.innerHTML = `
            <a href="login.html" title="Acceder a mi cuenta">
                <span class="icon"><img src="images/Usuario.png" alt="Usuario"></span>
                <span class="text">Mi Cuenta</span>
            </a>
        `;
    }
}

function handleLogout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        logout();
    }
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
        counter.textContent = String(count);
    }
    document.querySelectorAll('.cart-count').forEach(el => {
        el.classList.toggle('cart-count--empty', count === 0);
    });
}

window.updateCartCount = updateCartCount;

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
    document.querySelectorAll('[id^="fav-btn-"]').forEach(btn => {
        const id = parseInt(btn.id.replace('fav-btn-', ''), 10);
        if (!Number.isNaN(id)) {
            updateFavoriteButton(id);
        }
    });
}

function getProductIdFromPage() {
    const productInfo = document.querySelector('.product-info');
    if (productInfo?.dataset?.productId) {
        const id = Number(productInfo.dataset.productId);
        return Number.isNaN(id) ? null : id;
    }
    if (typeof productId !== 'undefined') {
        const id = Number(productId);
        return Number.isNaN(id) ? null : id;
    }
    const searchButton = document.querySelector('[id^="fav-btn-"]');
    if (searchButton) {
        const id = Number(searchButton.id.replace('fav-btn-', ''));
        return Number.isNaN(id) ? null : id;
    }
    return null;
}

function insertProductFavoriteButton() {
    const productInfo = document.querySelector('.product-info');
    if (!productInfo) return;

    const id = getProductIdFromPage();
    if (!id) return;
    if (document.getElementById('fav-btn-' + id)) return;

    const title = productInfo.querySelector('.product-title');
    if (!title) return;

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '0.75rem';
    wrapper.style.flexWrap = 'wrap';
    wrapper.style.marginBottom = '1rem';

    const button = document.createElement('button');
    button.className = 'favorite-btn';
    button.type = 'button';
    button.id = 'fav-btn-' + id;
    button.textContent = '♡';
    button.addEventListener('click', () => toggleFavorite(id));

    wrapper.appendChild(button);
    productInfo.insertBefore(wrapper, title);
    wrapper.appendChild(title);
    updateFavoriteButton(id);
}

function insertChatWidget() {
    if (document.getElementById('chatBubble') || document.getElementById('chatPanel')) {
        return;
    }
    document.body.insertAdjacentHTML('beforeend', chatHTML);
}

function applyTheme() {
    const storedTheme = localStorage.getItem('theme') || 'light';
    const darkMode = storedTheme === 'dark';
    document.body.classList.toggle('dark-mode', darkMode);
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

document.addEventListener('DOMContentLoaded', () => {
    insertSiteHeader();
    if (typeof initLoginPage === 'function') {
        initLoginPage();
    }
    if (typeof initRegisterPage === 'function') {
        initRegisterPage();
    }
});
