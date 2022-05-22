import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../redux/features/usersSlice';
import clientsReducer from '../redux/features/clientsSlice';
import devicesReducer from '../redux/features/devicesSlice';
import notificationsReducer from '../redux/features/notificationsSlice';
import localStorageMiddleware from './middlewares/localStorageMiddleware';
import fromLocalStorage from './preloadState/fromLocalStorage';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    clients: clientsReducer,
    notifications: notificationsReducer,
    devices: devicesReducer,
  },
  preloadedState: fromLocalStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
