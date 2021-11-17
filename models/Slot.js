const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    vaccination_certi: {
      type: String,
      required: [true, 'Please add an Vaccination Certificate'],
      trim: true,
    },
    slotDate: {
      type: String,
      required: [true, 'Please add an Slot Date'],
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
