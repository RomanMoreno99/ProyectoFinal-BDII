const { crearPedido } = require('../services/orderService');
const Pedido = require('../models/pedido');

exports.create = async (req, res, next) => {
  try {
    const pedido = req.body;
    const created = await crearPedido(pedido);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const items = await Pedido.find().sort({ fecha_pedido: -1 });
    res.json(items);
  } catch (err) { next(err); }
};

exports.salesByProduct = async (req, res, next) => {
  try {
    const pipeline = [
      { $unwind: "$productos" },
      { $group: {
        _id: "$productos.id_producto",
        nombre: { $first: "$productos.nombre" },
        total_unidades: { $sum: "$productos.cantidad" },
        total_ingresos: { $sum: { $multiply: ["$productos.cantidad", { $toDouble: "$productos.precio_unitario" }] } }
      } },
      { $sort: { total_unidades: -1 } }
    ];
    const resAgg = await Pedido.aggregate(pipeline);
    res.json(resAgg);
  } catch (err) { next(err); }
};

exports.salesByCategory = async (req, res, next) => {
  try {
    const pipeline = [
      { $unwind: "$productos" },
      { $group: {
        _id: "$productos.categoria",
        total_unidades: { $sum: "$productos.cantidad" },
        total_ingresos: { $sum: { $multiply: ["$productos.cantidad", { $toDouble: "$productos.precio_unitario" }] } }
      } },
      { $sort: { total_ingresos: -1 } }
    ];
    const resAgg = await Pedido.aggregate(pipeline);
    res.json(resAgg);
  } catch (err) { next(err); }
};

exports.salesByMonth = async (req, res, next) => {
  try {
    const pipeline = [
      { $unwind: "$productos" },
      { $group: {
        _id: { year: { $year: "$fecha_pedido" }, month: { $month: "$fecha_pedido" } },
        total_ingresos: { $sum: { $multiply: ["$productos.cantidad", { $toDouble: "$productos.precio_unitario" }] } },
        total_unidades: { $sum: "$productos.cantidad" }
      } },
      { $sort: { "_id.year": -1, "_id.month": -1 } }
    ];
    const resAgg = await Pedido.aggregate(pipeline);
    res.json(resAgg);
  } catch (err) { next(err); }
};
