const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const mySecret = process.env.JWT_SECRET;

// POST a new user to /api/users
router.post(
	'/',
	[
		check('name', 'Name is required.').not().isEmpty(),
		check('email', 'Please include a valid email.').isEmail(),
		check('password', 'Please enter a password with at least 6 characters.').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ message: 'User already exists!' });
			}

			user = new User({
				name,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				mySecret,
				{
					expiresIn: '1h',
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(`\n Error: ${err.message}`);
			res.status(500).send({ message: 'Server error!' });
		}
	}
);

module.exports = router;
