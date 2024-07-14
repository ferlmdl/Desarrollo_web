import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI no está definido en el archivo .env');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Conectado a la base de datos MongoDB");
    app.listen(PORT, () => {
      console.log(`El servidor está listo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error al conectar a MongoDB: ${error}`);
  });
