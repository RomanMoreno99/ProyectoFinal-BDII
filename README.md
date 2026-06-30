# ProyectoFinal-BDII 🛒

Sistema completo de tienda online con backend Express + MongoDB y frontend responsivo.

## 📊 Composición del Proyecto
- **JavaScript**: 56.7%
- **CSS**: 26.8%
- **HTML**: 16.2%
- **Dockerfile**: 0.3%

---

## 🏗️ Estructura del Proyecto

```
ProyectoFinal-BDII/
├── backend/                    # API REST con Express
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/                   # Aplicación web responsiva
│   ├── pages/
│   │   ├── productos.html
│   │   ├── carrito.html
│   │   ├── pedidos.html
│   │   ├── clientes.html
│   │   └── reportes.html
│   ├── js/
│   │   ├── main.js
│   │   ├── api.js
│   │   ├── ui.js
│   │   └── cart.js
│   ├── css/
│   │   ├── styles.css
│   │   └── responsive.css
│   ├── index.html
│   └── README.md
│
└── docker-compose.yml          # Orquestación de servicios

```

---

## 🚀 Inicio Rápido

### 1️⃣ Backend (Express + MongoDB)

```bash
# Configurar variables de entorno
cp backend/.env.example backend/.env
# Editar backend/.env con MONGODB_URI

# Instalar dependencias
cd backend
npm install

# Crear índices y datos de ejemplo (opcional)
npm run create-indexes
npm run seed

# Ejecutar en modo desarrollo
npm run dev
# El backend estará en: http://localhost:3000
```

**Requisitos:**
- Node >= 18
- MongoDB (idealmente replica set para transacciones)

### 2️⃣ Frontend (HTML + CSS + JavaScript)

```bash
# Opción A: Abrir directamente
# Abre frontend/index.html en tu navegador

# Opción B: Con servidor local
cd frontend
npm install
npm start
# Accede a http://localhost:8080
```

**Configurar la URL del backend:**
Edita `frontend/js/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

### 3️⃣ Usando Docker (Recomendado para desarrollo)

```bash
docker-compose up --build
```

Esto levanta automáticamente:
- Backend en `http://localhost:3000`
- MongoDB para el backend
- Frontend disponible (si está configurado)

---

## ✨ Características Principales

### Backend
- ✅ API RESTful con Express
- ✅ Base de datos MongoDB con Mongoose
- ✅ Gestión de productos, clientes y pedidos
- ✅ Transacciones seguras de inventario
- ✅ Reportes de ventas (por producto, categoría, mes)

### Frontend
- ✅ Catálogo de productos con búsqueda
- ✅ Carrito de compras persistente (localStorage)
- ✅ Gestión de pedidos
- ✅ Registro de clientes
- ✅ Panel de reportes de ventas
- ✅ Interfaz responsiva (móvil, tablet, desktop)
- ✅ Diseño moderno con gradientes y animaciones
- ✅ Validación de formularios

---

## 📡 Endpoints principales de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Listar todos los productos |
| POST | `/api/productos` | Crear nuevo producto |
| GET | `/api/clientes` | Listar clientes |
| POST | `/api/clientes` | Registrar cliente |
| GET | `/api/pedidos` | Listar pedidos |
| POST | `/api/pedidos` | Crear pedido (decrementa stock) |
| GET | `/api/informes/ventas/producto` | Reporte por producto |
| GET | `/api/informes/ventas/categoria` | Reporte por categoría |
| GET | `/api/informes/ventas/mes` | Reporte por mes |

---

## 🔐 Seguridad

- ⚠️ **NO incluyas credenciales en el repositorio**
- Usa siempre variables de entorno (`.env`)
- Nunca hagas commit de `.env` a git (agrégalo a `.gitignore`)

---

## 📚 Documentación Adicional

- [Backend](./backend/README.md) - Detalles de la API y configuración
- [Frontend](./frontend/README.md) - Guía de la interfaz de usuario

---

## 👤 Autor

**RomanMoreno99**

---

## 📝 Licencia

Proyecto sin licencia especificada
