import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['docente', 'estudiante'], default: 'estudiante' },
  materias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Materia' }]
});

// Hash antes de guardar
usuarioSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Método para comparar contraseña
usuarioSchema.methods.compararPassword = async function (passwordPlano) {
  console.log('=== COMPARACIÓN PASSWORD ===');
  console.log('Password plano recibido:', passwordPlano ? '***' : 'undefined');
  console.log('Password hash en BD:', this.password ? 'Presente' : 'Ausente');
  
  try {
    const resultado = await bcrypt.compare(passwordPlano, this.password);
    console.log('Resultado bcrypt.compare:', resultado);
    return resultado;
  } catch (error) {
    console.error('Error en bcrypt.compare:', error);
    throw error;
  }
};

export default mongoose.model('Usuario', usuarioSchema);
