# 🚀 Guía para Ejecutar Frontend + Backend

## ✅ Cambios Realizados
- ✔️ Corrección de URL del backend en frontend: `localhost:3000` (antes era 27017)
- ✔️ Agregado soporte CORS en el backend
- ✔️ Instalado paquete `cors` en las dependencias

---

## 🔧 Para Ejecutar en Desarrollo

### Terminal 1: Backend
```powershell
cd backend
npm run dev
```
**Backend estará en:** `http://localhost:3000/api`

### Terminal 2: Frontend
```powershell
cd frontend
npm install  # (si no lo has hecho)
npm start
```
**Frontend estará en:** `http://localhost:8080`

---

## 🐳 O Usar Docker (Recomendado)
```powershell
docker-compose up --build
```

---

## 📋 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Obtener todos los productos |
| POST | `/api/productos` | Crear producto |
| GET | `/api/clientes` | Obtener clientes |
| POST | `/api/clientes` | Crear cliente |
| GET | `/api/pedidos` | Obtener pedidos |
| POST | `/api/pedidos` | Crear pedido |
| GET | `/api/informes/ventas/producto` | Reporte por producto |
| GET | `/api/informes/ventas/categoria` | Reporte por categoría |
| GET | `/api/informes/ventas/mes` | Reporte por mes |

---

## ⚠️ Requisitos Previos
- MongoDB corriendo en `localhost:27017` (o configura MONGODB_URI en backend/.env)
- Node.js >= 18
- npm

**¡Ahora frontend y backend están conectados! 🎉**
