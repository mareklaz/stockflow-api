import mongoose from 'mongoose';

const ProviderSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		address: {
			type: String,
			required: false,
		},
		city: {
			type: String,
			required: false,
		},
		province: {
			type: String,
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

const Provider = mongoose.model('Provider', ProviderSchema);

export default Provider;
