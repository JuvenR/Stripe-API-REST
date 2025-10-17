import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import paymentRoutes from './routes/paymentRoutes.js';
import { globalErrorHandler, AppError } from './utils/appError.js';
import * as db from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Conectar a la base de datos
db.conectar();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});

// Rutas API
app.use('/api/payments', paymentRoutes);

// Manejo de rutas no encontradas
app.all('*', (req, res, next) => {
  next(new AppError(`No se pudo acceder a: ${req.originalUrl} en el servidor.`, 404));
});

// Error global
app.use(globalErrorHandler);

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
