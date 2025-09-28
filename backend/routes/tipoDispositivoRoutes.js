const express = require('express');
const router = express.Router();
const { TipoDispositivo } = require('../models');

// Obtener todos los tipos
router.get('/', async (req, res) => {
  try {
    const tipos = await TipoDispositivo.findAll();
    res.json(tipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear tipo
router.post('/', async (req, res) => {
  try {
    const tipo = await TipoDispositivo.create({ nombre: req.body.nombre });
    res.json(tipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar tipo
router.put('/:id', async (req, res) => {
  try {
    const tipo = await TipoDispositivo.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'Tipo no encontrado' });
    tipo.nombre = req.body.nombre;
    await tipo.save();
    res.json(tipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar tipo
router.delete('/:id', async (req, res) => {
  try {
    const tipo = await TipoDispositivo.findByPk(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'Tipo no encontrado' });
    await tipo.destroy();
    res.json({ message: 'Tipo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
