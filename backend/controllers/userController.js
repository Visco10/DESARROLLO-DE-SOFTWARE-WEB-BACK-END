const User = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Listar usuarios (solo admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['contraseña'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear usuario (admin)
exports.createUser = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const hash = await bcrypt.hash(contraseña, 10);
    const user = await User.create({ nombre, correo, contraseña: hash });
    res.status(201).json({ id_usuario: user.id_usuario, nombre: user.nombre, correo: user.correo });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const user = await User.findOne({ where: { correo } });
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(contraseña, user.contraseña);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id_usuario, correo: user.correo }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
