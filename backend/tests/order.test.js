const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Producto = require('../src/models/producto');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tienda_test';

beforeAll(async () => {
  await mongoose.connect(MONGODB_URI);
  await Producto.deleteMany({});
  await Producto.create({ id_producto: 'T001', nombre: 'Test Prod', precio: mongoose.Types.Decimal128.fromString('10.00'), stock: 5, categoria: 'Test' });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

test('crear pedido decrementa stock', async () => {
  const pedido = {
    cliente_id: 'C0',
    productos: [ { id_producto: 'T001', cantidad: 2, precio_unitario: mongoose.Types.Decimal128.fromString('10.00') } ]
  };
  const res = await request(app).post('/api/pedidos').send(pedido);
  expect(res.statusCode).toBe(201);

  const p = await Producto.findOne({ id_producto: 'T001' });
  expect(p.stock).toBe(3);
});
