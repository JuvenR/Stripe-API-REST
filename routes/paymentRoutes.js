import express from 'express';
import { createPaymentURL, getPayment, processPayment } from '../controllers/paymentController.js';

const router = express.Router();

// Crear una URL de pago
router.post('/create', createPaymentURL);

// Obtener información de un pago
router.get('/:id', getPayment);

// Procesar el pago
router.post('/:id/proccess', processPayment);

export default router;
