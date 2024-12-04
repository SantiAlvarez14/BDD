const express = require('express');
const router = express.Router();
const sqliteDb = require('../db/sqliteConfig');

// Crear un usuario
router.post('/sqlite/users', (req, res) => {
  const { name, email, age, country } = req.body;

  if (!name || !email || !age || !country) {
    return res.status(400).send('Faltan datos obligatorios');
  }

  const stmt = sqliteDb.prepare('INSERT INTO users (name, email, age, country) VALUES (?, ?, ?, ?)');
  stmt.run(name, email, age, country, function (err) {
    if (err) {
      console.error('Error al insertar el usuario:', err.message);
      return res.status(500).send('Error al agregar usuario');
    } else {
      console.log('Usuario insertado con ID:', this.lastID);
      res.status(201).json({ id: this.lastID, name, email, age, country });
    }
  });
});

// Leer todos los usuarios
router.get('/sqlite/users', (req, res) => {
  sqliteDb.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).send('Error al obtener usuarios');
    } else {
      res.status(200).json(rows);
    }
  });
});

// Actualizar un usuario
router.put('/sqlite/users/:id', (req, res) => {
  const { name, email, age, country } = req.body;
  const { id } = req.params;

  if (!name || !email || !age || !country) {
    return res.status(400).send('Faltan datos obligatorios');
  }

  const stmt = sqliteDb.prepare('UPDATE users SET name = ?, email = ?, age = ?, country = ? WHERE id = ?');
  stmt.run(name, email, age, country, id, function (err) {
    if (err) {
      res.status(500).send('Error al actualizar usuario');
    } else {
      res.status(200).send('Usuario actualizado');
    }
  });
});

// Eliminar un usuario
router.delete('/sqlite/users/:id', (req, res) => {
  const { id } = req.params;
  const stmt = sqliteDb.prepare('DELETE FROM users WHERE id = ?');
  stmt.run(id, function (err) {
    if (err) {
      res.status(500).send('Error al eliminar usuario');
    } else {
      res.status(200).send('Usuario eliminado');
    }
  });
});

module.exports = router;
