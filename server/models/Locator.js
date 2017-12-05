const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const locatorSchema = new Schema({
  username: { type: String, required: [true, 'Name is required'] },
  lastName: { type: String, required: [true, 'Last Name is required'] },
  company: { type: String },
  email: { type: String, required: [true, 'email is required'] },
  phone: { type: String, required: [true, 'phone is required']},
  password: { type: String, required: [true, 'Password is required']},
  city: { type: String, required: [true, 'City is required']},
  about: { type: String },
  picture: { type: String },
  places: [{type:Schema.Types.ObjectId, ref:'Place'}],
  reviews: [{type:Schema.Types.ObjectId, ref:'Review'}],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Locator = mongoose.model('Locator', locatorSchema);
module.exports = Locator;
