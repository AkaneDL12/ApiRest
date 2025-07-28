import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { conectarDB } from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import materiaRoutes from './routes/materia.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';

dotenv.config();
conectarDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/usuarios', usuarioRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
