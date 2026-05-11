const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
  },
  totalCards: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Card',
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
