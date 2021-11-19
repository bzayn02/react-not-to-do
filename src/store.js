import { configureStore } from '@reduxjs/toolkit';

import taskReducer from './components/task-lists/taskSlice';

const store = configureStore({ reducer: { task: taskReducer } });

export default store;
