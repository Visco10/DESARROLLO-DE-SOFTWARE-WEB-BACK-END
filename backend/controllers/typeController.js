const TipoDispositivo = require('../models/TipoDispositivo');

// Listar todos los tipos
exports.getAllTypes = async (req, res) => {
  try {
    const types = await TipoDispositivo.findAll();
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear tipo (admin)
exports.createType = async (req, res) => {
  try {
    const { nombre } = req.body;
    const type = await TipoDispositivo.create({ nombre });
    res.status(201).json(type);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar tipo
exports.updateType = async (req, res) => {
  try {
    const type = await TipoDispositivo.findByPk(req.params.id);
    if (!type) return res.status(404).json({ error: 'Tipo no encontrado' });
    await type.update(req.body);
    res.json(type);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar tipo
exports.deleteType = async (req, res) => {
  try {
    const type = await TipoDispositivo.findByPk(req.params.id);
    if (!type) return res.status(404).json({ error: 'Tipo no encontrado' });
    await type.destroy();
    res.json({ message: 'Tipo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
