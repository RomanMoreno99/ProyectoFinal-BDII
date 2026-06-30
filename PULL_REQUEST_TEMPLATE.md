# Pull Request: Implementación MongoDB (Express + Mongoose)

Agrego la implementación inicial para el backend usando MongoDB con Mongoose.

Cambios principales:
- Carpeta backend/ con la aplicación Express + modelos Mongoose (Producto, Cliente, Pedido).
- Servicio para creación de pedidos con transacciones y fallback atómico.
- Endpoints CRUD y pipelines de agregación para informes (ventas por producto, categoría y mes).
- Scripts para crear índices y seed de ejemplo.
- Tests básicos y CI (GitHub Actions).

Checklist:
- [x] Crear branch feature/mongodb-implementation
- [x] Añadir código backend
- [x] Añadir scripts de indices/seed
- [x] Añadir tests y CI

Cómo probar: sigue las instrucciones en backend/README.md
