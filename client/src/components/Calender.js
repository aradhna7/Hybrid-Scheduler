import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import './Calender.js';
import DateCard from './DateCard';
var moment = require('moment');

const Calender = ({ history }) => {
  const [today, setToday] = useState(moment());

  const dispatch = useDispatch();
  const bookingSlotState = useSelector((state) => state.bookingSlot);

  const { error, data } = bookingSlotState;

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (data) {
      alert('SLOTS CREATED');
    }
  }, [error, data]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  return (
    <div className='section section-examples' data-background-color='black'>
      <img
        alt='...'
        className='path'
        src={require('assets/img/path1.png').default}
      />
      <div className='space-50' />
      <Container className='text-center'>
        <h1>Slot Booking</h1>
        <Row>
          <Col sm='2'>
            <DateCard
              date={today.format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <Col sm='2'>
            <DateCard
              date={today.add(1, 'days').format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <Col sm='2'>
            <DateCard
              date={today.add(1, 'days').format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <Col sm='2'>
            <DateCard
              date={today.add(1, 'days').format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <Col sm='2'>
            <DateCard
              date={today.add(1, 'days').format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <Col sm='2'>
            <DateCard
              date={today.add(1, 'days').format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <Col sm='2'>
            <DateCard
              date={today.add(1, 'days').format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <Col sm='2'>
            <DateCard
              date={today.add(1, 'days').format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <Col sm='2'>
            <DateCard
              date={today.add(1, 'days').format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <Col sm='2'>
            <DateCard
              date={today.add(1, 'days').format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <Col sm='2'>
            <DateCard
              date={today.add(1, 'days').format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <Col sm='2'>
            <DateCard
              date={today.add(1, 'days').format('dddd, MMMM, YYYY')}
              slotDate={today.format('Do,MMMM,YYYY')}
              day={today.format('Do')}
              weekday={today.format('dddd')}
            />
          </Col>
          <small>{today.subtract(11, 'days').format('Do')}</small>
        </Row>
      </Container>
    </div>
  );
};

export default Calender;
