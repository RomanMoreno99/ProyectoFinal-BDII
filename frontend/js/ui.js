/**
 * UI Manager
 * Gestiona la interfaz de usuario y eventos del DOM
 */

// Referencias del DOM
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const cartCount = document.querySelector('.cart-count');
const toastEl = document.getElementById('toast');

// Variables globales
let allProducts = [];
let allClients = [];
let allOrders = [];
let currentPage = 'inicio';

/**
 * Cambiar página
 */
function changePage(pageName) {
    // Actualizar nav links
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageName);
    });

    // Ocultar todas las páginas
    pages.forEach(page => page.classList.remove('active'));

    // Mostrar página seleccionada
    const page = document.getElementById(pageName);
    if (page) {
        page.classList.add('active');
        currentPage = pageName;

        // Cerrar menú mobile
        navMenu.classList.remove('show');
        menuToggle.classList.remove('active');

        // Cargar datos específicos de la página
        switch (pageName) {
            case 'productos':
                loadProducts();
                break;
            case 'carrito':
                loadCart();
                break;
            case 'pedidos':
                loadOrders();
                break;
            case 'clientes':
                loadClients();
                break;
            case 'reportes':
                loadReports();
                break;
            case 'inicio':
                loadStats();
                break;
        }
    }
}

/**
 * Event Listeners para navegación
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        changePage(link.dataset.page);
    });
});

// Toggle menú mobile
menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    menuToggle.classList.toggle('active');
});

/**
 * Mostrar notificación Toast
 */
function showToast(message, type = 'info') {
    toastEl.textContent = message;
    toastEl.className = `toast show ${type}`;

    setTimeout(() => {
        toastEl.classList.remove('show');
    }, 3000);
}

/**
 * Formato de moneda
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
    }).format(value);
}

/**
 * Formato de fecha
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
}

/**
 * Cargar estadísticas
 */
async function loadStats() {
    try {
        const stats = await getStats();
        document.getElementById('stat-products').textContent = stats.products;
        document.getElementById('stat-clients').textContent = stats.clients;
        document.getElementById('stat-orders').textContent = stats.orders;
        document.getElementById('stat-revenue').textContent = formatCurrency(stats.revenue);
    } catch (error) {
        console.error('Error al cargar estadísticas:', error);
        showToast('Error al cargar estadísticas', 'error');
    }
}

/**
 * Cargar productos
 */
async function loadProducts() {
    try {
        allProducts = await getProducts();
        renderProducts(allProducts);
        loadCategories();
    } catch (error) {
        console.error('Error al cargar productos:', error);
        showToast('Error al cargar productos: ' + error.message, 'error');
    }
}

/**
 * Renderizar grid de productos
 */
function renderProducts(products) {
    const grid = document.getElementById('products-grid');

    if (!Array.isArray(products) || products.length === 0) {
        grid.innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 40px;">No hay productos disponibles</div>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">📦</div>
            <div class="product-info">
                <div class="product-category">${product.categoria || 'N/A'}</div>
                <h3 class="product-name">${product.nombre}</h3>
                <p class="product-description">${product.descripcion || ''}</p>
                <div class="product-footer">
                    <div>
                        <div class="product-price">${formatCurrency(parseFloat(product.precio))}</div>
                        <div class="product-stock ${product.stock === 0 ? 'stock-out' : product.stock < 5 ? 'stock-low' : ''}">
                            Stock: ${product.stock}
                        </div>
                    </div>
                </div>
                <button 
                    class="btn-add-cart" 
                    ${product.stock === 0 ? 'disabled' : ''}
                    onclick="addToCart('${product.id_producto}')"
                >
                    ${product.stock === 0 ? 'Agotado' : 'Agregar'}
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Agregar producto al carrito
 */
function addToCart(productId) {
    const product = allProducts.find(p => p.id_producto === productId);
    if (product && product.stock > 0) {
        cart.addItem(product);
        updateCartCount();
        showToast(`${product.nombre} agregado al carrito`, 'success');
    }
}

/**
 * Actualizar contador del carrito
 */
function updateCartCount() {
    cartCount.textContent = cart.getItemCount();
}

/**
 * Cargar categorías
 */
function loadCategories() {
    const categories = [...new Set(allProducts.map(p => p.categoria).filter(Boolean))];
    const select = document.getElementById('filter-category');
    const currentValue = select.value;

    select.innerHTML = '<option value="">Todas las categorías</option>' +
        categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');

    select.value = currentValue;
}

/**
 * Cargar carrito
 */
function loadCart() {
    const cartItemsEl = document.getElementById('cart-items');
    const items = cart.getItems();

    if (items.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cartItemsEl.innerHTML = items.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">📦</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.nombre}</div>
                    <div class="cart-item-price">${formatCurrency(parseFloat(item.precio_unitario))}</div>
                </div>
                <div class="cart-item-controls">
                    <input 
                        type="number" 
                        class="quantity-input" 
                        value="${item.cantidad}" 
                        min="1" 
                        max="${item.stock}"
                        onchange="updateCartQuantity('${item.id_producto}', this.value)"
                    >
                    <button class="btn-remove" onclick="removeFromCart('${item.id_producto}')">Eliminar</button>
                </div>
            </div>
        `).join('');
    }

    updateCartSummary();
}

/**
 * Actualizar cantidad en carrito
 */
function updateCartQuantity(productId, quantity) {
    const qty = parseInt(quantity) || 0;
    cart.updateQuantity(productId, qty);
    loadCart();
    updateCartCount();
}

/**
 * Eliminar del carrito
 */
function removeFromCart(productId) {
    cart.removeItem(productId);
    loadCart();
    updateCartCount();
    showToast('Producto eliminado del carrito', 'info');
}

/**
 * Actualizar resumen del carrito
 */
function updateCartSummary() {
    const subtotal = cart.getSubtotal();
    const shipping = cart.getShipping();
    const total = cart.getTotal();

    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('shipping').textContent = formatCurrency(shipping);
    document.getElementById('total').textContent = formatCurrency(total);
}

/**
 * Cargar pedidos
 */
async function loadOrders() {
    try {
        allOrders = await getOrders();
        renderOrders(allOrders);
    } catch (error) {
        console.error('Error al cargar pedidos:', error);
        showToast('Error al cargar pedidos: ' + error.message, 'error');
    }
}

/**
 * Renderizar tabla de pedidos
 */
function renderOrders(orders) {
    const tbody = document.getElementById('orders-body');

    if (!Array.isArray(orders) || orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay pedidos</td></tr>';
        return;
    }

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order._id || 'N/A'}</td>
            <td>${order.cliente?.nombre || order.cliente_id || 'N/A'}</td>
            <td>${formatDate(order.fecha_pedido)}</td>
            <td>${formatCurrency(parseFloat(order.total))}</td>
            <td><span class="status-badge status-${order.estado}">${order.estado}</span></td>
            <td>
                <button class="btn btn-small" onclick="viewOrder('${order._id}')">Ver</button>
            </td>
        </tr>
    `).join('');
}

/**
 * Cargar clientes
 */
async function loadClients() {
    try {
        allClients = await getClients();
        renderClients(allClients);
    } catch (error) {
        console.error('Error al cargar clientes:', error);
        showToast('Error al cargar clientes: ' + error.message, 'error');
    }
}

/**
 * Renderizar tabla de clientes
 */
function renderClients(clients) {
    const tbody = document.getElementById('clients-body');

    if (!Array.isArray(clients) || clients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay clientes</td></tr>';
        return;
    }

    tbody.innerHTML = clients.map(client => `
        <tr>
            <td>${client.id_cliente}</td>
            <td>${client.nombre}</td>
            <td>${client.correo}</td>
            <td>${client.telefono}</td>
            <td>${client.direccion}</td>
            <td>
                <button class="btn btn-small" onclick="editClient('${client.id_cliente}')">Editar</button>
            </td>
        </tr>
    `).join('');
}

/**
 * Cargar reportes
 */
async function loadReports() {
    try {
        const [productSales, categorySales, monthlySales] = await Promise.all([
            getSalesByProduct(),
            getSalesByCategory(),
            getSalesByMonth(),
        ]);

        renderReport('report-products', productSales, ['nombre', 'total_ingresos']);
        renderReport('report-categories', categorySales, ['_id', 'total_ingresos']);
        renderReport('report-months', monthlySales, ['_id', 'total_ingresos']);
    } catch (error) {
        console.error('Error al cargar reportes:', error);
        showToast('Error al cargar reportes: ' + error.message, 'error');
    }
}

/**
 * Renderizar reporte
 */
function renderReport(elementId, data, fields) {
    const container = document.getElementById(elementId);

    if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<p class="text-muted">No hay datos disponibles</p>';
        return;
    }

    container.innerHTML = data.map(item => {
        const name = item[fields[0]];
        const value = item[fields[1]];
        const displayName = typeof name === 'object' ? JSON.stringify(name) : name;

        return `
            <div class="report-item">
                <span class="report-item-name">${displayName}</span>
                <span class="report-item-value">${formatCurrency(value)}</span>
            </div>
        `;
    }).join('');
}

/**
 * Inicializar
 */
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    changePage('inicio');

    // Event listeners para búsqueda
    document.getElementById('search-products')?.addEventListener('input', (e) => {
        const search = e.target.value.toLowerCase();
        const filtered = allProducts.filter(p =>
            p.nombre.toLowerCase().includes(search) ||
            p.descripcion?.toLowerCase().includes(search)
        );
        renderProducts(filtered);
    });

    // Event listener para filtro de categoría
    document.getElementById('filter-category')?.addEventListener('change', (e) => {
        const category = e.target.value;
        const filtered = category
            ? allProducts.filter(p => p.categoria === category)
            : allProducts;
        renderProducts(filtered);
    });
});

/**
 * Funciones auxiliares
 */
function viewOrder(orderId) {
    console.log('Ver pedido:', orderId);
    showToast('Detalles del pedido: ' + orderId, 'info');
}

function editClient(clientId) {
    console.log('Editar cliente:', clientId);
    showToast('Editar cliente: ' + clientId, 'info');
}
