import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

export const protegerRuta = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ mensaje: 'Token faltante' });

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(id).select('-password');
    if (!usuario) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    req.user = usuario;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

export const esDocente = (req, res, next) => {
  if (req.user?.rol === 'docente') {
    next();
  } else {
    return res.status(403).json({ mensaje: 'Acceso denegado: solo docentes' });
  }
};
