import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Spinner } from 'react-bootstrap';
import { AddTaskForm } from './components/form/AddTaskForm';

import { TaskList } from './components/task-lists/TaskList';
import { NotToDoList } from './components/task-lists/NotToDoList';
import { createTask, getTaskLists, switchTask } from './apis/taskApi';

import './App.css';

const hrPwk = 168;
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [badTasks, setBadTasks] = useState([]);
  const [error, setError] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState([]);
  const [badTaskToDelete, setBadTaskToDelete] = useState([]);

  const taskHrs = tasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
  const badHours = badTasks.reduce((subttl, itm) => subttl + +itm.hr, 0);
  const totalHrs = taskHrs + badHours;

  useEffect(() => {
    // fetch all the tasks  and add to the lists.
    const fetchingAllTask = async () => {
      const { result } = await getTaskLists();
      setTasks(result);
    };
    fetchingAllTask();
  }, []);

  const fetchAllTasks = async () => {
    const { result } = await getTaskLists();
    setTasks(result);
  };

  const addTaskList = async (frmDt) => {
    const result = await createTask(frmDt);

    if (result._id) {
      //new task has been added successfully, now we can call api to fetch allteh data

      console.log(result);
    } else {
      alert('unable to add teh task at the moment. please try again later.');
    }
  };
  // sending form data to the server

  // if (hrPwk < totalHrs + +frmDt.hr) {
  // 	setError(true);
  // } else {
  // 	error && setError(false);
  // 	setTasks([...tasks, frmDt]);
  // }

  const markAsBadList = async (_id) => {
    console.log(_id);
    const dt = {
      id: _id,
      todo: false,
    };
    const res = await switchTask(dt);
    console.log(res);
    if (res.result._id) {
      fetchAllTasks();
    }
  };

  const markAsGoodList = async (_id) => {
    console.log(_id);
    const dt = {
      id: _id,
      todo: true,
    };
    const res = await switchTask(dt);
    console.log(res);
    if (res.result._id) {
      fetchAllTasks();
    }
  };
  //colelct indices of the task lsits  to be deleted.

  const handleOnTaskClicked = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setTaskToDelete([...taskToDelete, +value]);
    } else {
      // const tempArg = [...taskToDelete]
      // tempArg.splice(value, 1)
      // setTaskToDelete(tempArg);
      const filterArg = taskToDelete.filter((item) => item !== +value);
      setTaskToDelete(filterArg);
    }
  };

  //Delete item from task list only
  const deleteFromTaskList = () => {
    const newArg = tasks.filter((item, i) => !taskToDelete.includes(i));

    setTaskToDelete([]);

    setTasks(newArg);
  };

  //from bad lsit
  const deleteFromBadTaskList = () => {
    const newArg = badTasks.filter((item, i) => !badTaskToDelete.includes(i));

    setBadTaskToDelete([]);

    setBadTasks(newArg);
  };

  //Delete a list from task lists and bad lists
  const handleOnDeleteItems = () => {
    deleteFromTaskList();
    deleteFromBadTaskList();
  };

  //list teh abd items indexx on checkbox click
  const handleOnBadTaskClicked = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setBadTaskToDelete([...badTaskToDelete, +value]);
    } else {
      const filterArg = badTaskToDelete.filter((item) => item !== +value);
      setBadTaskToDelete(filterArg);
    }
  };

  //task list only
  const taskListsOnly = tasks.filter((item) => item.todo);

  //bad list only
  const badTaskListsOnly = tasks.filter((item) => !item.todo);
  return (
    <div className="main">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center mt-5">Not To-Do Task List</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            {error && (
              <Alert variant="danger">
                !!! You can not add this task since it exceeds total hours in a
                week i.e. 168 hrs/week.
              </Alert>
            )}
          </Col>
        </Row>
        <AddTaskForm addTaskList={addTaskList} />
        <hr />
        <Row>
          <Col>
            {!tasks.length && !badTasks.length && (
              <Spinner variant="info" animation="border" />
            )}
            <TaskList
              tasks={taskListsOnly}
              markAsBadList={markAsBadList}
              taskToDelete={taskToDelete}
              handleOnTaskClicked={handleOnTaskClicked}
            />
          </Col>
          <Col>
            <NotToDoList
              badTasks={badTaskListsOnly}
              markAsGoodList={markAsGoodList}
              badHours={badHours}
              handleOnBadTaskClicked={handleOnBadTaskClicked}
            />
          </Col>
        </Row>

        <Row className="py-3">
          <Col>
            <Button variant="danger" onClick={handleOnDeleteItems}>
              Delete
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert variant="info">
              Your total allocated hours = {totalHrs} / 168 hours per week
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
