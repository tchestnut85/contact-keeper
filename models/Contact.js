const { Schema, mongoose } = require('mongoose');

const ContactSchema = mongoose.Schema({
	user: {
		type: Schema.Types.ObjectId,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	type: {
		type: String,
		default: 'personal',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('contact', ContactSchema);
