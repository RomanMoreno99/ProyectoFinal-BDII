const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  id_cliente: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String },
  direccion: { type: String },
  creado_en: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
