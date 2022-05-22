import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clientsCtrl } from '../../api';
import { createNotification } from './notificationsSlice';

const initialState = {};

// async thunks
export const createClientAsync = createAsyncThunk(
  'clients/create',
  async (client, { dispatch, rejectWithValue }) => {
    try {
      const result = await clientsCtrl.createClient(client);
      dispatch(
        createNotification({ message: 'Se registro al cliente con exito' })
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

export const getAllClientsAsync = createAsyncThunk(
  'clients/all',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await clientsCtrl.getAllClients();
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

export const getClientAsync = createAsyncThunk(
  'clients/read',
  async (clientId, { dispatch, rejectWithValue }) => {
    try {
      const result = await clientsCtrl.getClient(clientId);
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

export const updateClientAsync = createAsyncThunk(
  'clients/update',
  async (clientData, { dispatch, rejectWithValue }) => {
    try {
      const result = await clientsCtrl.updateClient(clientData);
      dispatch(
        createNotification({
          message: 'Se actualizo los datos del cliente con exito',
        })
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

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clientInfo: (state, { payload: client }) => {
      state.clientInfo = client;
      state.showModalClientInfo = true;
    },
    hideModalClientInfor: (state) => {
      state.showModalClientInfo = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClientAsync.pending, (state) => {
        state.isCreating = true;
        state.created = null;
        state.createClientErrorMessage = null;
      })
      .addCase(createClientAsync.fulfilled, (state, { payload: newClient }) => {
        state.isCreating = false;
        state.created = newClient;
      })
      .addCase(
        createClientAsync.rejected,
        (state, { payload: createClientErrorMessage }) => {
          state.isCreating = false;
          state.createClientErrorMessage = createClientErrorMessage;
        }
      )
      .addCase(getAllClientsAsync.pending, (state) => {
        state.isLoadingAll = true;
        state.clients = null;
        state.loadingAllErrorMessage = null;
      })
      .addCase(
        getAllClientsAsync.fulfilled,
        (state, { payload: allClients }) => {
          state.isLoadingAll = false;
          state.clients = allClients;
        }
      )
      .addCase(
        getAllClientsAsync.rejected,
        (state, { payload: loadingAllErrorMessage }) => {
          state.isLoadingAll = false;
          state.loadingAllErrorMessage = loadingAllErrorMessage;
        }
      )
      .addCase(getClientAsync.pending, (state) => {
        state.isLoading = true;
        state.client = null;
        state.loadingErrorMessage = null;
      })
      .addCase(getClientAsync.fulfilled, (state, { payload: client }) => {
        state.isLoading = false;
        state.client = client;
      })
      .addCase(
        getClientAsync.rejected,
        (state, { payload: loadingErrorMessage }) => {
          state.isLoading = false;
          state.loadingErrorMessage = loadingErrorMessage;
        }
      )
      .addCase(updateClientAsync.pending, (state) => {
        state.isUpdatingClient = true;
        state.updateResult = null;
        state.updatingErrorMessage = null;
      })
      .addCase(
        updateClientAsync.fulfilled,
        (state, { payload: updateResult }) => {
          state.isUpdatingClient = false;
          state.updateResult = updateResult;
        }
      )
      .addCase(
        updateClientAsync.rejected,
        (state, { payload: updatingErrorMessage }) => {
          state.isUpdatingClient = false;
          state.updatingErrorMessage = updatingErrorMessage;
        }
      );
  },
});

// actions export
export const { clientInfo, hideModalClientInfor } = clientsSlice.actions;

// selectors
export const selectClientInfo = (state) => state.clients.clientInfo;
export const selectShowModalClientInfo = (state) =>
  state.clients.showModalClientInfo;
export const selectClients = (state) => state.clients.clients;
export const selectIsCreatingClient = (state) => state.clients.isCreating;
export const selectCreatedClient = (state) => state.clients.created;
export const selectClient = (state) => state.clients.client;
export const selectIsLoading = (state) => state.clients.isLoading;
export const selectLoadingError = (state) => state.clients.loadingErrorMessage;
export const selectIsUpdatingClient = (state) => state.clients.isUpdatingClient;

export default clientsSlice.reducer;
