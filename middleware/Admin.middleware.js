import 'dotenv/config';
import User from '../models/User.model.js';

export const isAdmin = async (req, res, next) => {
	try {
		const user = await User.findById(req.currentUser);

		if (!user) {
			return res
				.status(401)
				.json({ message: 'Acceso denegado. Tus credenciales no tiene acceso.' });
		}

		if (!user.admin) {
			return res
				.status(403)
				.json({ message: 'Acceso denegado. No tienes privilegios de Administrador.' });
		}

		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error' });
	}
};
