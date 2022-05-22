import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useDispatch } from 'react-redux';

const ShowModalIconButton = ({ children, data, reduxFunc, title }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(reduxFunc(data));
  };

  return (
    <Tooltip title={title}>
      <IconButton onClick={handleClick}>{children}</IconButton>
    </Tooltip>
  );
};

export default ShowModalIconButton;
