import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

export const NotToDoList = ({
  badTasks,
  markAsGoodList,
  badHours,
  handleOnBadTaskClicked,
}) => {
  return (
    <div>
      <h2>Bad Task List</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Tasks</th>
            <th>hours</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {badTasks.map((itm, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  defaultValue={i}
                  onChange={handleOnBadTaskClicked}
                />{' '}
                <label>{itm.task}</label>
              </td>
              <td>{itm.hr}</td>
              <td>
                <Button onClick={() => markAsGoodList(itm._id)}>
                  Mark AS To Do
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Alert variant="warning">You have save = {badHours} hours per week</Alert>
    </div>
  );
};
