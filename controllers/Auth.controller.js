import 'dotenv/config';
import User from '../models/User.model.js';

export const login = async (req, res) => {
	const { email, password } = req.body;
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
