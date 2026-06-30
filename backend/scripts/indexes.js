/****
 Script para crear índices recomendados
 Ejecutar: node scripts/indexes.js
****/

require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tienda';

async function run() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  console.log('Conectado, creando índices...');

  await db.collection('productos').createIndex({ id_producto: 1 }, { unique: true });
  await db.collection('productos').createIndex({ categoria: 1 });
  await db.collection('productos').createIndex({ nombre: 'text' });

  await db.collection('clientes').createIndex({ id_cliente: 1 }, { unique: true });
  await db.collection('clientes').createIndex({ correo: 1 }, { unique: true });

  await db.collection('pedidos').createIndex({ cliente_id: 1 });
  await db.collection('pedidos').createIndex({ fecha_pedido: -1 });
  await db.collection('pedidos').createIndex({ 'productos.id_producto': 1 });

  console.log('Índices creados');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
