const Cliente = require('../models/cliente');

exports.list = async (req, res, next) => {
  try {
    const items = await Cliente.find();
    res.json(items);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const p = await Cliente.create(req.body);
    res.status(201).json(p);
  } catch (err) { next(err); }
};
