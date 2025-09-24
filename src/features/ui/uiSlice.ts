import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MemberStatus } from '../members/membersSlice';

interface UiState {
  sidebarCollapsed: boolean;
  memberFilter: MemberStatus | 'all';
  sortBy: 'name' | 'status' | 'lastActive';
  sortOrder: 'asc' | 'desc';
  showTaskModal: boolean;
  selectedMemberId: string | null;
}

const initialState: UiState = {
  sidebarCollapsed: false,
  memberFilter: 'all',
  sortBy: 'name',
  sortOrder: 'asc',
  showTaskModal: false,
  selectedMemberId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setMemberFilter: (state, action: PayloadAction<MemberStatus | 'all'>) => {
      state.memberFilter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'name' | 'status' | 'lastActive'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    toggleTaskModal: (state) => {
      state.showTaskModal = !state.showTaskModal;
    },
    setSelectedMember: (state, action: PayloadAction<string | null>) => {
      state.selectedMemberId = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setMemberFilter,
  setSortBy,
  setSortOrder,
  toggleTaskModal,
  setSelectedMember,
} = uiSlice.actions;

export default uiSlice.reducer;