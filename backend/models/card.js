const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  occasion: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  img: {
    type: String,
  },
  shareableLink: {
    type: String,
    unique: true,
  },
  isBold: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
