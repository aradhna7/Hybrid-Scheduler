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
  GET_MY_SLOT_REQUEST,
  GET_MY_SLOT_FAIL,
  GET_MY_SLOT_SUCCESS,
  DELETE_A_BOOKING_REQUEST,
  DELETE_A_BOOKING_SUCCESS,
  DELETE_A_BOOKING_FAIL,
  DECREMENT_SLOT_REQUEST,
  DECREMENT_SLOT_SUCCESS,
  DECREMENT_SLOT_FAIL,
  INCREMENT_SLOT_REQUEST,
  INCREMENT_SLOT_SUCCESS,
  INCREMENT_SLOT_FAIL,
} from '../constants';

import axios from 'axios';

//CREATE SLOT
export const createSlot =
  (numOfSlot, slotDate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_SLOT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        '/api/slot/booking',
        { numOfSlot, slotDate },
        config
      );

      dispatch({
        type: CREATE_SLOT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: CREATE_SLOT_FAIL,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.msg,
      });
    }
  };

//BOOK SLOT
export const bookSlot =
  (user, vaccination_certi, slotDate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BOOK_SLOT_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        '/api/slot',
        { user, vaccination_certi, slotDate },
        config
      );

      dispatch({
        type: BOOK_SLOT_SUCCESS,
        payload: data,
      });

      dispatch(decrementSlotByDate(slotDate));
    } catch (err) {
      dispatch({
        type: BOOK_SLOT_FAIL,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.msg,
      });
    }
  };

export const getSlotBookingByDate =
  (slotDate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SLOT_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      console.log(userInfo.token, slotDate);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post('/api/slot/date', { slotDate }, config);

      dispatch({
        type: SLOT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: SLOT_DETAILS_FAIL,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.msg,
      });
    }
  };

export const getNumOfSlotByDate = (slotDate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NUM_OF_SLOT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo.token, slotDate);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      '/api/slot/booking/date',
      { slotDate },
      config
    );

    dispatch({
      type: NUM_OF_SLOT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: NUM_OF_SLOT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.msg ? err.response.data.msg : err.msg,
    });
  }
};

export const decrementSlotByDate = (slotDate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DECREMENT_SLOT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo.token, slotDate);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      '/api/slot/decrement',
      { slotDate },
      config
    );

    dispatch({
      type: DECREMENT_SLOT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: DECREMENT_SLOT_FAIL,
      payload:
        err.response && err.response.data.msg ? err.response.data.msg : err.msg,
    });
  }
};

export const incrementSlotByDate = (slotDate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INCREMENT_SLOT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo.token, slotDate);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      '/api/slot/increment',
      { slotDate },
      config
    );

    dispatch({
      type: INCREMENT_SLOT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: INCREMENT_SLOT_FAIL,
      payload:
        err.response && err.response.data.msg ? err.response.data.msg : err.msg,
    });
  }
};

export const getMySlots = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MY_SLOT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get('/api/slot/mySlots', config);

    dispatch({
      type: GET_MY_SLOT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_MY_SLOT_FAIL,
      payload:
        err.response && err.response.data.msg ? err.response.data.msg : err.msg,
    });
  }
};

export const deleteABooking = (id, slotDate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_A_BOOKING_REQUEST,
    });

    console.log(id);

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/slot/booking/${id}`, config);

    dispatch({
      type: DELETE_A_BOOKING_SUCCESS,
      payload: data,
    });

    dispatch(incrementSlotByDate(slotDate));
  } catch (err) {
    dispatch({
      type: DELETE_A_BOOKING_FAIL,
      payload:
        err.response && err.response.data.msg ? err.response.data.msg : err.msg,
    });
  }
};
