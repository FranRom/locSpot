const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: [true, 'Name is required'] },
  lastname: { type: String, required: [true, 'Last Name is required'] },
  email: { type: String, required: [true, 'email is required'] },
  phone: { type: String, required: [true, 'Phone is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  city: { type: String, required: [true, 'City is required'] },
  about: { type: String },
  picture: { type: String, default:"https://locspotbucket.s3.amazonaws.com/AKIAJYXSRUAM6NCP3ARA"},
  reviews: [{type:Schema.Types.ObjectId, ref:'Review'}],
  locations: [{type:Schema.Types.ObjectId, ref:'Location'}],
  role: {type: String, enum: ['Locator', 'Renter']},
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
