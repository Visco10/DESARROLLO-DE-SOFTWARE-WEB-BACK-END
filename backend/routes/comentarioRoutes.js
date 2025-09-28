const express = require('express');
const router = express.Router();
const { Comentario } = require('../database');

// Obtener comentarios de un dispositivo
router.get('/dispositivo/:id', async (req, res) => {
  try {
    const comentarios = await Comentario.findAll({ where: { dispositivo_id: req.params.id } });
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear comentario
router.post('/', async (req, res) => {
  try {
    const comentario = await Comentario.create(req.body);
    res.json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar comentario
router.put('/:id', async (req, res) => {
  try {
    const comentario = await Comentario.findByPk(req.params.id);
    if (!comentario) return res.status(404).json({ error: 'Comentario no encontrado' });
    await comentario.update(req.body);
    res.json(comentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar comentario
router.delete('/:id', async (req, res) => {
  try {
    const comentario = await Comentario.findByPk(req.params.id);
    if (!comentario) return res.status(404).json({ error: 'Comentario no encontrado' });
    await comentario.destroy();
    res.json({ message: 'Comentario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
