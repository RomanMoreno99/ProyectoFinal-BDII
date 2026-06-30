const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  id_producto: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  categoria: { type: String, required: true },
  creado_en: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producto', ProductoSchema);
