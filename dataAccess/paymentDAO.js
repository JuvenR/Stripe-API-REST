import { PaymentSchemaModel as Payment } from '../models/payment.js';

const createPayment = async (amount, currency) => {
  const payment = new Payment({ amount, currency });
  return await payment.save();
};

const getPaymentById = async (id) => {
  return await Payment.findById(id);
};

const updatePaymentStatus = async (id, status) => {
  return await Payment.findByIdAndUpdate(id, { status }, { new: true });
};

export { createPayment, getPaymentById, updatePaymentStatus };
