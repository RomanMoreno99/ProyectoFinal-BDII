const express = require('express');
const productoController = require('./controllers/productoController');
const clienteController = require('./controllers/clienteController');
const pedidoController = require('./controllers/pedidoController');

const router = express.Router();

// Productos
router.get('/productos', productoController.list);
router.post('/productos', productoController.create);

// Clientes
router.get('/clientes', clienteController.list);
router.post('/clientes', clienteController.create);

// Pedidos
router.post('/pedidos', pedidoController.create);
router.get('/pedidos', pedidoController.list);

// Informes
router.get('/informes/ventas/producto', pedidoController.salesByProduct);
router.get('/informes/ventas/categoria', pedidoController.salesByCategory);
router.get('/informes/ventas/mes', pedidoController.salesByMonth);

module.exports = router;
