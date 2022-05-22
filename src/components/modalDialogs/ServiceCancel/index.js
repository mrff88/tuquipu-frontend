import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsUpdatingService,
  selectServiceToCancel,
  updateServiceAsync,
} from '../../../redux/features/servicesSlice';

const ServiceCancel = ({ fullScreen, open, handleClose }) => {
  const { _id, serviceType } = useSelector(selectServiceToCancel) || {};
  const isUpdatingServiceState = useSelector(selectIsUpdatingService);
  const dispatch = useDispatch();

  const handleStateChange = () => {
    dispatch(
      updateServiceAsync({
        serviceId: _id,
        editedService: { state: 'Cancelado' },
      })
    );
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle align="center" id="responsive-dialog-title">
        {'Cancelar Servicio'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`¿Esta seguro que desea cancelar el servicio de ${serviceType}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isUpdatingServiceState}
          autoFocus
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button disabled={isUpdatingServiceState} onClick={handleStateChange}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceCancel;
