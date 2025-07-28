import mongoose from 'mongoose';

const materiaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  profesor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

export default mongoose.model('Materia', materiaSchema);

