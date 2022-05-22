import axios from 'axios';
import { ENDPOINTS } from '../constants';

const { SERVICES } = ENDPOINTS;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createService = async ({ service, deviceId }) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${SERVICES.CREATE}${deviceId}`;

  try {
    const response = await axios.post(url, service, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllServices = async (deviceId) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${SERVICES.ALL}${deviceId}`;

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

const getService = async (serviceId) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${SERVICES.READ}${serviceId}`;

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

const updateService = async ({ serviceId, editedService }) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${SERVICES.UPDATE}${serviceId}`;

  try {
    const response = await axios.put(url, editedService, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const servicesCtrl = {
  createService,
  getAllServices,
  getService,
  updateService,
};

export default servicesCtrl;
