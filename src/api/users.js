import axios from 'axios';
import { ENDPOINTS } from '../constants';

const { USERS } = ENDPOINTS;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const login = async (user) => {
  const url = `${API_BASE_URL}${USERS.LOGIN}`;

  try {
    const response = await axios.post(url, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createUser = async (user) => {
  const url = `${API_BASE_URL}${USERS.CREATE}`;

  try {
    const response = await axios.post(url, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${USERS.ALL}`;

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

const updateUserState = async ({ _id, state }) => {
  const token = JSON.parse(localStorage.getItem('infoUser')).token;
  const url = `${API_BASE_URL}${USERS.UPDATE}/${_id}`;

  try {
    const response = await axios.put(
      url,
      {
        state: state === 'inactivo' ? 'activo' : 'inactivo',
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const usersCtrl = {
  login,
  createUser,
  getAllUsers,
  updateUserState,
};

export default usersCtrl;
