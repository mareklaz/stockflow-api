import mongoose from 'mongoose';

import 'dotenv/config';

const DB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(DB_URI);
		console.log('------------');
		console.log(`La conexión a la base de datos: ${DB_URI} se ha realizado con éxito!`);
		console.log('------------');
	} catch (error) {
		console.log('------------');
		console.log(`Error al conectarse a la Base de Datos: ${DB_URI}`);
		console.log('------------');
	}
};

export default connectDB;
