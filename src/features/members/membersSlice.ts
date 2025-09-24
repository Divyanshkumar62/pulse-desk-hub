import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type MemberStatus = 'Working' | 'Break' | 'Meeting' | 'Offline';

export interface Member {
  id: string;
  name: string;
  avatar: string;
  status: MemberStatus;
  lastActiveAt: number;
  tasks: string[];
}

const membersAdapter = createEntityAdapter<Member>();

export const fetchMembers = createAsyncThunk(
  'members/fetch',
  async (count: number = 8): Promise<Member[]> => {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await res.json();
    
    const statuses: MemberStatus[] = ['Working', 'Break', 'Meeting', 'Offline'];
    
    return data.results.map((u: any, i: number) => ({
      id: u.login.uuid,
      name: `${u.name.first} ${u.name.last}`,
      avatar: u.picture.medium,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastActiveAt: Date.now() - Math.random() * 3600000, // Random time within last hour
      tasks: [],
    }));
  }
);

interface MembersState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const membersSlice = createSlice({
  name: 'members',
  initialState: membersAdapter.getInitialState<MembersState>({
    loading: 'idle',
    error: null,
  }),
  reducers: {
    updateStatus: (state, action: PayloadAction<{ id: string; status: MemberStatus }>) => {
      membersAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          status: action.payload.status,
          lastActiveAt: Date.now(),
        },
      });
    },
    addTaskToMember: (state, action: PayloadAction<{ memberId: string; taskId: string }>) => {
      const member = state.entities[action.payload.memberId];
      if (member) {
        member.tasks.push(action.payload.taskId);
      }
    },
    removeTaskFromMember: (state, action: PayloadAction<{ memberId: string; taskId: string }>) => {
      const member = state.entities[action.payload.memberId];
      if (member) {
        member.tasks = member.tasks.filter(id => id !== action.payload.taskId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        membersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch members';
      });
  },
});

export const { updateStatus, addTaskToMember, removeTaskFromMember } = membersSlice.actions;

// Selectors
export const {
  selectAll: selectAllMembers,
  selectById: selectMemberById,
  selectIds: selectMemberIds,
} = membersAdapter.getSelectors((state: RootState) => state.members);

export const selectMemberCountsByStatus = (state: RootState) => {
  const members = selectAllMembers(state);
  return members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1;
    return acc;
  }, {} as Record<MemberStatus, number>);
};

export default membersSlice.reducer;