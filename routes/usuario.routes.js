import express from 'express';
import {
  verMateriasEstudiante,
  obtenerUsuariosPorRol
} from '../controllers/usuario.controller.js';
import { protegerRuta, esDocente } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ruta existente
router.get('/materias', protegerRuta, verMateriasEstudiante);

// ✅ Nueva ruta para obtener estudiantes (acceso solo para docentes)
router.get('/', protegerRuta, esDocente, obtenerUsuariosPorRol);

export default router;
