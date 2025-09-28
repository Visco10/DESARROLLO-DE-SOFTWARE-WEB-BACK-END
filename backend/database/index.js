const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

const Marca = require('../models/Marca');
const TipoDispositivo = require('../models/TipoDispositivo');
const Dispositivo = require('../models/Dispositivo');
const Usuario = require('../models/Usuario');
const Comentario = require('../models/Comentario');

// Relaciones
Dispositivo.belongsTo(Marca, { foreignKey: 'marca_id' });
Marca.hasMany(Dispositivo, { foreignKey: 'marca_id' });

Dispositivo.belongsTo(TipoDispositivo, { foreignKey: 'tipo_id' });
TipoDispositivo.hasMany(Dispositivo, { foreignKey: 'tipo_id' });

Comentario.belongsTo(Dispositivo, { foreignKey: 'dispositivo_id' });
Dispositivo.hasMany(Comentario, { foreignKey: 'dispositivo_id' });

Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Comentario, { foreignKey: 'usuario_id' });

module.exports = {
  sequelize,
  Marca,
  TipoDispositivo,
  Dispositivo,
  Usuario,
  Comentario
};
