import axios from 'axios';
import { ENDPOINTS } from '../constants';

const { CLIENTS } = ENDPOINTS;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createClient = async (client) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${CLIENTS.CREATE}`;

  try {
    const response = await axios.post(url, client, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllClients = async () => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${CLIENTS.ALL}`;

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

const getClient = async (clientId) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${CLIENTS.READ}${clientId}`;

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

const updateClient = async ({ clientId, editedClient }) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${CLIENTS.UPDATE}${clientId}`;

  try {
    const response = await axios.put(url, editedClient, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const clientsCtrl = {
  createClient,
  getAllClients,
  getClient,
  updateClient,
};

export default clientsCtrl;
