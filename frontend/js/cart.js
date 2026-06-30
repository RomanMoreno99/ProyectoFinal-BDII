/**
 * Cart Management
 * Gestiona el carrito de compras con localStorage
 */

class Cart {
    constructor() {
        this.storageKey = 'tienda_carrito';
        this.items = this.loadFromStorage();
    }

    // Cargar carrito desde localStorage
    loadFromStorage() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error al cargar carrito:', error);
            return [];
        }
    }

    // Guardar carrito en localStorage
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        } catch (error) {
            console.error('Error al guardar carrito:', error);
        }
    }

    // Agregar producto al carrito
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id_producto === product.id_producto);

        if (existingItem) {
            existingItem.cantidad += quantity;
        } else {
            this.items.push({
                id_producto: product.id_producto,
                nombre: product.nombre,
                categoria: product.categoria,
                precio_unitario: product.precio,
                cantidad: quantity,
                stock: product.stock,
            });
        }

        this.saveToStorage();
        return this.items;
    }

    // Eliminar producto del carrito
    removeItem(productId) {
        this.items = this.items.filter(item => item.id_producto !== productId);
        this.saveToStorage();
        return this.items;
    }

    // Actualizar cantidad de un producto
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id_producto === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else if (quantity <= item.stock) {
                item.cantidad = quantity;
                this.saveToStorage();
            }
        }
        return this.items;
    }

    // Limpiar carrito
    clear() {
        this.items = [];
        this.saveToStorage();
        return this.items;
    }

    // Obtener carrito
    getItems() {
        return this.items;
    }

    // Contar artículos
    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.cantidad, 0);
    }

    // Calcular subtotal
    getSubtotal() {
        return this.items.reduce((sum, item) => {
            const price = typeof item.precio_unitario === 'object' ? 
                Object.values(item.precio_unitario).join('.') : 
                item.precio_unitario;
            return sum + (parseFloat(price) * item.cantidad);
        }, 0);
    }

    // Calcular total con envío
    getTotal() {
        const subtotal = this.getSubtotal();
        const shipping = subtotal > 100 ? 0 : 10; // Envío gratis por más de $100
        return subtotal + shipping;
    }

    // Obtener envío
    getShipping() {
        const subtotal = this.getSubtotal();
        return subtotal > 100 ? 0 : 10;
    }

    // Convertir carrito a formato de pedido
    toOrder(clientId) {
        return {
            cliente_id: clientId,
            productos: this.items,
            estado: 'pendiente',
            fecha_pedido: new Date().toISOString(),
        };
    }
}

// Instancia global del carrito
const cart = new Cart();
