import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'teamLead' | 'teamMember';

interface RoleState {
  currentRole: UserRole;
  currentUserId: string;
}

const initialState: RoleState = {
  currentRole: 'teamLead',
  currentUserId: 'current-user-id',
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    toggleRole: (state) => {
      state.currentRole = state.currentRole === 'teamLead' ? 'teamMember' : 'teamLead';
    },
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload;
    },
  },
});

export const { toggleRole, setCurrentUser } = roleSlice.actions;
export default roleSlice.reducer;