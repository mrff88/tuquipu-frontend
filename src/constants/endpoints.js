const ENDPOINTS = {
  USERS: {
    LOGIN: '/api/users/auth',
    CREATE: '/api/users/',
    ALL: '/api/users/',
    READ: '/api/users/',
    UPDATE: '/api/users/',
  },
  CLIENTS: {
    CREATE: '/api/clients/',
    ALL: '/api/clients/',
    READ: '/api/clients/',
    UPDATE: '/api/clients/',
  },
  DEVICES: {
    CREATE: '/api/devices/',
    ALL: '/api/devices/',
    READ: '/api/devices/device/',
    UPDATE: '/api/devices/device/',
  },
  SERVICES: {
    CREATE: '/api/services/',
    ALL: '/api/services/',
    READ: '/api/services/service/',
    UPDATE: '/api/services/service/',
  },
};

export default ENDPOINTS;
