const express = require('express');
const cors = require('cors');
const path = require('path');  
const sqliteRoutes = require('./routes/sqliteRoutes');
const mongoRoutes = require('./routes/mongoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Rutas para SQLite
app.use('/api', sqliteRoutes);

// Rutas para MongoDB
app.use('/api', mongoRoutes);

// Ruta para servir index.html al acceder a la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configuración de puertos
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
