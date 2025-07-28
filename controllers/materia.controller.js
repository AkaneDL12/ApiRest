import Materia from '../models/Materia.js';
import Usuario from '../models/Usuario.js';

export const crearMateria = async (req, res) => {
  const { nombre, descripcion } = req.body;
  const materia = new Materia({ nombre, descripcion, profesor: req.user._id });
  await materia.save();
  res.json(materia);
};

export const listarMaterias = async (req, res) => {
  const materias = await Materia.find().populate('profesor', 'nombre correo');
  res.json(materias);
};

export const asignarMateria = async (req, res) => {
  const { id } = req.params;
  const estudiante = await Usuario.findById(req.params.idEstudiante);
  if (!estudiante || estudiante.rol !== 'estudiante') {
    return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
  }

  if (!estudiante.materias.includes(id)) {
    estudiante.materias.push(id);
    await estudiante.save();
  }

  res.json({ mensaje: 'Materia asignada al estudiante' });
};

export const actualizarMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const materia = await Materia.findByIdAndUpdate(id, datosActualizados, { new: true });

    if (!materia) {
      return res.status(404).json({ mensaje: 'Materia no encontrada' });
    }

    res.json(materia);
  } catch (error) {
    console.error('Error al actualizar materia:', error);
    res.status(500).json({ mensaje: 'Error interno al actualizar materia' });
  }
};
export const eliminarMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const materia = await Materia.findByIdAndDelete(id);

    if (!materia) {
      return res.status(404).json({ mensaje: 'Materia no encontrada' });
    }

    res.json({ mensaje: 'Materia eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar materia:', error);
    res.status(500).json({ mensaje: 'Error al eliminar materia' });
  }
};