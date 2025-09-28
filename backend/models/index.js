const Dispositivo = require('./Dispositivo');
const Marca = require('./Marca');
const TipoDispositivo = require('./TipoDispositivo');
const Usuario = require('./Usuario');
const Comentario = require('./Comentario');

// Relacionar Dispositivo ↔ Marca
Dispositivo.belongsTo(Marca, { foreignKey: 'marca_id' });
Marca.hasMany(Dispositivo, { foreignKey: 'marca_id' });

// Relacionar Dispositivo ↔ Tipo
Dispositivo.belongsTo(TipoDispositivo, { foreignKey: 'tipo_id' });
TipoDispositivo.hasMany(Dispositivo, { foreignKey: 'tipo_id' });

// Relacionar Comentario ↔ Dispositivo
Comentario.belongsTo(Dispositivo, { foreignKey: 'dispositivo_id' });
Dispositivo.hasMany(Comentario, { foreignKey: 'dispositivo_id' });

// Relacionar Comentario ↔ Usuario
Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Comentario, { foreignKey: 'usuario_id' });

module.exports = { Dispositivo, Marca, TipoDispositivo, Usuario, Comentario };
