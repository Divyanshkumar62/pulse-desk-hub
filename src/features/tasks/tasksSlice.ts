import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  memberId: string;
  title: string;
  dueDate: string;
  completed: boolean;
  progress: number;
}

const initialState: Task[] = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ memberId: string; title: string; dueDate: string }>) => {
      const id = Date.now().toString();
      state.push({
        id,
        ...action.payload,
        completed: false,
        progress: 0,
      });
    },
    toggleTaskComplete: (state, action: PayloadAction<{ taskId: string }>) => {
      const task = state.find(t => t.id === action.payload.taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateProgress: (state, action: PayloadAction<{ taskId: string; progress: number }>) => {
      const task = state.find(t => t.id === action.payload.taskId);
      if (task) {
        task.progress = action.payload.progress;
      }
    },
  },
});

export const { addTask, toggleTaskComplete, updateProgress } = tasksSlice.actions;
export default tasksSlice.reducer;
