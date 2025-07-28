import Usuario from '../models/Usuario.js';

/**
 * GET /api/usuarios/materias
 * Ver materias asignadas a un estudiante, incluyendo el nombre del profesor
 */
export const verMateriasEstudiante = async (req, res) => {
  try {
    await req.user.populate({
      path: 'materias',
      populate: {
        path: 'profesor',
        select: 'nombre correo'
      }
    });

    res.json(req.user.materias);
  } catch (error) {
    console.error('Error al obtener materias del estudiante:', error);
    res.status(500).json({ mensaje: 'Error al obtener materias' });
  }
};

/**
 * GET /api/usuarios?rol=estudiante
 * Solo accesible por docentes. Devuelve lista de usuarios con ese rol.
 */
export const obtenerUsuariosPorRol = async (req, res) => {
  const rol = req.query.rol;
  try {
    const usuarios = await Usuario.find({ rol }, 'nombre correo');
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios por rol:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};
