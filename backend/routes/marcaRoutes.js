const express = require('express');
const router = express.Router();
const { Marca } = require('../database');

// Obtener todas las marcas
router.get('/', async (req, res) => {
  try {
    const marcas = await Marca.findAll();
    res.json(marcas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nueva marca
router.post('/', async (req, res) => {
  try {
    const marca = await Marca.create({ nombre: req.body.nombre });
    res.json(marca);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar marca
router.put('/:id', async (req, res) => {
  try {
    const marca = await Marca.findByPk(req.params.id);
    if (!marca) return res.status(404).json({ error: 'Marca no encontrada' });
    marca.nombre = req.body.nombre;
    await marca.save();
    res.json(marca);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar marca
router.delete('/:id', async (req, res) => {
  try {
    const marca = await Marca.findByPk(req.params.id);
    if (!marca) return res.status(404).json({ error: 'Marca no encontrada' });
    await marca.destroy();
    res.json({ message: 'Marca eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
