import Product from '../models/Product.model.js';

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json({ message: 'No se han encontrado productos.' });
		console.log(error);
	}
};

export const getProductById = async (req, res) => {
	const { productId } = req.params;
	try {
		const product = await Product.findById(productId);

		res.status(200).json(product);
	} catch (error) {
		res.status(404).json({ message: 'No se ha encontrado el producto.' });
		console.log(error);
	}
};

export const createProduct = async (req, res) => {
	const {
		name,
		description,
		price,
		tax,
		totalPrice,
		cost,
		totalCost,
		active,
		barCode,
		providerRef,
		categories,
	} = req.body;

	const newProduct = new Product({
		name,
		description,
		price,
		tax,
		totalPrice,
		cost,
		totalCost,
		active,
		barCode,
		providerRef,
		categories,
		createdBy: req.currentUser.id,
		updatedBy: req.currentUser.id,
	});

	try {
		await newProduct.save();
		res.status(201).json(newProduct);
	} catch (error) {
		res.status(409).json({ message: 'El producto ya existe.' });
		console.log(error);
	}
};

export const updateProductById = async (req, res) => {
	const { productId } = req.params;

	const {
		name,
		description,
		price,
		tax,
		totalPrice,
		cost,
		totalCost,
		active,
		barCode,
		providerRef,
		categories,
	} = req.body;

	const updatedProduct = {
		name,
		description,
		price,
		tax,
		totalPrice,
		cost,
		totalCost,
		active,
		barCode,
		providerRef,
		categories,
		updatedBy: req.currentUser.id,
	};

	try {
		await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
		res.status(200).json({ message: 'Producto actualizado.' });
	} catch (error) {
		res.status(409).json({ message: 'Error al actualizar el producto.' });
		console.log(error);
	}
};

export const deleteProductById = async (req, res) => {
	const { productId } = req.params;
	try {
		await Product.findByIdAndDelete(productId);
		res.status(200).json({ message: 'Producto eliminado.' });
	} catch (error) {
		res.status(409).json({ message: 'Error al eliminar el producto.' });
		console.log(error);
	}
};
