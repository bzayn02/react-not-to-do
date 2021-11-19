import React, { useState } from 'react';
import { addTask } from '../task-lists/taskAction';
import { useDispatch } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';

const initialForm = {
  task: '',
  hr: '',
};
export const AddTaskForm = () => {
  const dispatch = useDispatch();
  const [frmData, setFrmData] = useState(initialForm);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFrmData({
      ...frmData,
      [name]: value,
    });
    console.log(name, value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(frmData));
  };
  return (
    <Form onSubmit={handleOnSubmit}>
      <Row>
        <Col>
          <Form.Control
            name="task"
            onChange={handleOnChange}
            value={frmData.task}
            maxLength="30"
            placeholder="Enter the task"
            required
          />
        </Col>
        <Col>
          <Form.Control
            name="hr"
            onChange={handleOnChange}
            value={frmData.hr}
            type="number"
            placeholder="Enter the hours"
            required
          />
        </Col>

        <Col>
          <Button type="submit" variant="primary">
            Add Task
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
