import React from 'react';
import { Table } from 'reactstrap';

const eachRowTable = (slot, id) => {
  return (
    <tr>
      <th scope='row'>{id + 1}</th>
      <td>{slot.user.name}</td>
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

const ListOfStudents = ({ slots }) => {
  return (
    <div>
      <h1 className='mt-4'>List Of Students</h1>
      {slots && (
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
      )}
    </div>
  );
};

export default ListOfStudents;
