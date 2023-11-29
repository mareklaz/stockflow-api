import 'dotenv/config';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const isAuthenticated = async (req, res, next) => {
	// Obtener el token de autorización del encabezado de la solicitud
	const authHeader = req.headers.authorization;

	// Verificar si el encabezado de autorización existe
	if (!authHeader) {
		return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
	}

	// Verificar si el encabezado de autorización comienza con "Bearer"
	if (!authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Token de autenticación inválido' });
	}

	// Obtener el token eliminando el prefijo "Bearer "
	const token = authHeader.substring(7);

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.userId = decoded.id;

		const user = await User.findById(decoded.id);
		if (!user) {
			return res.status(401).json({ error: 'Usuario no encontrado' });
		}

		req.currentUser = user;

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Token de autenticación inválido' });
	}
};
