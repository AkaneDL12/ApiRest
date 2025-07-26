const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo registrar', detalle: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  const usuario = await Usuario.findOne({ correo });
  if (!usuario) return res.status(404).json({ mensaje: 'Correo no registrado' });

  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

  res.json({
    mensaje: 'Login exitoso',
    token,
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    }
  });
});

module.exports = router;
