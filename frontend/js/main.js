/**
 * Main Application
 * Orquesta todo el flujo de la aplicación
 */

/**
 * MANEJO DE MODALES
 */

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Cerrar modal al hacer click en X
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.classList.remove('show');
        }
    });
});

// Cerrar modal al hacer click fuera
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});

/**
 * PRODUCTOS
 */

document.getElementById('btn-new-product')?.addEventListener('click', () => {
    document.getElementById('form-product').reset();
    openModal('modal-product');
});

document.getElementById('form-product')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const product = {
            id_producto: document.getElementById('product-id').value,
            nombre: document.getElementById('product-name').value,
            descripcion: document.getElementById('product-description').value,
            precio: document.getElementById('product-price').value,
            stock: parseInt(document.getElementById('product-stock').value),
            categoria: document.getElementById('product-category').value,
        };

        await createProduct(product);
        closeModal('modal-product');
        loadProducts();
        showToast('Producto creado exitosamente', 'success');
    } catch (error) {
        showToast('Error al crear producto: ' + error.message, 'error');
    }
});

/**
 * CLIENTES
 */

document.getElementById('btn-new-client')?.addEventListener('click', () => {
    document.getElementById('form-client').reset();
    openModal('modal-client');
});

document.getElementById('form-client')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const client = {
            id_cliente: document.getElementById('client-id').value,
            nombre: document.getElementById('client-name').value,
            correo: document.getElementById('client-email').value,
            telefono: document.getElementById('client-phone').value,
            direccion: document.getElementById('client-address').value,
        };

        await createClient(client);
        closeModal('modal-client');
        loadClients();
        loadClientsForCheckout();
        showToast('Cliente creado exitosamente', 'success');
    } catch (error) {
        showToast('Error al crear cliente: ' + error.message, 'error');
    }
});

/**
 * CARRITO Y CHECKOUT
 */

document.getElementById('btn-checkout')?.addEventListener('click', () => {
    if (cart.getItemCount() === 0) {
        showToast('El carrito está vacío', 'error');
        return;
    }
    loadClientsForCheckout();
    openModal('modal-checkout');
    document.getElementById('checkout-total').textContent = formatCurrency(cart.getTotal());
});

document.getElementById('btn-continue-shopping')?.addEventListener('click', () => {
    changePage('productos');
});

// Cargar clientes en select del checkout
async function loadClientsForCheckout() {
    try {
        const clients = await getClients();
        const select = document.getElementById('checkout-client');
        select.innerHTML = '<option value="">-- Selecciona un cliente --</option>';

        if (Array.isArray(clients)) {
            clients.forEach(client => {
                const option = document.createElement('option');
                option.value = client.id_cliente;
                option.textContent = client.nombre;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error al cargar clientes para checkout:', error);
    }
}

// Nuevo cliente en checkout
document.getElementById('btn-new-checkout-client')?.addEventListener('click', () => {
    document.getElementById('form-checkout-client').reset();
    openModal('modal-checkout-client');
});

// Crear cliente en checkout
document.getElementById('form-checkout-client')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const client = {
            id_cliente: document.getElementById('checkout-client-id').value,
            nombre: document.getElementById('checkout-client-name').value,
            correo: document.getElementById('checkout-client-email').value,
            telefono: document.getElementById('checkout-client-phone').value,
            direccion: document.getElementById('checkout-client-address').value,
        };

        const newClient = await createClient(client);
        closeModal('modal-checkout-client');
        await loadClientsForCheckout();

        // Seleccionar el nuevo cliente
        document.getElementById('checkout-client').value = client.id_cliente;
        showToast('Cliente creado y seleccionado', 'success');
    } catch (error) {
        showToast('Error al crear cliente: ' + error.message, 'error');
    }
});

// Completar compra
document.getElementById('form-checkout')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const clientId = document.getElementById('checkout-client').value;

        if (!clientId) {
            showToast('Selecciona o crea un cliente', 'error');
            return;
        }

        const order = cart.toOrder(clientId);
        const createdOrder = await createOrder(order);

        cart.clear();
        updateCartCount();
        closeModal('modal-checkout');
        changePage('pedidos');
        loadOrders();

        showToast('¡Compra realizada exitosamente!', 'success');
    } catch (error) {
        showToast('Error al procesar pedido: ' + error.message, 'error');
    }
});

/**
 * Event Listeners de Botones en Hero
 */
document.querySelectorAll('.hero-buttons button').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const page = e.target.dataset.page;
        if (page) {
            changePage(page);
        }
    });
});

/**
 * Inicialización
 */
console.log('✅ Frontend cargado correctamente');
console.log('🔌 API Base URL:', API_BASE_URL);
console.log('📦 Versión: 1.0.0');
