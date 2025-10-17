import mongoose from 'mongoose';

// Modelo de pago
const PaymentSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
  status: { type: String, default: 'pending' },
});

const PaymentSchemaModel = mongoose.model('Payment', PaymentSchema);

export { PaymentSchemaModel };
