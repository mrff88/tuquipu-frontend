import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../redux/features/usersSlice';

const UserInfo = ({ fullScreen, open, handleClose }) => {
  const { name, lastname, state, email, phone } =
    useSelector(selectUserInfo) || {};

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
        {'Información del Usuario'}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: '#f2f2f2',
          paddingX: { xs: '1rem', sm: '3rem' },
          display: 'flex',
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
          <DialogContentText fontSize={12}>
            {'Nombre Completo'}
          </DialogContentText>
          <DialogContentText color={'common'} fontSize={20} paddingBottom={2}>
            {`${name} ${lastname}`}
          </DialogContentText>
          <DialogContentText fontSize={12}>{'Email'}</DialogContentText>
          <DialogContentText color={'common'} fontSize={20} paddingBottom={2}>
            {email}
          </DialogContentText>
          <Grid container columnSpacing={{ xs: 0, sm: 2 }}>
            <Grid item xs={12} md={6}>
              <DialogContentText fontSize={12}>{'Teléfono'}</DialogContentText>
              <DialogContentText
                color={'common'}
                fontSize={20}
                paddingBottom={2}
              >
                {phone}
              </DialogContentText>
            </Grid>
            <Grid item xs={12} md={6}>
              <DialogContentText fontSize={12}>{'Estado'}</DialogContentText>
              <DialogContentText
                color={'common'}
                fontSize={20}
                paddingBottom={2}
              >
                {state}
              </DialogContentText>
            </Grid>
          </Grid>
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

export default UserInfo;
