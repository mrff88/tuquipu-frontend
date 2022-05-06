import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/features/usersSlice';
import localStorageMiddleware from './middlewares/localStorageMiddleware';
import fromLocalStorage from './preloadState/fromLocalStorage';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  preloadedState: fromLocalStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
