const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const renterSchema = new Schema({
  username: { type: String, required: [true, 'Name is required'] },
  lastName: { type: String, required: [true, 'Last Name is required'] },
  email: { type: String, required: [true, 'email is required'] },
  phone: { type: String, required: [true, 'Phone is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  city: { type: String, required: [true, 'City is required'] },
  about: { type: String },
  picture: { type: String },
  reviews: [{type:Schema.Types.ObjectId, ref:'Review'}],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Renter = mongoose.model('Renter', renterSchema);
module.exports = Renter;
