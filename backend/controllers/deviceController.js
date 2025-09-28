const Device = require('../models/Dispositivo');
const Marca = require('../models/Marca');
const TipoDispositivo = require('../models/TipoDispositivo');

// Listar todos los dispositivos (público)
exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.findAll({
      include: [Marca, TipoDispositivo],
      order: [['fecha_lanzamiento', 'DESC']]
    });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un dispositivo por ID
exports.getDeviceById = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id, {
      include: [Marca, TipoDispositivo]
    });
    if (!device) return res.status(404).json({ error: 'Dispositivo no encontrado' });
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo dispositivo (admin)
exports.createDevice = async (req, res) => {
  try {
    const { nombre, marca_id, tipo_id, fecha_lanzamiento, precio, descripcion, imagen } = req.body;
    const device = await Device.create({
      nombre, marca_id, tipo_id, fecha_lanzamiento, precio, descripcion, imagen
    });
    res.status(201).json(device);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar un dispositivo (admin)
exports.updateDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (!device) return res.status(404).json({ error: 'Dispositivo no encontrado' });
    await device.update(req.body);
    res.json(device);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un dispositivo (admin)
exports.deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (!device) return res.status(404).json({ error: 'Dispositivo no encontrado' });
    await device.destroy();
    res.json({ message: 'Dispositivo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
