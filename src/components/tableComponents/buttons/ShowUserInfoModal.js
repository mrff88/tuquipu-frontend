import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from 'react-redux';
import { userInfo } from '../../../redux/features/usersSlice';

const ShowUserInfoModal = ({ userData }) => {
  const dispatch = useDispatch();

  const openUserInfoModal = (user) => {
    dispatch(userInfo(user));
  };

  return (
    <Tooltip title="Más información">
      <IconButton onClick={() => openUserInfoModal(userData)}>
        <InfoIcon color="info" />
      </IconButton>
    </Tooltip>
  );
};

export default ShowUserInfoModal;
