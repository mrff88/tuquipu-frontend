const INITIAL_FORM_STATES = {
  INITIAL_LOGIN_FORM_STATE: {
    email: '',
    password: '',
  },
  INITIAL_USER_REGISTER_FORM_STATE: {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    passwordConf: '',
  },
  INITIAL_CLIENT_REGISTER_FORM_STATE: {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    dni: '',
    address: '',
  },
  INITIAL_DEVICE_REGISTER_FORM_STATE: {
    deviceType: '',
    brand: '',
    model: '',
    serialNumber: '',
    yearMade: '',
    imgUrl: '',
    clientId: '',
  },
};

export default INITIAL_FORM_STATES;
