const Marca = require('../models/Marca');

// Listar todas las marcas
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Marca.findAll();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una marca (admin)
exports.createBrand = async (req, res) => {
  try {
    const { nombre } = req.body;
    const brand = await Marca.create({ nombre });
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar marca
exports.updateBrand = async (req, res) => {
  try {
    const brand = await Marca.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ error: 'Marca no encontrada' });
    await brand.update(req.body);
    res.json(brand);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar marca
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Marca.findByPk(req.params.id);
    if (!brand) return res.status(404).json({ error: 'Marca no encontrada' });
    await brand.destroy();
    res.json({ message: 'Marca eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
