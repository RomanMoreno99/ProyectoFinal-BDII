const Producto = require('../models/producto');
const Pedido = require('../models/pedido');
const mongoose = require('mongoose');

async function crearPedido(pedidoDoc) {
  const session = await mongoose.startSession();
  try {
    let resInsert;
    await session.withTransaction(async () => {
      // 1) Verificar stock
      for (const item of pedidoDoc.productos) {
        const prod = await Producto.findOne({ id_producto: item.id_producto }).session(session);
        if (!prod) throw new Error(`Producto no encontrado: ${item.id_producto}`);
        if (prod.stock < item.cantidad) throw new Error(`Stock insuficiente para ${item.id_producto}`);
        // copia de datos importantes al pedido
        item.nombre = prod.nombre;
        item.categoria = prod.categoria;
        item.precio_unitario = item.precio_unitario || prod.precio;
      }

      // 2) Decrementar stock
      for (const item of pedidoDoc.productos) {
        const updated = await Producto.updateOne(
          { id_producto: item.id_producto, stock: { $gte: item.cantidad } },
          { $inc: { stock: -item.cantidad } }
        ).session(session);
        if (updated.matchedCount !== 1) throw new Error(`Fallo al actualizar stock ${item.id_producto}`);
      }

      // 3) Calcular total
      let total = 0n; // use BigInt for Decimal emulation when summing as strings
      for (const it of pedidoDoc.productos) {
        // precio_unitario is Decimal128; convert to number for simplicity
        const p = Number(it.precio_unitario);
        total += BigInt(Math.round(p * 100)) * BigInt(it.cantidad);
      }
      pedidoDoc.total = (total / 100n).toString();

      // 4) Insertar pedido
      resInsert = await Pedido.create([pedidoDoc], { session });
    }, {
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' }
    });

    return resInsert;
  } finally {
    session.endSession();
  }
}

module.exports = { crearPedido };
