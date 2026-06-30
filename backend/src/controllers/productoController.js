const Producto = require('../models/producto');

exports.list = async (req, res, next) => {
  try {
    const items = await Producto.find();
    res.json(items);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const p = await Producto.create(req.body);
    res.status(201).json(p);
  } catch (err) { next(err); }
};
