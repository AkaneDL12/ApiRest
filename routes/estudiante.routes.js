const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const auth = require('../middleware/auth');
const verificarRol = require('../middleware/role');

// Crear estudiante (solo docente)
router.post('/', auth, verificarRol(['docente']), async (req, res) => {
  const estudiante = new Usuario({ ...req.body, rol: 'estudiante' });
  await estudiante.save();
  res.status(201).json(estudiante);
});

// Ver todos los estudiantes (solo docente)
router.get('/', auth, verificarRol(['docente']), async (req, res) => {
  const estudiantes = await Usuario.find({ rol: 'estudiante' });
  res.json(estudiantes);
});

// Ver estudiante por ID
router.get('/:id', auth, verificarRol(['docente', 'estudiante']), async (req, res) => {
  const estudiante = await Usuario.findById(req.params.id);
  if (!estudiante || estudiante.rol !== 'estudiante') return res.status(404).json({ mensaje: 'No encontrado' });

  // Si es estudiante, solo puede verse a sí mismo
  if (req.usuario.rol === 'estudiante' && estudiante._id.toString() !== req.usuario._id.toString()) {
    return res.status(403).json({ mensaje: 'No puedes ver a otro estudiante' });
  }

  res.json(estudiante);
});

// Actualizar estudiante (solo docente)
router.put('/:id', auth, verificarRol(['docente']), async (req, res) => {
  const actualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

// Eliminar estudiante (solo docente)
router.delete('/:id', auth, verificarRol(['docente']), async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Estudiante eliminado' });
});

module.exports = router;
