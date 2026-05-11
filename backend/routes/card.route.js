const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { createCard, getCardByLink, deleteCard } = require('../controller/card.controller');

// Create a new card (requires authentication)
router.post('/create', verifyToken, createCard);

// Delete a card (requires authentication)
router.delete('/:cardId', verifyToken, deleteCard);

// Get a card by its unique shareable link (public access)
router.get('/:link', getCardByLink);

module.exports = router;
