import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

// 🔐 Generar token
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// 🔑 Login común
export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = generarToken(usuario._id);

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// 📝 Registro exclusivo para estudiantes
export const registrarEstudiante = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const nuevoEstudiante = new Usuario({
      nombre,
      correo,
      password,
      rol: 'estudiante'
    });

    await nuevoEstudiante.save();

    const token = generarToken(nuevoEstudiante._id);

    res.status(201).json({
      token,
      usuario: {
        id: nuevoEstudiante._id,
        nombre: nuevoEstudiante.nombre,
        rol: nuevoEstudiante.rol
      }
    });
  } catch (error) {
    console.error('Error registrando estudiante:', error);
    res.status(500).json({ mensaje: 'Error al registrar estudiante' });
  }
};
