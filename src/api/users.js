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

const usersCtrl = {
  login,
  createUser,
};

export default usersCtrl;
