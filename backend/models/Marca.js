// backend/models/Marca.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Marca = sequelize.define('Marca', {
  id_marca: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'Marca',
  timestamps: false
});

module.exports = Marca;
