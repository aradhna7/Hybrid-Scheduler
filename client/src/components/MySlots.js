import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getMySlots } from '../actions/slotActions';

import { Table } from 'reactstrap';

const eachRowTable = (slot, id) => {
  return (
    <tr>
      <th scope='row'>{id + 1}</th>
      <td>{slot.slotDate}</td>
      <td>
        {' '}
        <img
          style={{ width: '200px', height: '200px' }}
          alt='...'
          src={slot.vaccination_certi}
        />
      </td>
    </tr>
  );
};

const MySlots = () => {
  const dispatch = useDispatch();
  const mySlot = useSelector((state) => state.mySlot);

  useEffect(() => {
    dispatch(getMySlots());
  }, []);

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
                <th>Name</th>
                <th>Vacination_Certificate</th>
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
