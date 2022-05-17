import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsUpdatingUserState,
  selectUserToEdit,
  updateUserStateAsync,
} from '../../../redux/features/usersSlice';

const UserStateChange = ({ fullScreen, open, handleClose }) => {
  const { _id, name, lastname, state } = useSelector(selectUserToEdit) || {};
  const isUpdatingUserState = useSelector(selectIsUpdatingUserState);
  const dispatch = useDispatch();

  const handleStateChange = () => {
    dispatch(updateUserStateAsync({ _id, state }));
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle align="center" id="responsive-dialog-title">
        {'Cambiar Estado del Usuario'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Esta seguro que desea cambiar el estado del ususario {''}
          {name} {lastname}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isUpdatingUserState} autoFocus onClick={handleClose}>
          Cancelar
        </Button>
        <Button disabled={isUpdatingUserState} onClick={handleStateChange}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserStateChange;
