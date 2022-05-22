import axios from 'axios';
import { ENDPOINTS } from '../constants';

const { DEVICES } = ENDPOINTS;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createDevice = async ({ device, clientId }) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${DEVICES.CREATE}${clientId}`;

  try {
    const response = await axios.post(url, device, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllDevices = async (clientId) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${DEVICES.ALL}${clientId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDevice = async (deviceId) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${DEVICES.READ}${deviceId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateDevice = async ({ deviceId, editedDevice }) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${DEVICES.UPDATE}${deviceId}`;

  try {
    const response = await axios.put(url, editedDevice, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const devicesCtrl = {
  createDevice,
  getAllDevices,
  getDevice,
  updateDevice,
};

export default devicesCtrl;
