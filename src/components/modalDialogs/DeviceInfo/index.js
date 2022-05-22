import { Link as RRLink } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector } from 'react-redux';
import { selectDeviceInfo } from '../../../redux/features/devicesSlice';

const DeviceInfo = ({ fullScreen, open, handleClose }) => {
  const { _id, deviceType, brand, model, yearMade, serialNumber, imgUrl } =
    useSelector(selectDeviceInfo) || {};

  return (
    <Dialog
      fullWidth
      maxWidth={'sm'}
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="info-dialog-title"
    >
      <DialogTitle align="center" id="responsive-dialog-title">
        {'Información del Dispositivo'}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: '#f2f2f2',
          paddingX: { xs: '1rem', sm: '3rem' },
          display: 'flex',
          overflowY: { xs: 'initial', sm: 'auto' },
        }}
      >
        <Paper
          sx={{
            marginTop: '20px',
            padding: '1.5rem',
            borderRadius: '0',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            justifyContent: 'center',
          }}
        >
          <DialogContentText fontSize={12}>{'Foto'}</DialogContentText>
          <Box
            component={'img'}
            sx={{
              alignSelf: 'center',
              height: 233,
              width: 350,
              objectFit: 'cover',
              maxHeight: { xs: '100%', md: 233 },
              maxWidth: { xs: '100%', md: 350 },
              marginBottom: '1rem',
              borderRadius: 5,
              border: '2px solid #8C8C8C',
            }}
            alt={`${deviceType} ${brand} ${model}`}
            src={imgUrl}
          />
          <Grid container columnSpacing={{ xs: 0, sm: 2 }}>
            <Grid item xs={12} md={6}>
              <DialogContentText fontSize={12}>{'Tipo'}</DialogContentText>
              <DialogContentText
                color={'common'}
                fontSize={20}
                paddingBottom={2}
              >
                {deviceType}
              </DialogContentText>
            </Grid>
            <Grid item xs={12} md={6}>
              <DialogContentText fontSize={12}>{'Marca'}</DialogContentText>
              <DialogContentText
                color={'common'}
                fontSize={20}
                paddingBottom={2}
              >
                {brand}
              </DialogContentText>
            </Grid>
          </Grid>
          <Grid container columnSpacing={{ xs: 0, sm: 2 }}>
            <Grid item xs={12} md={6}>
              <DialogContentText fontSize={12}>{'Modelo'}</DialogContentText>
              <DialogContentText
                color={'common'}
                fontSize={20}
                paddingBottom={2}
              >
                {model}
              </DialogContentText>
            </Grid>
            <Grid item xs={12} md={6}>
              <DialogContentText fontSize={12}>
                {'Año de Fab.'}
              </DialogContentText>
              <DialogContentText
                color={'common'}
                fontSize={20}
                paddingBottom={2}
              >
                {yearMade || '-'}
              </DialogContentText>
            </Grid>
          </Grid>
          <DialogContentText fontSize={12}>{'# Serial'}</DialogContentText>
          <DialogContentText color={'common'} fontSize={20} paddingBottom={2}>
            {serialNumber}
          </DialogContentText>
          <Button
            variant="contained"
            sx={{ alignSelf: 'center' }}
            startIcon={<VisibilityIcon />}
            component={RRLink}
            to={`/servicios/${_id}`}
          >
            {'Ver Servicios'}
          </Button>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceInfo;
