const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema(
  {
    numOfSlot: {
      type: Number,
      required: [true, 'Please add number of slots'],
      default: 0,
    },
    numOfSlotRemaining: {
      type: Number,
      required: [false, 'Please add number of slots'],
      default: 0,
    },
    slotDate: {
      type: String,
      required: [true, 'Please add an Event Date'],
    },
  },
  { timestamps: true }
);

const NumOfSlot = mongoose.model('NumOfSlot', DaySchema);

module.exports = NumOfSlot;
