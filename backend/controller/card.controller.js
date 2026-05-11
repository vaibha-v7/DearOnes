const Card = require('../models/card');
const User = require('../models/user');
const crypto = require('crypto');

exports.createCard = async (req, res) => {
  try {
    const { recipientName, title, senderName, occasion, message, img } = req.body;
    
    if (!recipientName || !title || !senderName || !occasion || !message) {
      return res.status(400).json({ status: 'failed', message: 'Missing required fields' });
    }

    // Generate a unique 16-character string for the shareable link
    const shareableLink = crypto.randomBytes(8).toString('hex');

    const newCard = new Card({
      userId: req.userId,
      recipientName,
      title,
      senderName,
      occasion,
      message,
      img,
      shareableLink
    });

    await newCard.save();

    // Add the card to the user's totalCards array
    await User.findByIdAndUpdate(req.userId, {
      $push: { totalCards: newCard._id }
    });

    res.status(201).json({ status: 'successful', card: newCard });
  } catch (err) {
    console.error('Create card error:', err);
    res.status(500).json({ status: 'failed', message: 'Server error' });
  }
};

exports.getCardByLink = async (req, res) => {
  try {
    const { link } = req.params;
    const card = await Card.findOne({ shareableLink: link });
    
    if (!card) {
      return res.status(404).json({ status: 'failed', message: 'Card not found' });
    }

    res.json({ status: 'successful', card });
  } catch (err) {
    console.error('Get card error:', err);
    res.status(500).json({ status: 'failed', message: 'Server error' });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findOneAndDelete({ _id: cardId, userId: req.userId });
    
    if (!card) {
      return res.status(404).json({ status: 'failed', message: 'Card not found or unauthorized' });
    }

    // Remove the card reference from the user
    await User.findByIdAndUpdate(req.userId, {
      $pull: { totalCards: cardId }
    });

    res.json({ status: 'successful', message: 'Card deleted successfully' });
  } catch (err) {
    console.error('Delete card error:', err);
    res.status(500).json({ status: 'failed', message: 'Server error' });
  }
};
