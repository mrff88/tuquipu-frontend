import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    id: 0,
    message: '',
    severity: 'success',
  },
  reducers: {
    createNotification: (state, { payload: notification }) => {
      state.id = Date.now();
      state.message = notification.message;
      state.severity = notification.severity;
    },
  },
});

export const { createNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
