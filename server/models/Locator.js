const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const locatorSchema = new Schema({
  username: { type: String, required: true},
  lastName: { type: String, required: true},
  company: { type: String, required: true},
  email: { type: String, required: true},
  phone: { type: String, required: true},
  password: { type: String, required: true},
  city: { type: String, required: true},
  about: { type: String, required: true},
  picture: { type: String },
  places: [{type:Schema.Types.ObjectId, ref:'Place'}],
  reviews: [{type:Schema.Types.ObjectId, ref:'Review'}],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Locator = mongoose.model('Locator', locatorSchema);
module.exports = Locator;
