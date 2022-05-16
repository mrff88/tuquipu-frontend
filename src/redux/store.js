import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/features/usersSlice';
import notificationsReducer from '../redux/features/notificationsSlice';
import localStorageMiddleware from './middlewares/localStorageMiddleware';
import fromLocalStorage from './preloadState/fromLocalStorage';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    notifications: notificationsReducer,
  },
  preloadedState: fromLocalStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
