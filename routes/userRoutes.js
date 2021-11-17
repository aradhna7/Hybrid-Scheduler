const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/userController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.route('/').post(registerUser).get(protect, teacher, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, teacher, deleteUser)
  .get(protect, teacher, getUserById)
  .put(protect, teacher, updateUser);

module.exports = router;
