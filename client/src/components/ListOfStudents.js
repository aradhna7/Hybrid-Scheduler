import React from 'react';
import { Button, Table } from 'reactstrap';

const eachRowTable = (slot, id) => {
  const clicktoshow = () => {
    window.open(slot.user.vaccination_certi);
  };
  return (
    <tr>
      <th scope='row'>{id + 1}</th>
      <td>{slot.user.name}</td>
      <td>
        <Button onClick={clicktoshow}>Open</Button>
      </td>
    </tr>
  );
};

const ListOfStudents = ({ slots }) => {
  return (
    <div>
      <h1 className='mt-4'>List Of Students</h1>
      {slots && (
        <Table className='mt-4'>
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
