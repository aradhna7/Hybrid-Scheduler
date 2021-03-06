const asyncHandler = require('express-async-handler');
const NumOfSlot = require('../models/NumOfSlot');
const Slot = require('../models/Slot');
const User = require('../models/User');

// @desc  Book slot of user
// @route POST /api/slot
// @access Private
const bookSlot = asyncHandler(async (req, res) => {
  const { user, vaccination_certi, slotDate } = req.body;

  //find if slot already exist
  const slotOnThatDayAlreadyBooked = await Slot.findOne({ user, slotDate });

  if (slotOnThatDayAlreadyBooked) {
    return res
      .status(400)
      .json({ msg: 'Slot On That Day is Already Booked by the user' });
  }
  const slot = await Slot.create({
    user,
    vaccination_certi,
    slotDate,
  });

  if (slot) {
    res.status(201).json({
      _id: slot._id,
      user: slot.user,
      vaccination_certi: slot.vaccination_certi,
      slotDate: slot.slotDate,
    });
  } else {
    res.status(400).json({ msg: 'Failed to book slot, Try again later!' });
  }
});

//@desc Get all slots
//@route GET /api/slot
//@access Private/Teacher
const getSlots = asyncHandler(async (req, res) => {
  const slots = await Slot.find({});
  res.json(slots);
});

//@desc Get all booking by date
//@route POST /api/slot/date
//@access Private
const getSlotByDate = asyncHandler(async (req, res) => {
  const { slotDate } = req.body;

  const slots = await Slot.find({ slotDate }).populate(
    'user',
    '_id name vaccination_certi'
  );

  if (slots) {
    res.json(slots);
  } else {
    res.status(404).json('Entry Not Found');
  }
});

//@desc Get all booking by user
//@route GET /api/slot/mySlots
//@access Private
const getMySlot = asyncHandler(async (req, res) => {
  const slots = await Slot.find({ user: req.user._id });

  if (slots) {
    res.json(slots);
  } else {
    res.status(404).json('Entry Not Found');
  }
});

// @desc Delete a booking
// @route DELETE /api/slot/booking/:id
// @access Private
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Slot.findById(req.params.id);

  if (booking) {
    await booking.remove();
    res.json({ msg: 'Booking removed' });
  } else {
    res.status(404).json({ msg: 'Booking not found' });
  }
});

// @desc  Create slot on a particular date
// @route POST /api/booking
// @access Private
const createSlot = asyncHandler(async (req, res) => {
  const { numOfSlot, slotDate } = req.body;
  const numOfSlotRemaining = numOfSlot;

  const slotAlreadyFormed = await NumOfSlot.findOne({ slotDate });

  if (slotAlreadyFormed) {
    return res.status(400).json({ msg: 'Slot is already formed' });
  }

  const numslot = await NumOfSlot.create({
    numOfSlot,
    numOfSlotRemaining,
    slotDate,
  });

  if (numslot) {
    res.status(201).json({
      _id: numslot._id,
      numOfSlot: numslot.numOfSlot,
      slotDate: numslot.slotDate,
    });
  } else {
    res.status(400).json({ msg: 'Failed to create slot, Try again later!' });
  }
});

// @desc decrement a slot  (//decrement value by 1)
// @route PUT /api/slot/decrement
// @access Private
const decrementSlot = asyncHandler(async (req, res) => {
  const { slotDate } = req.body;

  const slot = await NumOfSlot.findOne({ slotDate });

  if (slot) {
    if (slot.numOfSlotRemaining !== 0) {
      slot.numOfSlotRemaining = slot.numOfSlotRemaining - 1;
    }

    const updatedSlot = await slot.save();
    res.json(updatedSlot);
  } else {
    res.status(404).json({ message: 'Slot not found' });
  }
});

// @desc increment a slot  (//increment value by 1)
// @route PUT /api/slot/increment
// @access Private
const incrementSlot = asyncHandler(async (req, res) => {
  const { slotDate } = req.body;

  const slot = await NumOfSlot.findOne({ slotDate });

  if (slot) {
    if (slot.numOfSlot !== slot.numOfSlotRemaining) {
      slot.numOfSlotRemaining = slot.numOfSlotRemaining + 1;
    }

    const updatedSlot = await slot.save();
    res.json(updatedSlot);
  } else {
    res.status(404).json({ message: 'Slot not found' });
  }
});

//@desc Get number of slot on that day
//@route POST /api/booking/date
//@access Private
const getNumOfSlotByDate = asyncHandler(async (req, res) => {
  const { slotDate } = req.body;

  const slot = await NumOfSlot.findOne({ slotDate });

  if (slot) {
    res.json(slot);
  } else {
    res.status(404).json('Entry Not Found');
  }
});

module.exports = {
  getSlots,
  bookSlot,
  getSlotByDate,
  createSlot,
  getNumOfSlotByDate,
  decrementSlot,
  incrementSlot,
  getMySlot,
  deleteBooking,
};
