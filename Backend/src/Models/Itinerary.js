const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  activities: [{ type: String, required: true }],
  locations: [{ type: String, required: true }],
  timeline: [{ type: String, required: true }],
  duration: [{ type: Number, required: true }], // duration in hours
  language: { type: String, required: true },
  price: { type: Number, required: true },
  availableDates: [{ type: Date, required: true }],
  accessibility: { type: String, required: true },
  pickUpLocation: { type: String, required: true },
  dropOffLocation: { type: String, required: true },
  preferences: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  inappropriateFlag: { type: Boolean, default: false },
  ratings: {
    averageRating: {type: Number , default: 0},
    totalRatings: { type: Number, default: 0 },
    reviews: [
      {
        reviewerName: {type: String, default: ''},
        rating: {type: Number, default: 0},
        comment: {type: String, default: ''},
        date: {type: Date, default: Date.now}
      } 
    ], default: []
  },
  touristBookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist'
  }]
}, { timestamps: true });

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports = Itinerary;
