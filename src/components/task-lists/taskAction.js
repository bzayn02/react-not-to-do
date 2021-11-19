import {
  requestPending,
  addTaskSuccess,
  requestFail,
  fetchTasksSuccess,
} from './taskSlice';
import { createTask, getTaskLists } from '../../apis/taskApi';

export const addTask = (newTask) => async (dispatch) => {
  //high order function
  //call add task api
  try {
    dispatch(requestPending());

    const result = await createTask(newTask);

    //new task has been added successfully, now we can call api to fetch allteh data
    dispatch(addTaskSuccess(result));
  } catch (error) {
    dispatch(
      requestFail({
        status: 'error',
        message: error.message,
      })
    );
  }
};

// fetch all the tasks and update in the redux store
export const fetchTaskLists = () => async (dispatch) => {
  try {
    dispatch(requestPending());
    const { result } = await getTaskLists();
    dispatch(fetchTasksSuccess(result));
  } catch (error) {
    dispatch(
      requestFail({
        status: 'error',
        message: error.message,
      })
    );
  }
};
