const mongoose = require('mongoose');

const endUserSchema = new mongoose.Schema({

  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  upcomingFlights: [
    {
      flightNumber: { type: String, required: true },
      isSeatBooked: { type: String, required: true },
      seatNumber: { type: String, required: true },
      class: { type: String, required: true },
      departureTime: { type: String, required: true },
      departureDate: { type: String, required: true },
      departureLocation: { type: String, required: true },
      arrivalLocation: { type: String, required: true }
    }
  ]


},
  { collection: 'users' }
)

const model = mongoose.model('endUserSchema', endUserSchema);

module.exports = model;
