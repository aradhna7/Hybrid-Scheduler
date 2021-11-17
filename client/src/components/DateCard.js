import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getNumOfSlotByDate } from '../actions/slotActions';
var moment = require('moment');

const checkdis = (str) => {
  if (str == 'Sunday') {
    return true;
  }
  return false;
};

const DateCard = ({ date, slotDate, day, weekday }) => {
  const dispatch = useDispatch();
  const numOfSlots = useSelector((state) => state.getNumOfSlotsByDate);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const getnumslots = (data) => {
    return fetch(`/api/slot/booking/date`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // console.log(response);
        // console.log(response.json());
        return response.json();
      })
      .catch((err) => {
        return err;
      });
  };

  const [value, setValue] = useState(0);

  const { slot } = numOfSlots;

  useEffect(() => {
    getnumslots({ slotDate }).then((response) => {
      if (response == 'Entry Not Found') {
      } else {
        setValue(response.numOfSlotRemaining);
      }
    });

    // dispatch(getNumOfSlotByDate(slotDate));
    // if (slot) {
    //   setValue(slot.numOfSlot);
    // }
  }, [date]);

  return (
    <Card>
      <CardBody>
        <CardText>
          <h2>{day}</h2>
          <h4>{date}</h4>
        </CardText>
        <Button
          disabled={value == 0 || checkdis(weekday)}
          color='primary'
          href={`/booking/${slotDate}`}
          style={{ padding: '13px 20px 0px 20px' }}
        >
          Book slot{' '}
          <span
            style={{
              backgroundColor: '#5603ad',
              borderRadius: '5px 20px 5px',
            }}
            className='mt-2'
          >
            {value}
          </span>
          {/* <span className='numberCircle' style={{ backgroundColor: '#5603ad' }}>
            
          </span> */}
          <br />
        </Button>
      </CardBody>
    </Card>
  );
};

export default DateCard;
