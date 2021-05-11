const express = require('express');
const router = express.Router();

// GET a user's contacts - /api/contacts
router.get('/', (req, res) => res.send('Get the users contacts'));

// POST a new contact - /api/contacts
router.post('/', (req, res) => res.send('Add a new contact'));

// PUT update a contact - /api/contacts
router.put('/:id', (req, res) => res.send('Update a contact'));

// DELETE update a contact - /api/contacts
router.delete('/:id', (req, res) => res.send('Delete a contact'));

module.exports = router;
