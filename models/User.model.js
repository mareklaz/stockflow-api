import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 8,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 6,
		},
		active: {
			type: Boolean,
			default: false,
		},
		root: {
			type: Boolean,
			default: false,
		},
		token: {
			type: String,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				delete ret.__v;
				delete ret._id;
				delete ret.password;
				return ret;
			},
		},
	}
);

UserSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

UserSchema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateJWT = function () {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			email: this.email,
			id: this._id,
			exp: parseInt(expirationDate.getTime() / 1000, 10),
		},
		JWT_SECRET
	);
};

const User = mongoose.model('user', UserSchema);

export default User;
