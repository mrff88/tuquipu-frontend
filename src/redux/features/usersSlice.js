import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userCtrl } from '../../api';
import { createNotification } from './notificationsSlice';

const initialState = {};

export const createUserAsync = createAsyncThunk(
  'users/create',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const result = await userCtrl.createUser(user);
      dispatch(
        createNotification({ message: 'Se registro el usuario con exito' })
      );
      return result.data;
    } catch (error) {
      dispatch(
        createNotification({
          message: error.response.data.message,
          severity: 'error',
        })
      );
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginAsync = createAsyncThunk(
  'users/login',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const result = await userCtrl.login(user);
      dispatch(createNotification({ message: 'Inicio de sesión exitoso' }));
      return result.data;
    } catch (error) {
      // console.log(error);
      dispatch(
        createNotification({
          message: error.response.data.message,
          severity: 'error',
        })
      );
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.isCreating = true;
        state.created = null;
        state.createUserErrorMessage = null;
      })
      .addCase(createUserAsync.fulfilled, (state, { payload: newUser }) => {
        state.isCreating = false;
        state.created = newUser;
      })
      .addCase(
        createUserAsync.rejected,
        (state, { payload: createUserErrorMessage }) => {
          state.isCreating = false;
          state.createUserErrorMessage = createUserErrorMessage;
        }
      )
      .addCase(loginAsync.pending, (state) => {
        state.isLogin = true;
        state.loginErrorMessage = null;
      })
      .addCase(loginAsync.fulfilled, (state, { payload: token }) => {
        state.isLogin = false;
        state.token = token;
      })
      .addCase(loginAsync.rejected, (state, { payload: loginErrorMessage }) => {
        state.isLogin = false;
        state.loginErrorMessage = loginErrorMessage;
      });
  },
});

// actions export
export const { logOut } = usersSlice.actions;

// selectors
export const selectToken = (state) => state.users.token;
export const selectIsCreating = (state) => state.users.isCreating;
export const selectCreatedUser = (state) => state.users.created;
export const selectIsLogin = (state) => state.users.isLogin;

export default usersSlice.reducer;
