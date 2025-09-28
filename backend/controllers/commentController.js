const Comment = require('../models/Comentario');
const User = require('../models/Usuario');
const Device = require('../models/Dispositivo');

// Listar comentarios de un dispositivo
exports.getCommentsByDevice = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { dispositivo_id: req.params.deviceId },
      include: [User],
      order: [['fecha', 'DESC']]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear comentario
exports.createComment = async (req, res) => {
  try {
    const { usuario_id, texto, rating } = req.body;
    const device_id = req.params.deviceId;

    const comment = await Comment.create({ usuario_id, dispositivo_id: device_id, texto, rating });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar comentario (admin)
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });
    await comment.destroy();
    res.json({ message: 'Comentario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
