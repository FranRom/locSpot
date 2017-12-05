const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const locationSchema = new Schema({
  title: { type: String, required: true},
  position: { type:{ lat: Number,
            lon: Number },
            required: true },
  city: { type: String, required: true},
  description: { type: String, required: true},
  pictures: [{ img: String }],
  tags: [{ type: String }],
  type: {type: String, enum: ['Inside', 'Outside']},
  activity: {type: String, enum: ['Photo', 'Recording', 'Event']},
  reviews: [{type:Schema.Types.ObjectId, ref:'Review'}],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
