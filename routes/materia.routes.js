import express from 'express';

import { crearMateria, listarMaterias, asignarMateria, actualizarMateria } from '../controllers/materia.controller.js';
import { eliminarMateria } from '../controllers/materia.controller.js';
import { protegerRuta } from '../middlewares/authMiddleware.js';
import { soloDocente } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', protegerRuta, soloDocente, crearMateria);
router.get('/', protegerRuta, soloDocente, listarMaterias);
router.put('/:id/asignar/:idEstudiante', protegerRuta, soloDocente, asignarMateria);
router.put('/:id', protegerRuta, soloDocente, actualizarMateria);
router.delete('/:id', protegerRuta, soloDocente, eliminarMateria);

export default router;




