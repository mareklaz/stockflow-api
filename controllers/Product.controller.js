import Product from '../models/Product.model.js';
import Provider from '../models/Provider.model.js';
import Tax from '../models/Tax.model.js';


const calculateTaxes = (value, tax) => {
		const totalTax = Number(value) * Number(tax);
		const total = Number(value) + Number(totalTax)
		return Number(total);
}


export const getProducts = async (req, res) => {
	try {
		const products = await Product.find().populate('taxRef').populate('providerRef');
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
		res.status(404).json({ message: 'No se ha encontrado el producto.' }).populate('taxRef').populate('providerRef');
		console.log(error);
	}
};

export const createProduct = async (req, res) => {
	const {
		name,
		description,
		price,
		taxRef,
		cost,
		active,
		barCode,
		providerRef,
		categories,
	} = req.body;

	console.log(req.body)

	const taxFound = await Tax.findById(taxRef);

	if(!taxFound) {
		res.status(404).json({ message: 'No se ha encontrado el impuesto.' });
		return;
	}

	const newProduct = new Product({
		name,
		description,
		price,
		taxRef,
		totalPrice: calculateTaxes(price, taxFound.percentage) ,
		cost,
		totalCost: calculateTaxes(cost, taxFound.percentage) ,
		active,
		barCode,
		providerRef,
		categories,
		createdBy: req.currentUser.id,
		updatedBy: req.currentUser.id,
	});

	try {
		await newProduct.save();
		res.status(201).json({ message: 'Producto creado correctamente.' });
	} catch (error) {
		res.status(409).json({ message: 'Error al crear el producto.' });
		console.log(error);
	}
};

export const updateProductById = async (req, res) => {
	const { productId } = req.params;

	const {
		name,
		description,
		price,
		taxRef,
		cost,
		active,
		barCode,
		providerRef,
		categories,
	} = req.body;

	const taxFound = await Tax.findById(taxRef);

	if(!taxFound) {
		res.status(404).json({ message: 'No se ha encontrado el impuesto.' });
		return;
	}

	console.log(taxFound)

	const updatedProduct = {
		name,
		description,
		price,
		taxRef,
		totalPrice: calculateTaxes(price, taxFound.percentage) ,
		cost,
		totalCost: calculateTaxes(cost, taxFound.percentage) ,
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

export const getCreateProductInfo = async (req, res) => {

	try {
		const provider = await Provider.find()
		const taxes = await Tax.find()

		res.status(200).json({provider, taxes});
	} catch (error) {
		res.status(404).json({ message: 'No se ha encontrado información de proveedores y impuestos.' });
		console.log(error);
	}
};