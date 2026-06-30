const Producto = require('../models/producto');
const Pedido = require('../models/pedido');

async function crearPedido(pedidoDoc) {
  try {
    // 1) Verificar stock
    for (const item of pedidoDoc.productos) {
      const prod = await Producto.findOne({ id_producto: item.id_producto });
      if (!prod) throw new Error(`Producto no encontrado: ${item.id_producto}`);
      if (prod.stock < item.cantidad) throw new Error(`Stock insuficiente para ${item.id_producto}`);
      // Copiar datos importantes del producto al pedido
      item.nombre = prod.nombre;
      item.categoria = prod.categoria;
      item.precio_unitario = Number(item.precio_unitario) || Number(prod.precio);
    }

    // 2) Decrementar stock
    for (const item of pedidoDoc.productos) {
      const updated = await Producto.updateOne(
        { id_producto: item.id_producto, stock: { $gte: item.cantidad } },
        { $inc: { stock: -item.cantidad } }
      );
      if (updated.matchedCount !== 1) throw new Error(`Fallo al actualizar stock ${item.id_producto}`);
    }

    // 3) Calcular total
    let total = 0;
    for (const it of pedidoDoc.productos) {
      const precio = Number(it.precio_unitario);
      if (isNaN(precio)) throw new Error(`Precio inválido para ${it.id_producto}`);
      total += precio * it.cantidad;
    }
    pedidoDoc.total = parseFloat(total.toFixed(2));

    // 4) Insertar pedido
    const resInsert = await Pedido.create(pedidoDoc);
    return resInsert;
  } catch (error) {
    // Si algo falla, intentar restaurar el stock
    console.error('Error creando pedido:', error.message);
    throw error;
  }
}

module.exports = { crearPedido };
