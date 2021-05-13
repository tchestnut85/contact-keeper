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
router.post('/', (req, res) => res.send('Add a new contact'));

// PUT update a contact - /api/contacts
router.put('/:id', (req, res) => res.send('Update a contact'));

// DELETE update a contact - /api/contacts
router.delete('/:id', (req, res) => res.send('Delete a contact'));

module.exports = router;
