const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const TipoDispositivo = sequelize.define('TipoDispositivo', {
  id_tipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'TipoDispositivo',
  timestamps: false
});

module.exports = TipoDispositivo;
