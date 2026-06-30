/****
 Script de seed (datos de ejemplo)
 Ejecutar: npm run seed
****/

require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('../src/models/producto');
const Cliente = require('../src/models/cliente');
const Pedido = require('../src/models/pedido');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tienda';

async function run() {
  await mongoose.connect(MONGODB_URI);
  await Producto.deleteMany({});
  await Cliente.deleteMany({});
  await Pedido.deleteMany({});

  await Producto.insertMany([
    { id_producto: 'P001', nombre: 'Laptop Dell', descripcion: 'Laptop de alto rendimiento', precio: mongoose.Types.Decimal128.fromString('1200.00'), stock: 10, categoria: 'Computadoras' },
    { id_producto: 'P002', nombre: 'Mouse Logitech', descripcion: 'Mouse inalámbrico', precio: mongoose.Types.Decimal128.fromString('50.00'), stock: 50, categoria: 'Accesorios' },
    { id_producto: 'P003', nombre: 'Audífonos Sony', descripcion: 'Audífonos con cancelación', precio: mongoose.Types.Decimal128.fromString('200.00'), stock: 20, categoria: 'Audio' }
  ]);

  await Cliente.insertMany([
    { id_cliente: 'C001', nombre: 'Juan Pérez', correo: 'juan@example.com', telefono: '123456789', direccion: 'Av. Central 123' }
  ]);

  await Pedido.insertOne({
    cliente_id: 'C001',
    cliente: { id_cliente: 'C001', nombre: 'Juan Pérez' },
    productos: [ { id_producto: 'P001', nombre: 'Laptop Dell', precio_unitario: mongoose.Types.Decimal128.fromString('1200.00'), cantidad: 1 } ],
    estado: 'entregado',
    fecha_pedido: new Date(),
    total: mongoose.Types.Decimal128.fromString('1200.00')
  });

  console.log('Seed completado');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
