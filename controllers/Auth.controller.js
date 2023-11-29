import 'dotenv/config';
import User from '../models/User.model.js';

export const login = async (req, res) => {
	const { email, password } = req.body;
	console.log(email, password)
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(401).json({ error: 'Usuario no encontrado' });
	}

	if (!(await user.checkPassword(password))) {
		return res.status(401).json({ error: 'Contraseña incorrecta' });
	}

	const token = user.generateJWT();
	res.json({ token });
};

export const getCurrentUser = async (req, res) => {
	try {
		const user = await User.findById(req.currentUser);
		if (!user) {
			return res.status(401).json({ message: 'Usuario no encontrado' });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error al obtener el usuario actual' });
	}
}