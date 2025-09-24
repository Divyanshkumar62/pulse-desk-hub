import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export type MemberStatus = 'Working' | 'Break' | 'Meeting' | 'Offline';

export interface Member {
  id: string;
  name: string;
  status: MemberStatus;
  tasks: string[];
}

interface MembersState {
  members: Member[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MembersState = {
  members: [
    { id: '1', name: 'Alice Johnson', status: 'Working', tasks: [] },
    { id: '2', name: 'Bob Smith', status: 'Break', tasks: [] },
    { id: '3', name: 'Charlie Brown', status: 'Meeting', tasks: [] },
    { id: '4', name: 'Diana Ross', status: 'Offline', tasks: [] },
  ],
  loading: 'idle',
  error: null,
};

export const fetchMembers = createAsyncThunk(
  'members/fetch',
  async (count: number = 8): Promise<Member[]> => {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await res.json();

    const statuses: MemberStatus[] = ['Working', 'Break', 'Meeting', 'Offline'];

    return data.results.map((u: any, i: number) => ({
      id: u.login.uuid,
      name: `${u.name.first} ${u.name.last}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      tasks: [],
    }));
  }
);

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<{ memberId: string; status: MemberStatus }>) => {
      const member = state.members.find(m => m.id === action.payload.memberId);
      if (member) {
        member.status = action.payload.status;
      }
    },
    addMember: (state, action: PayloadAction<Member>) => {
      state.members.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.members = action.payload;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch members';
      });
  },
});

export const { updateStatus, addMember } = membersSlice.actions;
export default membersSlice.reducer;
