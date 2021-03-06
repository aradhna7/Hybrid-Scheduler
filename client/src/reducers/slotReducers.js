import {
  CREATE_SLOT_REQUEST,
  CREATE_SLOT_FAIL,
  CREATE_SLOT_SUCCESS,
  BOOK_SLOT_REQUEST,
  BOOK_SLOT_SUCCESS,
  BOOK_SLOT_FAIL,
  SLOT_DETAILS_REQUEST,
  SLOT_DETAILS_SUCCESS,
  SLOT_DETAILS_FAIL,
  NUM_OF_SLOT_DETAILS_FAIL,
  NUM_OF_SLOT_DETAILS_REQUEST,
  NUM_OF_SLOT_DETAILS_SUCCESS,
  GET_MY_SLOT_FAIL,
  GET_MY_SLOT_REQUEST,
  GET_MY_SLOT_SUCCESS,
  DELETE_A_BOOKING_REQUEST,
  DELETE_A_BOOKING_SUCCESS,
  DELETE_A_BOOKING_FAIL,
  INCREMENT_SLOT_REQUEST,
  INCREMENT_SLOT_SUCCESS,
  INCREMENT_SLOT_FAIL,
  DECREMENT_SLOT_REQUEST,
  DECREMENT_SLOT_SUCCESS,
  DECREMENT_SLOT_FAIL,
} from '../constants';

export const slotCreate = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SLOT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_SLOT_SUCCESS:
      return {
        loading: false,
        slotCreate: action.payload,
      };
    case CREATE_SLOT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const bookingSlot = (state = {}, action) => {
  switch (action.type) {
    case BOOK_SLOT_REQUEST:
      return {
        loading: true,
      };
    case BOOK_SLOT_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case BOOK_SLOT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const listSlotBookingByDate = (state = { slots: [] }, action) => {
  switch (action.type) {
    case SLOT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case SLOT_DETAILS_SUCCESS:
      return {
        loading: false,
        slots: action.payload,
      };
    case SLOT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getNumOfSlotsByDate = (state = { slot: {} }, action) => {
  switch (action.type) {
    case NUM_OF_SLOT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case NUM_OF_SLOT_DETAILS_SUCCESS:
      return {
        loading: false,
        slot: action.payload,
      };
    case NUM_OF_SLOT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateSlotByDate = (state = {}, action) => {
  switch (action.type) {
    case NUM_OF_SLOT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case NUM_OF_SLOT_DETAILS_SUCCESS:
      return {
        loading: false,
      };
    case NUM_OF_SLOT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const mySlot = (state = { slots: [] }, action) => {
  switch (action.type) {
    case GET_MY_SLOT_REQUEST:
      return {
        loading: true,
      };
    case GET_MY_SLOT_SUCCESS:
      return {
        slots: action.payload,
        loading: false,
      };
    case GET_MY_SLOT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteMyBooking = (state = {}, action) => {
  switch (action.type) {
    case DELETE_A_BOOKING_REQUEST:
      return {
        loading: true,
      };
    case DELETE_A_BOOKING_SUCCESS:
      return {
        msg: action.payload,
        loading: false,
      };
    case DELETE_A_BOOKING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const incrementSlot = (state = {}, action) => {
  switch (action.type) {
    case INCREMENT_SLOT_REQUEST:
      return {
        loading: true,
      };
    case INCREMENT_SLOT_SUCCESS:
      return {
        slots: action.payload,
        loading: false,
      };
    case INCREMENT_SLOT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const decrementSlot = (state = {}, action) => {
  switch (action.type) {
    case DECREMENT_SLOT_REQUEST:
      return {
        loading: true,
      };
    case DECREMENT_SLOT_SUCCESS:
      return {
        slots: action.payload,
        loading: false,
      };
    case DECREMENT_SLOT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
