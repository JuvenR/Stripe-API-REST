import { createPayment, getPaymentById, updatePaymentStatus } from '../dao/paymentDao.js';
import { AppError } from '../utils/appError.js';

// Crear pago y generar URL
const createPaymentURL = async (req, res, next) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return next(new AppError('Debe proporcionar monto y moneda', 400));
    }

    const payment = await createPayment(amount, currency);
    const paymentUrl = `http://localhost:3000/payment.html?paymentid=${payment._id}`;

    res.status(201).json({
      status: 'success',
      paymentId: payment._id,
      paymentUrl,
    });
  } catch (err) {
    next(err);
  }
};

// Obtener información del pago
const getPayment = async (req, res, next) => {
  try {
    const payment = await getPaymentById(req.params.id);
    if (!payment) return next(new AppError('Pago no encontrado', 404));
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

// Procesar el pago
const processPayment = async (req, res, next) => {
  try {
    const payment = await getPaymentById(req.params.id);
    if (!payment) return next(new AppError('Pago no encontrado', 404));

    if (payment.status === 'completed') {
      return res.json({ message: 'El pago ya fue completado', payment });
    }

    const updatedPayment = await updatePaymentStatus(req.params.id, 'completed');
    res.json({ message: 'Pago procesado exitosamente', payment: updatedPayment });
  } catch (err) {
    next(err);
  }
};

export { createPaymentURL, getPayment, processPayment };
