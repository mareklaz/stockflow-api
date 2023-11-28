import Tax from '../models/Tax.model.js';

export const getTaxes = async (req, res) => {
	try {
		const taxes = await Tax.find();
		res.status(200).json(taxes);
	} catch (error) {
		res.status(404).json({ message: 'No se han encontrado impuestos.' });
		console.log(error);
	}
};

export const getTaxById = async (req, res) => {
	const { taxId } = req.params;
	try {
		const tax = await Tax.findById(taxId);

		res.status(200).json(tax);
	} catch (error) {
		res.status(404).json({ message: 'No se ha encontrado el impuesto.' });
		console.log(error);
	}
};

export const createTax = async (req, res) => {
	const { name, value, description } = req.body;

	const newTax = new Tax({
		name,
		value,
		description,
		createdBy: req.currentUser.id,
		updatedBy: req.currentUser.id,
	});

	try {
		await newTax.save();
		res.status(201).json(newTax);
	} catch (error) {
		res.status(409).json({ message: 'El impuesto ya existe.' });
		console.log(error);
	}
};

export const updateTaxById = async (req, res) => {
	const { taxId } = req.params;
	const { name, value, description } = req.body;
	const updatedTax = { name, value, description, updatedBy: req.currentUser.id };
	try {
		await Tax.findByIdAndUpdate(taxId, updatedTax, { new: true });
		res.status(200).json({ message: 'Impuesto actualizado.' });
	} catch (error) {
		res.status(409).json({ message: 'Error al actualizar el impuesto.' });
		console.log(error);
	}
};

export const deleteTaxById = async (req, res) => {
	const { taxId } = req.params;
	try {
		await Tax.findByIdAndDelete(taxId);
		res.status(200).json({ message: 'Impuesto eliminado.' });
	} catch (error) {
		res.status(409).json({ message: 'Error al eliminar el impuesto.' });
		console.log(error);
	}
};
