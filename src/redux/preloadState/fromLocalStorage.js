const createPreload = () => {
  const preloadObject = {};
  preloadObject.users = {};
  preloadObject.users.token = JSON.parse(
    localStorage.getItem('infoUser')
  )?.token;
  return preloadObject;
};

const fromLocalStorage = () => {
  if (!localStorage.getItem('infoUser')) {
    localStorage.setItem('infoUser', null);
  }
  return createPreload();
};

export default fromLocalStorage;
