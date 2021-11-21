import React, { useEffect } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABooking, getMySlots } from '../actions/slotActions';

import { Table } from 'reactstrap';

const MySlots = ({ history }) => {
  const dispatch = useDispatch();
  const mySlot = useSelector((state) => state.mySlot);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const deleteMyBooking = useSelector((state) => state.deleteMyBooking);
  const { error, msg } = deleteMyBooking;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  useEffect(() => {
    dispatch(getMySlots());
  }, [dispatch, msg, error]);

  //EACH ROW OF TABLE STRUCT
  const eachRowTable = (slot, id) => {
    console.log(slot._id);

    return (
      <tr>
        <th scope='row'>{id + 1}</th>
        <td>{slot.slotDate}</td>
        <td>
          {' '}
          <Button
            slotDate={slot.slotDate}
            name={slot._id}
            onClick={() => {
              dispatch(deleteABooking(slot._id, slot.slotDate));
            }}
            className='danger'
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  };

  const { slots, loading } = mySlot;
  return (
    <div className='section section-examples' data-background-color='black'>
      <img
        alt='...'
        className='path'
        src={require('assets/img/path1.png').default}
      />
      <div className='space-50' />
      <Container className='text-center'>
        <h1>My Booking</h1>

        {loading ? (
          <p>loading...</p>
        ) : slots && slots.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, id) => {
                return eachRowTable(slot, id);
              })}
            </tbody>
          </Table>
        ) : (
          <p>No Booking done yet</p>
        )}
        <Row></Row>
      </Container>
    </div>
  );
};

export default MySlots;
