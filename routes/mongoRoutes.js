const express = require('express');
const router = express.Router();
const User = require('../db/mongoConfig');

//Crear un usuario
router.post('/mongo/users', async (req, res) => {
  const { name, email, age, country } = req.body; 
  try {
    const newUser = new User({ name, email, age, country }); 
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error al agregar usuario:', err);
    res.status(500).send('Error al agregar usuario');
  }
});



// Leer todos los usuarios
router.get('/mongo/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send('Error al obtener usuarios');
  }
});

// Actualizar un usuario
router.put('/mongo/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age, country } = req.body; 
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age, country }, 
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    res.status(500).send('Error al actualizar usuario');
  }
});


// Eliminar un usuario por ID
router.delete('/mongo/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).send('Usuario eliminado');
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    res.status(500).send('Error al eliminar usuario');
  }
});

module.exports = router;
