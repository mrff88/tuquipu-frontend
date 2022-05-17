import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Edit from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { userToEdit } from '../../../redux/features/usersSlice';

const ShowEditUserModal = ({ userData }) => {
  const dispatch = useDispatch();

  const updateUserState = (user) => {
    dispatch(userToEdit(user));
  };

  return (
    <Tooltip title="Cambiar estado">
      <IconButton onClick={() => updateUserState(userData)}>
        <Edit color="warning" />
      </IconButton>
    </Tooltip>
  );
};

export default ShowEditUserModal;
