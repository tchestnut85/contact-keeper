const express = require('express');
const router = express.Router();

// POST a new user to /api/users
router.post('/', (req, res) => {
	res.send('Register a user');
});

module.exports = router;
