import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row, Col, Input, Label } from 'reactstrap';
import { Card, CardBody, CardText } from 'reactstrap';
import DatePicker from 'react-date-picker';
import { getSlotBookingByDate } from '../actions/slotActions';
import './Calender.css';
import ListOfStudents from './ListOfStudents';
var moment = require('moment');

const GetDetailsOfSlot = ({ history }) => {
  const [value, onChange] = useState(new Date());
  const [slotList, setSlotList] = useState([]);

  const dispatch = useDispatch();
  const bookingList = useSelector((state) => state.listSlotBookingByDate);

  const { slots, loading } = bookingList;

  useEffect(() => {
    setSlotList({ ...slotList, slots });
  }, [slots, loading]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isTeacher) {
      history.push('/login');
    }
  }, [history, userInfo]);

  const getListSlots = (e) => {
    e.preventDefault();
    dispatch(getSlotBookingByDate(moment(value).format('Do,MMMM,YYYY')));
  };

  return (
    <div className='section section-examples' data-background-color='black'>
      <img
        alt='...'
        className='path'
        src={require('assets/img/path1.png').default}
      />
      <div className='space-50' />
      <Container className='text-center'>
        <h1>Get List Of Students</h1>
        <Row>
          <Card className='box-num-slots neutral'>
            <CardBody className='box-num-slots mt-3'>
              <CardText>
                <h2>{moment(value).format('Do,MMMM,YYYY')}</h2>
                <h4>{moment(value).format('dddd')}</h4>
              </CardText>
              <Row>
                <Col sm='12' className='box-num-slots mb-5 mt-3 '>
                  <DatePicker onChange={onChange} value={value} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
        <Button
          className='btn-round'
          color='primary'
          size='lg'
          onClick={getListSlots}
        >
          Get List
        </Button>

        {/* {loading ? 'loading' : TableList(slotList)} */}
        {/* {slots && TableList(slots)}
        {JSON.stringify(slots)} */}
        {/* {loading
          ? 'loading'
          : slotList && slotList.length > 0
          ? TableList(slots)
          : 'no record found'} */}
        {loading ? 'loading' : <ListOfStudents slots={slots} />}
      </Container>
    </div>
  );
};

export default GetDetailsOfSlot;
