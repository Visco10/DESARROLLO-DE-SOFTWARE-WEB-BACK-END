// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { sequelize } = require('./database'); // Aquí importas tus modelos y Sequelize

// Rutas
const marcaRoutes = require('./routes/marcaRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const dispositivoRoutes = require('./routes/dispositivoRoutes');
const tipoRoutes = require('./routes/tipoDispositivoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/Imagenes'))); // Para tus imágenes

// Rutas API
app.use('/api/marcas', marcaRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/dispositivos', dispositivoRoutes);
app.use('/api/tipos', tipoRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ API funcionando correctamente');
});

// Conectar a la DB y sincronizar modelos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la DB establecida correctamente.');

    await sequelize.sync({ alter: true }); // sincroniza tablas con cambios
    console.log('✅ Tablas sincronizadas correctamente.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al sincronizar la DB:', err);
  }
})();
