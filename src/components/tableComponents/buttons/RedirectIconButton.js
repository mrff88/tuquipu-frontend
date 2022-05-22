import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const RedirectIconButton = ({ children, route, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${route}`);
  };
  return (
    <Tooltip title={title}>
      <IconButton onClick={handleClick}>
        {/* <AddIcon /> */}
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default RedirectIconButton;
