const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Dispositivo = sequelize.define('Dispositivo', {
  id_dispositivo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(120),
    allowNull: false
  },
  marca_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_lanzamiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'Dispositivo',
  timestamps: false
});

module.exports = Dispositivo;
