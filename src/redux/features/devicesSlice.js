import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { devicesCtrl } from '../../api';
import { createNotification } from './notificationsSlice';

const initialState = {};

// async thunks
export const createDeviceAsync = createAsyncThunk(
  'devices/create',
  async (deviceData, { dispatch, rejectWithValue }) => {
    try {
      const result = await devicesCtrl.createDevice(deviceData);
      dispatch(
        createNotification({ message: 'Se registro el dispositivo con exito' })
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

export const getAllDevicesAsync = createAsyncThunk(
  'devices/all',
  async (clientId, { dispatch, rejectWithValue }) => {
    try {
      const result = await devicesCtrl.getAllDevices(clientId);
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

export const getDeviceAsync = createAsyncThunk(
  'devices/read',
  async (deviceId, { dispatch, rejectWithValue }) => {
    try {
      const result = await devicesCtrl.getDevice(deviceId);
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

export const updateDeviceAsync = createAsyncThunk(
  'devices/update',
  async (deviceData, { dispatch, rejectWithValue }) => {
    try {
      const result = await devicesCtrl.updateDevice(deviceData);
      dispatch(
        createNotification({
          message: 'Se actualizo los datos del dispositivo con exito',
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

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    deviceInfo: (state, { payload: device }) => {
      state.deviceInfo = device;
      state.showModalDeviceInfo = true;
    },
    hideModalDeviceInfor: (state) => {
      state.showModalDeviceInfo = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDeviceAsync.pending, (state) => {
        state.isCreating = true;
        state.created = null;
        state.createDeviceErrorMessage = null;
      })
      .addCase(createDeviceAsync.fulfilled, (state, { payload: newDevice }) => {
        state.isCreating = false;
        state.created = newDevice;
      })
      .addCase(
        createDeviceAsync.rejected,
        (state, { payload: createDeviceErrorMessage }) => {
          state.isCreating = false;
          state.createDeviceErrorMessage = createDeviceErrorMessage;
        }
      )
      .addCase(getAllDevicesAsync.pending, (state) => {
        state.isLoadingAll = true;
        state.devices = null;
        state.loadingAllErrorMessage = null;
      })
      .addCase(
        getAllDevicesAsync.fulfilled,
        (state, { payload: allDevices }) => {
          state.isLoadingAll = false;
          state.devices = allDevices;
        }
      )
      .addCase(
        getAllDevicesAsync.rejected,
        (state, { payload: loadingAllErrorMessage }) => {
          state.isLoadingAll = false;
          state.loadingAllErrorMessage = loadingAllErrorMessage;
        }
      )
      .addCase(getDeviceAsync.pending, (state) => {
        state.isLoading = true;
        state.device = null;
        state.loadingErrorMessage = null;
      })
      .addCase(getDeviceAsync.fulfilled, (state, { payload: device }) => {
        state.isLoading = false;
        state.device = device;
      })
      .addCase(
        getDeviceAsync.rejected,
        (state, { payload: loadingErrorMessage }) => {
          state.isLoading = false;
          state.loadingErrorMessage = loadingErrorMessage;
        }
      )
      .addCase(updateDeviceAsync.pending, (state) => {
        state.isUpdatingDevice = true;
        state.updateResult = null;
        state.updatingErrorMessage = null;
      })
      .addCase(
        updateDeviceAsync.fulfilled,
        (state, { payload: updateResult }) => {
          state.isUpdatingDevice = false;
          state.updateResult = updateResult;
        }
      )
      .addCase(
        updateDeviceAsync.rejected,
        (state, { payload: updatingErrorMessage }) => {
          state.isUpdatingDevice = false;
          state.updatingErrorMessage = updatingErrorMessage;
        }
      );
  },
});

// actions export
export const { deviceInfo, hideModalDeviceInfor } = devicesSlice.actions;

// selectors
export const selectDeviceInfo = (state) => state.devices.deviceInfo;
export const selectShowModalDeviceInfo = (state) =>
  state.devices.showModalDeviceInfo;
export const selectDevices = (state) => state.devices.devices;
export const selectIsCreatingDevice = (state) => state.devices.isCreating;
export const selectCreatedDevice = (state) => state.devices.created;
export const selectDevice = (state) => state.devices.device;
export const selectIsLoading = (state) => state.devices.isLoading;
export const selectLoadingError = (state) => state.devices.loadingErrorMessage;
export const selectIsUpdatingDevice = (state) => state.devices.isUpdatingDevice;
export const selectUpdateResult = (state) => state.devices.updateResult;

export default devicesSlice.reducer;
