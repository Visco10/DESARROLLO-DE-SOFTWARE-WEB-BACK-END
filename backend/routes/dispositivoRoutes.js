const express = require('express');
const router = express.Router();
const { Dispositivo } = require('../models');

// Obtener todos los dispositivos
router.get('/', async (req, res) => {
  try {
    const dispositivos = await Dispositivo.findAll();
    res.json(dispositivos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear dispositivo
router.post('/', async (req, res) => {
  try {
    const dispositivo = await Dispositivo.create(req.body);
    res.json(dispositivo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar dispositivo
router.put('/:id', async (req, res) => {
  try {
    const dispositivo = await Dispositivo.findByPk(req.params.id);
    if (!dispositivo) return res.status(404).json({ error: 'Dispositivo no encontrado' });
    await dispositivo.update(req.body);
    res.json(dispositivo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar dispositivo
router.delete('/:id', async (req, res) => {
  try {
    const dispositivo = await Dispositivo.findByPk(req.params.id);
    if (!dispositivo) return res.status(404).json({ error: 'Dispositivo no encontrado' });
    await dispositivo.destroy();
    res.json({ message: 'Dispositivo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
