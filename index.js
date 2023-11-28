import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './database/Database.config.js';
// import { handleErrors } from './middleware/Error.middleware.js';

// Import Routes
import authRoutes from './routes/Auth.routes.js';
import userRoutes from './routes/User.routes.js';
import taxRoutes from './routes/Tax.routes.js';
import categoryRoutes from './routes/Category.routes.js';
import providerRoutes from './routes/Provider.routes.js';

// Import .env
const PORT = process.env.PORT;

// App
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

// Database
connectDB();

// Routes
app.use('/api', authRoutes, userRoutes, taxRoutes, categoryRoutes, providerRoutes);

// Server
// app.use(handleErrors);

app.listen(PORT, () => {
	console.log('------------');
	console.log(`Servidor escuchando en el puerto ${PORT}`);
	console.log('------------');
});
