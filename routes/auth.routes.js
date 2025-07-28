import express from 'express';
import { login, registrarEstudiante } from '../controllers/auth.controller.js';

const router = express.Router();

// 🟢 Login para docente y estudiante
router.post('/login', login);

// 🟡 Registro exclusivo para estudiantes
router.post('/registro', registrarEstudiante);

export default router;
