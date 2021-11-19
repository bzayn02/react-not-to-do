import { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button, Spinner } from 'react-bootstrap';
import { AddTaskForm } from './components/form/AddTaskForm';

import { useDispatch, useSelector } from 'react-redux';
import { TaskList } from './components/task-lists/TaskList';
import { NotToDoList } from './components/task-lists/NotToDoList';
import { AlertMessage } from './components/message/AlertMessage';
import {
  createTask,
  getTaskLists,
  switchTask,
  deleteTasks,
} from './apis/taskApi';
import './App.css';
import { fetchTaskLists } from './components/task-lists/taskAction';

const HRPW = 168;
const initialResponse = {
  status: '',
  message: '',
};
const App = () => {
  const dispatch = useDispatch();
  const { isPending } = useSelector((state) => state.task);
  const [tasks, setTasks] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState([]);
  const [apiResponse, setApiResponse] = useState(initialResponse);

  const totalHrs = tasks?.reduce((subttl, itm) => subttl + +itm.hr, 0);

  useEffect(() => {
    dispatch(fetchTaskLists());
  }, []);

  const fetchAllTasks = async () => {
    const { result } = await getTaskLists();
    setTasks(result);
  };

  // const addTaskList = async (frmDt) => {
  //   if (totalHrs + +frmDt.hr > HRPW) {
  //     setApiResponse({
  //       status: 'error',
  //       message: 'Not enough hours left to allocate the task.',
  //     });
  //     return;
  //   }
  // const result = await createTask(frmDt);
  // };

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
      setTaskToDelete([...taskToDelete, value]);
    } else {
      const filterArg = taskToDelete.filter((item) => item !== value);
      setTaskToDelete(filterArg);
    }
  };

  //Delete a list from task lists and bad lists
  const handleOnDeleteItems = async () => {
    //request serrver to delete the items from database
    const { deletedCount } = await deleteTasks({ ids: taskToDelete });
    deletedCount > 0 &&
      fetchAllTasks() &&
      setApiResponse({
        status: 'success',
        message: 'Selected task has been deleted.',
      });
  };

  //task list only
  const taskListsOnly = tasks?.filter((item) => item.todo);

  //bad list only
  const badTaskListsOnly = tasks?.filter((item) => !item.todo);

  console.log(taskToDelete);

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
            <AlertMessage />
          </Col>
        </Row>
        <AddTaskForm />
        <hr />
        <Row>
          <Col>
            {isPending && <Spinner variant="info" animation="border" />}
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
              handleOnBadTaskClicked={handleOnTaskClicked}
              badTaskToDelete={taskToDelete}
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
