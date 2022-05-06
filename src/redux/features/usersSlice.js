import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setToken: (state, { payload: token }) => {
      state.token = token;
    },
  },
});

// actions export
export const { setToken } = usersSlice.actions;

// selectors
export const selectToken = (state) => state.users.token;

export default usersSlice.reducer;
