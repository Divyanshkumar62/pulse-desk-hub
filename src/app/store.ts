import { configureStore } from '@reduxjs/toolkit';
import membersReducer from '../features/members/membersSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import roleReducer from '../features/role/roleSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    role: roleReducer,
    members: membersReducer,
    tasks: tasksReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;