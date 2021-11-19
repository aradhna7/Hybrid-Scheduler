import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row, Col, Input, Label } from 'reactstrap';
import { Card, CardBody, CardText } from 'reactstrap';
import DatePicker from 'react-date-picker';
import { createSlot } from '../actions/slotActions';
import './Calender.css';
var moment = require('moment');

const NumOfSlotSetting = ({ history }) => {
  const dispatch = useDispatch();
  const bookingSlotState = useSelector((state) => state.slotCreate);

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
        return response.json();
      })
      .catch((err) => {
        return err;
      });
  };

  const { error, slotCreate } = bookingSlotState;

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (slotCreate) {
      alert('SLOTS CREATED');
    }
  }, [error, slotCreate]);

  const [numOfSlot, setnumOfSlot] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numOfSlot < 0) {
      alert('Number of slot has to be greater than 0');
    } else {
      dispatch(createSlot(numOfSlot, moment(value).format('Do,MMMM,YYYY')));
      setnumOfSlot(0);
      return slotCreate && <Redirect to='/' />;
    }
  };

  const [value, onChange] = useState(new Date());

  const handleChange = (e) => {
    setnumOfSlot(e.target.value);
  };

  const [num, setNum] = useState(0);

  useEffect(() => {
    const slotDate = moment(value).format('Do,MMMM,YYYY');
    getnumslots({ slotDate }).then((response) => {
      if (response == 'Entry Not Found') {
        setNum(-1);
      } else {
        setNum(response.numOfSlot);
      }
    });
  }, [value, error, slotCreate]);

  return (
    <div className='section section-examples'>
      <img
        alt='...'
        className='path'
        src={require('assets/img/path1.png').default}
      />
      <div className='space-50' />
      <Container className='text-center'>
        <h1>Create Slots</h1>
        <Row>
          <Card className='box-num-slots neutral'>
            <CardBody className='box-num-slots mt-3'>
              <CardText>
                <h2>
                  {moment(value).format('Do,MMMM,YYYY')},{' '}
                  {moment(value).format('dddd')}
                </h2>
              </CardText>
              <Row>
                <Col sm='12' className='box-num-slots mb-5 mt-3 '>
                  <DatePicker onChange={onChange} value={value} />
                  <h4></h4>
                  {num == -1 ? (
                    <h4>No slots allocated till now</h4>
                  ) : (
                    <h4>Number Of slots allocated: {num}</h4>
                  )}
                </Col>
                <Col sm='6' className='box-num-slots'>
                  <h3>Enter number of slots to create:</h3>
                </Col>
                <Col sm='6' className='box-num-slots'>
                  <Input
                    style={{ borderColor: '#ffffff' }}
                    value={numOfSlot}
                    className='neutral'
                    onChange={handleChange}
                    type='number'
                  ></Input>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
        <Button
          className='btn-round'
          color='primary'
          size='lg'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Container>
    </div>
  );
};

export default NumOfSlotSetting;
