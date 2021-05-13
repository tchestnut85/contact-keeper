const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

// GET a user's contacts - /api/contacts
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

// POST a new contact - /api/contacts
router.post('/', [auth, [check('name', 'Name is required.').not().isEmpty()]], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { name, email, phone, type } = req.body;

	try {
		const newContact = new Contact({
			name,
			email,
			phone,
			type,
			user: req.user.id,
		});

		const contact = await newContact.save();

		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

// PUT update a contact - /api/contacts
router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ message: 'Contact not found!' });

		// Make sure logged in user owns the contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ message: 'Not Authorized!' });
		}

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{ $set: contactFields },
			{ new: true }
		);

		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

// DELETE update a contact - /api/contacts
router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ message: 'Contact not found!' });

		// Make sure logged in user owns the contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ message: 'Not Authorized!' });
		}

		await Contact.findByIdAndRemove(req.params.id);

		res.json({ message: 'Contact Deleted!' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error!');
	}
});

module.exports = router;
