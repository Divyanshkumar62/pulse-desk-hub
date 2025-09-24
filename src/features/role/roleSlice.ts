import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoleState {
  currentRole: 'member' | 'lead';
  currentUser: string;
}

const initialState: RoleState = {
  currentRole: 'member',
  currentUser: 'User',
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchRole: (state, action: PayloadAction<'member' | 'lead'>) => {
      state.currentRole = action.payload;
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { switchRole, setUser } = roleSlice.actions;
export default roleSlice.reducer;
