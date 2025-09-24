import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { RootState } from '../../app/store';

export type TaskStatus = 'active' | 'done';

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  dueDate: string;
  progress: number; // 0-100
  createdAt: number;
  status: TaskStatus;
}

const tasksAdapter = createEntityAdapter<Task>();

interface CreateTaskPayload {
  title: string;
  assignedTo: string;
  dueDate: string;
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.getInitialState(),
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        tasksAdapter.addOne(state, action.payload);
      },
      prepare: (payload: CreateTaskPayload) => ({
        payload: {
          id: nanoid(),
          ...payload,
          progress: 0,
          createdAt: Date.now(),
          status: 'active' as TaskStatus,
        },
      }),
    },
    updateTask: (state, action: PayloadAction<{ id: string; changes: Partial<Task> }>) => {
      tasksAdapter.updateOne(state, action.payload);
    },
    updateTaskProgress: (state, action: PayloadAction<{ id: string; delta: number }>) => {
      const task = state.entities[action.payload.id];
      if (task) {
        task.progress = Math.max(0, Math.min(100, task.progress + action.payload.delta));
        if (task.progress === 100) {
          task.status = 'done';
        } else if (task.status === 'done') {
          task.status = 'active';
        }
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      tasksAdapter.removeOne(state, action.payload);
    },
  },
});

export const { addTask, updateTask, updateTaskProgress, removeTask } = tasksSlice.actions;

// Selectors
export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds,
} = tasksAdapter.getSelectors((state: RootState) => state.tasks);

export const selectTasksForMember = (memberId: string) => (state: RootState) => {
  return selectAllTasks(state).filter(task => task.assignedTo === memberId);
};

export const selectActiveTasks = (state: RootState) => {
  return selectAllTasks(state).filter(task => task.status === 'active');
};

export default tasksSlice.reducer;