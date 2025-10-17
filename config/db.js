import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

const config = {
  url: process.env.URL_MONGO,
  options: { useNewUrlParser: true, useUnifiedTopology: true }
};

function conectar() {
  return mongoose.connect(config.url, config.options);
}

function desconectar() {
  return mongoose.disconnect();
}

export { conectar, desconectar };
