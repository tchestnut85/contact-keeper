const jwt = require('jsonwebtoken');
const mySecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
	// get token from the header
	const token = req.header('x-auth-token');

	// check if not a token
	if (!token) {
		return res.status(401).json({ message: 'No token, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, mySecret);
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ message: 'Token is not valid.' });
	}
};
