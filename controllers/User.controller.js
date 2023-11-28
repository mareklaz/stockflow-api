import User from '../models/User.model.js';

export const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(404).json({ message: 'No se han encontrado usuarios.' });
		console.log(error);
	}
};

export const getUserById = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findById(userId);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: 'No se ha encontrado el usuario.' });
		console.log(error);
	}
};

export const createUser = async (req, res) => {
	const { username, password, email, active, root, token } = req.body;
	const newUser = new User({ username, password, email, active, root, token });
	try {
		await newUser.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(409).json({ message: 'El usuario ya existe.' });
		console.log(error);
	}
};

export const updateUserById = async (req, res) => {
	const { userId } = req.params;
	const { username, password, email, active, root, token } = req.body;
	const updatedUser = { username, password, email, active, root, token };
	try {
		await User.findByIdAndUpdate(userId, updatedUser, { new: true });
		res.status(200).json({ message: 'Usuario actualizado.' });
	} catch (error) {
		res.status(409).json({ message: 'Error al actualizar el usuario.' });
		console.log(error);
	}
};

export const deleteUserById = async (req, res) => {
	const { userId } = req.params;
	try {
		await User.findByIdAndDelete(userId);
		res.status(200).json({ message: 'Usuario eliminado.' });
	} catch (error) {
		res.status(409).json({ message: 'Error al eliminar el usuario.' });
		console.log(error);
	}
};
