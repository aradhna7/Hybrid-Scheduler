import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  userLogin,
  userRegister,
  userDetails,
  userList,
} from './reducers/userReducers';

import {
  slotCreate,
  bookingSlot,
  listSlotBookingByDate,
  getNumOfSlotsByDate,
  updateSlotByDate,
} from './reducers/slotReducers';

const reducers = combineReducers({
  userLogin,
  userRegister,
  userDetails,
  userList,
  slotCreate,
  bookingSlot,
  listSlotBookingByDate,
  getNumOfSlotsByDate,
  updateSlotByDate,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
