const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  stars: {type: String, required: true},
  content: {type: String, required: true},
  _creator: {type: String, required: true,}
}, {
  timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
