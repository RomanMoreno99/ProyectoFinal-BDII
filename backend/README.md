# Backend para ProyectoFinal-BDII

Este backend implementa un API con Express y MongoDB (Mongoose) para gestionar productos, clientes y pedidos.

Requisitos:
- Node >= 18
- MongoDB (idealmente replica set para transacciones). Puedes usar docker-compose incluido.

Cómo ejecutar (local):

1. Copiar variables de entorno:
   cp backend/.env.example backend/.env
   editar backend/.env con MONGODB_URI

2. Instalar dependencias:
   cd backend
   npm install

3. Crear índices y datos de ejemplo (opcional):
   npm run create-indexes
   npm run seed

4. Ejecutar en modo desarrollo:
   npm run dev

Endpoints principales:
- GET /api/productos
- POST /api/productos
- GET /api/clientes
- POST /api/clientes
- POST /api/pedidos  (crea pedido y decrementa stock de forma segura)
- GET /api/informes/ventas/producto
- GET /api/informes/ventas/categoria
- GET /api/informes/ventas/mes

Docker:
  docker-compose up --build

Nota: No incluir credenciales en el repo. Usa variables de entorno.
