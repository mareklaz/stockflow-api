import Category from '../models/Category.model.js';

export const getCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		res.status(200).json(categories);
	} catch (error) {
		res.status(404).json({ message: 'No se han encontrado categorías.' });
		console.log(error);
	}
};

export const getCategoryById = async (req, res) => {
	const { categoryId } = req.params;
	try {
		const category = await Category.findById(categoryId);
		res.status(200).json(category);
	} catch (error) {
		res.status(404).json({ message: 'No se ha encontrado la categoría.' });
		console.log(error);
	}
};

export const createCategory = async (req, res) => {
	const { name, description } = req.body;
	const newCategory = new Category({
		name,
		description,
		createdBy: req.currentUser.id,
		updatedBy: req.currentUser.id,
	});
	try {
		await newCategory.save();
		res.status(201).json({ message: 'Categoría creada correctamente.' });
	} catch (error) {
		res.status(409).json({ message: 'La categoría ya existe.' });
		console.log(error);
	}
};

export const updateCategoryById = async (req, res) => {
	const { categoryId } = req.params;
	const { name, description } = req.body;
	const updatedCategory = { name, description, updatedBy: req.currentUser.id };
	try {
		await Category.findByIdAndUpdate(categoryId, updatedCategory, { new: true });
		res.status(200).json({ message: 'Categoría actualizada correctamente.' });
	} catch (error) {
		res.status(409).json({ message: 'Error al actualizar la categoría.' });
		console.log(error);
	}
};

export const deleteCategoryById = async (req, res) => {
	const { categoryId } = req.params;
	try {
		await Category.findByIdAndDelete(categoryId);
		res.status(200).json({ message: 'Categoría eliminada.' });
	} catch (error) {
		res.status(409).json({ message: 'Error al eliminar la categoría.' });
		console.log(error);
	}
};
