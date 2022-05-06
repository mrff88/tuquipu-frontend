const setOnLocalStorage = (store, action) => {
  switch (action.type) {
    case 'users/setToken':
      localStorage.setItem(
        'infoUser',
        JSON.stringify({ token: store.getState().users.token })
      );
      break;

    default:
      console.log(action.type);
      break;
  }
};

export default setOnLocalStorage;
