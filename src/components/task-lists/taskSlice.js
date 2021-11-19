import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskList: [],
  status: '',
  message: '',
  isPending: false,
};
const taskSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    //update state when pending]

    requestPending: (state) => {
      state.isPending = true;
    },
    //update state when response is success
    addTaskSuccess: (state, { payload }) => {
      state.status = payload.status;
      state.message = payload.message;
      state.isPending = false;
    },

    //update all tasks and update state
    fetchTasksSuccess: (state, { payload }) => {
      state.isPending = false;
      state.taskList = payload;
    },
    //update state when response is fail
    requestFail: (state, action) => {
      state.isPending = false;
    },
  },
});

const { reducer, actions } = taskSlice;

export const {
  requestPending,
  addTaskSuccess,
  requestFail,
  fetchTasksSuccess,
} = actions;

export default reducer;
