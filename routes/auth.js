const express = require('express');
const router = express.Router();

// GET users at /api/auth
router.get('/', (req, res) => {
	res.send('Get logged in user');
});

// POST to login a user at /api/auth
router.post('/', (req, res) => res.send('Login a user'));

module.exports = router;
