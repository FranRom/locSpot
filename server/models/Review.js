const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  stars: {type: String, required: [true, 'Stars evaluation are required'] },
  content: {type: String, required: [true, 'Review description is required'] },
  _creator: {type: String, required: true,}
}, {
  timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
