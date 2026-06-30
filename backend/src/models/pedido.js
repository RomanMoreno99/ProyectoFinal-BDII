const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  cliente_id: { type: String, required: true },
  cliente: { type: Object }, // snapshot opcional
  productos: [
    {
      id_producto: { type: String, required: true },
      nombre: { type: String },
      categoria: { type: String },
      precio_unitario: { type: Number, required: true },
      cantidad: { type: Number, required: true, min: 1 }
    }
  ],
  fecha_pedido: { type: Date, default: Date.now },
  estado: { type: String, default: 'pendiente' },
  total: { type: Number }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
