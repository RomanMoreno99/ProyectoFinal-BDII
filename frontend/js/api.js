/**
 * API Service
 * Gestiona la comunicación con el backend
 */

// Configuración
const API_BASE_URL = 'http://localhost:3000/api';
const API_TIMEOUT = 10000; // 10 segundos

/**
 * Realiza una petición fetch con timeout
 */
async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Timeout: La solicitud tardó demasiado');
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

/**
 * PRODUCTOS
 */

// Obtener todos los productos
async function getProducts() {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/productos`);
        return response;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}

// Crear nuevo producto
async function createProduct(product) {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/productos`, {
            method: 'POST',
            body: JSON.stringify(product),
        });
        return response;
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
}

/**
 * CLIENTES
 */

// Obtener todos los clientes
async function getClients() {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/clientes`);
        return response;
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        throw error;
    }
}

// Crear nuevo cliente
async function createClient(client) {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/clientes`, {
            method: 'POST',
            body: JSON.stringify(client),
        });
        return response;
    } catch (error) {
        console.error('Error al crear cliente:', error);
        throw error;
    }
}

/**
 * PEDIDOS
 */

// Obtener todos los pedidos
async function getOrders() {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/pedidos`);
        return response;
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        throw error;
    }
}

// Crear nuevo pedido
async function createOrder(order) {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/pedidos`, {
            method: 'POST',
            body: JSON.stringify(order),
        });
        return response;
    } catch (error) {
        console.error('Error al crear pedido:', error);
        throw error;
    }
}

/**
 * REPORTES
 */

// Obtener ventas por producto
async function getSalesByProduct() {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/informes/ventas/producto`);
        return response;
    } catch (error) {
        console.error('Error al obtener ventas por producto:', error);
        throw error;
    }
}

// Obtener ventas por categoría
async function getSalesByCategory() {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/informes/ventas/categoria`);
        return response;
    } catch (error) {
        console.error('Error al obtener ventas por categoría:', error);
        throw error;
    }
}

// Obtener ventas por mes
async function getSalesByMonth() {
    try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/informes/ventas/mes`);
        return response;
    } catch (error) {
        console.error('Error al obtener ventas por mes:', error);
        throw error;
    }
}

/**
 * Estadísticas
 */
async function getStats() {
    try {
        const [products, clients, orders, salesByProduct] = await Promise.all([
            getProducts(),
            getClients(),
            getOrders(),
            getSalesByProduct(),
        ]);

        let totalRevenue = 0;
        if (Array.isArray(salesByProduct)) {
            totalRevenue = salesByProduct.reduce((sum, item) => sum + (item.total_ingresos || 0), 0);
        }

        return {
            products: Array.isArray(products) ? products.length : 0,
            clients: Array.isArray(clients) ? clients.length : 0,
            orders: Array.isArray(orders) ? orders.length : 0,
            revenue: totalRevenue,
        };
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        return { products: 0, clients: 0, orders: 0, revenue: 0 };
    }
}
