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
        createNotification({ message: 'Se registro al usuario con exito' })
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

export const getAllUsersAsync = createAsyncThunk(
  'users/all',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await userCtrl.getAllUsers();
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

export const updateUserStateAsync = createAsyncThunk(
  'users/update',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const result = await userCtrl.updateUserState(user);
      dispatch(
        createNotification({ message: 'Se actualizo el estado con exito' })
      );
      dispatch(getAllUsersAsync());
      dispatch(hideModalUserEdit());
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
    userToEdit: (state, { payload: userToEdit }) => {
      state.userToEdit = userToEdit;
      state.showModalUserEdit = true;
    },
    hideModalUserEdit: (state) => {
      state.showModalUserEdit = false;
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
      .addCase(getAllUsersAsync.pending, (state) => {
        state.isLoadingAll = true;
        state.users = null;
        state.loadingAllErrorMessage = null;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, { payload: allUsers }) => {
        state.isLoadingAll = false;
        state.users = allUsers;
      })
      .addCase(
        getAllUsersAsync.rejected,
        (state, { payload: loadingAllErrorMessage }) => {
          state.isLoadingAll = false;
          state.loadingAllErrorMessage = loadingAllErrorMessage;
        }
      )
      .addCase(updateUserStateAsync.pending, (state) => {
        state.isUpdatingUserState = true;
        state.updateResult = null;
        state.updatingErrorMessage = null;
      })
      .addCase(
        updateUserStateAsync.fulfilled,
        (state, { payload: updateResult }) => {
          state.isUpdatingUserState = false;
          state.updateResult = updateResult;
        }
      )
      .addCase(
        updateUserStateAsync.rejected,
        (state, { payload: updatingErrorMessage }) => {
          state.isUpdatingUserState = false;
          state.updatingErrorMessage = updatingErrorMessage;
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
export const { logOut, userToEdit, hideModalUserEdit } = usersSlice.actions;

// selectors
export const selectUserToEdit = (state) => state.users.userToEdit;
export const selectShowModalUserEdit = (state) => state.users.showModalUserEdit;
export const selectUsers = (state) => state.users.users;
export const selectIsLoadingAll = (state) => state.users.isLoadingAll;
export const selectIsUpdatingUserState = (state) =>
  state.users.isUpdatingUserState;
export const selectToken = (state) => state.users.token;
export const selectIsCreating = (state) => state.users.isCreating;
export const selectCreatedUser = (state) => state.users.created;
export const selectIsLogin = (state) => state.users.isLogin;

export default usersSlice.reducer;
