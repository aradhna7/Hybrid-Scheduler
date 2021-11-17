const express = require('express');
const router = express.Router();
const {
  bookSlot,
  getSlots,
  getSlotByDate,
  createSlot,
  getNumOfSlotByDate,
  updateSlot,
} = require('../controllers/slotController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.route('/').post(protect, bookSlot).get(protect, teacher, getSlots);

router.route('/date').post(protect, teacher, getSlotByDate);

router
  .route('/booking')
  .post(protect, teacher, createSlot)
  .put(protect, updateSlot);

router.route('/booking/date').post(protect, getNumOfSlotByDate);

module.exports = router;
