import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { servicesCtrl } from '../../api';
import { createNotification } from './notificationsSlice';

const initialState = {};

// async thunks
export const createServiceAsync = createAsyncThunk(
  'services/create',
  async (serviceData, { dispatch, rejectWithValue }) => {
    try {
      const result = await servicesCtrl.createService(serviceData);
      dispatch(
        createNotification({ message: 'Se registro el servicio con exito' })
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

export const getAllServicesAsync = createAsyncThunk(
  'services/all',
  async (deviceId, { dispatch, rejectWithValue }) => {
    try {
      const result = await servicesCtrl.getAllServices(deviceId);
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

export const getServiceAsync = createAsyncThunk(
  'services/read',
  async (serviceId, { dispatch, rejectWithValue }) => {
    try {
      const result = await servicesCtrl.getService(serviceId);
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

export const updateServiceAsync = createAsyncThunk(
  'services/update',
  async (serviceData, { dispatch, rejectWithValue }) => {
    try {
      const result = await servicesCtrl.updateService(serviceData);
      dispatch(
        createNotification({
          message: 'Se actualizo el servicio con exito',
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

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    loadServiceToCancel: (state, { payload: service }) => {
      state.serviceToCancel = service;
      state.showModalCancelService = true;
    },
    hideModalCancelService: (state) => {
      state.showModalCancelService = false;
    },
    loadServiceToFinish: (state, { payload: service }) => {
      state.serviceToFinish = service;
      state.showModalFinishService = true;
    },
    hideModalFinishService: (state) => {
      state.showModalFinishService = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createServiceAsync.pending, (state) => {
        state.isCreating = true;
        state.created = null;
        state.createServiceErrorMessage = null;
      })
      .addCase(
        createServiceAsync.fulfilled,
        (state, { payload: newService }) => {
          state.isCreating = false;
          state.created = newService;
        }
      )
      .addCase(
        createServiceAsync.rejected,
        (state, { payload: createServiceErrorMessage }) => {
          state.isCreating = false;
          state.createServiceErrorMessage = createServiceErrorMessage;
        }
      )
      .addCase(getAllServicesAsync.pending, (state) => {
        state.isLoadingAll = true;
        state.services = null;
        state.loadingAllErrorMessage = null;
      })
      .addCase(
        getAllServicesAsync.fulfilled,
        (state, { payload: allServices }) => {
          state.isLoadingAll = false;
          state.services = allServices;
        }
      )
      .addCase(
        getAllServicesAsync.rejected,
        (state, { payload: loadingAllErrorMessage }) => {
          state.isLoadingAll = false;
          state.loadingAllErrorMessage = loadingAllErrorMessage;
        }
      )
      .addCase(getServiceAsync.pending, (state) => {
        state.isLoading = true;
        state.service = null;
        state.loadingErrorMessage = null;
      })
      .addCase(getServiceAsync.fulfilled, (state, { payload: service }) => {
        state.isLoading = false;
        state.service = service;
      })
      .addCase(
        getServiceAsync.rejected,
        (state, { payload: loadingErrorMessage }) => {
          state.isLoading = false;
          state.loadingErrorMessage = loadingErrorMessage;
        }
      )
      .addCase(updateServiceAsync.pending, (state) => {
        state.isUpdatingService = true;
        state.updateResult = null;
        state.updatingErrorMessage = null;
      })
      .addCase(
        updateServiceAsync.fulfilled,
        (state, { payload: updateResult }) => {
          state.isUpdatingService = false;
          state.updateResult = updateResult;
        }
      )
      .addCase(
        updateServiceAsync.rejected,
        (state, { payload: updatingErrorMessage }) => {
          state.isUpdatingService = false;
          state.updatingErrorMessage = updatingErrorMessage;
        }
      );
  },
});

// actions export
export const {
  hideModalCancelService,
  hideModalFinishService,
  loadServiceToCancel,
  loadServiceToFinish,
} = servicesSlice.actions;

// selectors
export const selectDeviceInfo = (state) => state.services.serviceInfo;
export const selectShowModalCancelService = (state) =>
  state.services.showModalCancelService;
export const selectShowModalFinishService = (state) =>
  state.services.showModalFinishService;
export const selectServices = (state) => state.services.services;
export const selectIsCreatingService = (state) => state.services.isCreating;
export const selectCreatedService = (state) => state.services.created;
export const selectService = (state) => state.services.service;
export const selectServiceToCancel = (state) => state.services.serviceToCancel;
export const selectServiceToFinish = (state) => state.services.serviceToFinish;
export const selectIsLoading = (state) => state.services.isLoading;
export const selectLoadingError = (state) => state.services.loadingErrorMessage;
export const selectIsUpdatingService = (state) =>
  state.services.isUpdatingService;
export const selectUpdateResult = (state) => state.services.updateResult;

export default servicesSlice.reducer;
