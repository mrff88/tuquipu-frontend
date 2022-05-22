const setAppBarTitle = (route) => {
  const title = route.split('/')[1];
  return `${title.charAt(0).toUpperCase()}${title.slice(1)}`;
};

export default setAppBarTitle;
