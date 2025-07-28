export const soloDocente = (req, res, next) => {
    if (req.user.rol !== 'docente') {
      return res.status(403).json({ mensaje: 'Acceso solo para docentes' });
    }
    next();
  };
  