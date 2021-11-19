const express = require('express');
const router = express.Router();
const {
  bookSlot,
  getSlots,
  getSlotByDate,
  createSlot,
  getNumOfSlotByDate,
  decrementSlot,
  incrementSlot,
  getMySlot,
  deleteBooking,
} = require('../controllers/slotController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.route('/').post(protect, bookSlot).get(protect, teacher, getSlots);

router.route('/date').post(protect, teacher, getSlotByDate);

router.route('/mySlots').get(protect, getMySlot);

router.route('/booking').post(protect, teacher, createSlot);

router.route('/decrement').put(protect, decrementSlot);
router.route('/increment').put(protect, incrementSlot);

router.route('/booking/:id').delete(protect, deleteBooking);
router.route('/booking/date').post(protect, getNumOfSlotByDate);

module.exports = router;
