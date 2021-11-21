const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/getToken');

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isTeacher: user.isTeacher,
      vaccination_certi: user.vaccination_certi,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ msg: 'Invalid email or password' });
  }
});

// @desc  Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ msg: 'User Already exists' });
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isTeacher: user.isTeacher,
      vaccination_certi: user.vaccination_certi,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ msg: 'Invalid user data' });
  }
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isTeacher: user.isTeacher,
      vaccination_certi: user.vaccination_certi,
    });
  } else {
    res.status(404).json('User Not Found');
  }
});

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.vaccination_certi =
      req.body.vaccination_certi || user.vaccination_certi;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isTeacher: updatedUser.isTeacher,
      vaccination_certi: updatedUser.vaccination_certi,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json('User Not Found');
  }
});

//@desc Get all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc Delete a user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ msg: 'User removed' });
  } else {
    res.status(404).json({ msg: 'user not found' });
  }
});

//@desc Get a user by id
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ msg: 'user not found' });
  }
});

//@desc Update a user by id
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.isTeacher = req.body.isTeacher;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isTeacher: updatedUser.isTeacher,
    });
  } else {
    res.status(404).json({ msg: 'user not found' });
  }
});

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
