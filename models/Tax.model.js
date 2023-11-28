import mongoose from 'mongoose';

const TaxSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		value: {
			type: Number,
			required: true,
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

const Tax = mongoose.model('Tax', TaxSchema);

// Crea virutal para devolver el percentage con valor float como porcentaje para poder operar
TaxSchema.virtual('percentage').get(function () {
	return this.value / 100;
});

export default Tax;
