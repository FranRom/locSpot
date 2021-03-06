const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const locationSchema = new Schema({
  title: { type: String, required: [true, 'Title is required']},
  city: { type: String, required: [true, 'City is required']},
  description: { type: String },
  picture: [{ type: String }],
  tags: [{ type: String }],
  availability: { type: String, required: [true, 'Availability is required']},
  price: { type: String, required: [true, 'Price is required']},
  type: {type: String, enum: ['Inside', 'Outside']},
  activity: {type: String, enum: ['Photo', 'Recording', 'Event']},
  about: [{ type: String }],
  reviews: [{type:Schema.Types.ObjectId, ref:'Review'}],
  _creator: [{type:Schema.Types.ObjectId, ref:'User'}],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
