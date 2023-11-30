import Provider from '../models/Provider.model.js';

export const getProviders = async (req, res) => {
	try {
		const providers = await Provider.find();
		res.status(200).json(providers);
	} catch (error) {
		res.status(404).json({ message: 'No se han encontrado proveedores.' });
		console.log(error);
	}
};

export const getProviderById = async (req, res) => {
	const { providerId } = req.params;
	try {
		const provider = await Provider.findById(providerId);
		res.status(200).json(provider);
	} catch (error) {
		res.status(404).json({ message: 'No se ha encontrado el proveedor.' });
		console.log(error);
	}
};

export const createProvider = async (req, res) => {
	const { name, description, address, city, province } = req.body;
	const newProvider = new Provider({
		name,
		description,
		address,
		city,
		province,
		createdBy: req.currentUser.id,
		updatedBy: req.currentUser.id,
	});
	try {
		await newProvider.save();
		res.status(201).json({ message: `Proveedor creado.` });
	} catch (error) {
		res.status(409).json({ message: 'El proveedor ya existe.' });
		console.log(error);
	}
};

export const updateProviderById = async (req, res) => {
	const { providerId } = req.params;
	const { name, description, address, city, province } = req.body;
	const updatedProvider = {
		name,
		description,
		address,
		city,
		province,
		updatedBy: req.currentUser.id,
	};
	try {
		const providereUpdated = await Provider.findByIdAndUpdate(providerId, updatedProvider, { new: true });
		res.status(200).json({ message: `Proveedor (${providereUpdated.name}) actualizado.` });
	} catch (error) {
		res.status(409).json({ message: 'Error al actualizar el proveedor.' });
		console.log(error);
	}
};

export const deleteProviderById = async (req, res) => {
	const { providerId } = req.params;
	try {
		await Provider.findByIdAndDelete(providerId);
		res.status(200).json({ message: 'Proveedor eliminado.' });
	} catch (error) {
		res.status(409).json({ message: 'Error al eliminar el proveedor.' });
		console.log(error);
	}
};
