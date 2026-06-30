# Frontend - Sistema de Tienda Online

## Descripción
Frontend moderno y responsivo para el sistema de gestión de tienda online integrado con el backend Express + MongoDB.

## Estructura
```
frontend/
├── index.html          # Página principal
├── css/
│   ├── styles.css      # Estilos globales
│   └── responsive.css  # Media queries responsivas
├── js/
│   ├── main.js         # Lógica principal
│   ├── api.js          # Llamadas al backend
│   ├── ui.js           # Manipulación del DOM
│   └── cart.js         # Gestión del carrito
├── pages/
│   ├── productos.html
│   ├── carrito.html
│   ├── pedidos.html
│   ├── clientes.html
│   └── reportes.html
└── assets/
    └── icons/
```

## Instalación

### Opción 1: Sin dependencias (Recomendado)
Simplemente abre `index.html` en tu navegador.

### Opción 2: Con servidor local
```bash
npm install
npm start
# Accede a http://localhost:8080
```

## Configuración

Edita la URL del backend en `js/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## Características

✅ Catálogo de productos con búsqueda
✅ Carrito de compras persistente (localStorage)
✅ Gestión de pedidos
✅ Registro de clientes
✅ Panel de reportes de ventas
✅ Interfaz responsiva (móvil, tablet, desktop)
✅ Diseño moderno con gradientes y animaciones
✅ Validación de formularios

## Integración con Backend

El frontend se conecta con estos endpoints:
- `GET /api/productos` - Listar productos
- `POST /api/productos` - Crear producto
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Crear cliente
- `GET /api/pedidos` - Listar pedidos
- `POST /api/pedidos` - Crear pedido
- `GET /api/informes/ventas/producto` - Reporte por producto
- `GET /api/informes/ventas/categoria` - Reporte por categoría
- `GET /api/informes/ventas/mes` - Reporte por mes
