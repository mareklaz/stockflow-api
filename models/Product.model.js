import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		price: {
			type: Number,
			required: true,
		},
		taxRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Tax',
			required: false,
		},
		totalPrice: {
			type: Number,
			required: true,
		},
		cost: {
			type: Number,
			required: true,
		},
		totalCost: {
			type: Number,
			required: true,
		},
		active: {
			type: Boolean,
			required: true,
		},
		barCode: {
			type: String,
			required: false,
		},
		providerRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Provider',
			required: false,
		},
		categoryRef: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: false,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				delete ret.__v;
				delete ret._id;
				return ret;
			},
		},
	}
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
