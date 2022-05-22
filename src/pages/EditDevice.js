import { useParams } from 'react-router-dom';
import { Link as RRLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MUIButton from '@mui/material/Button';
import Select from '../components/formComponents/Select';
import TextField from '../components/formComponents/TextField';
import Button from '../components/formComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateDeviceAsync,
  // selectUpdateResult,
  selectIsUpdatingDevice,
  getDeviceAsync,
  selectDevice,
  selectIsLoading,
  selectLoadingError,
} from '../redux/features/devicesSlice';
import { FORM_VALIDATION_SCHEMAS, SELECT_VALUES } from '../constants';
import { useEffect } from 'react';
import CloudinaryWidget from '../components/formComponents/CloudinaryWidget';

const EditDevice = () => {
  const { deviceId } = useParams();
  const { DEVICE_EDIT_FORM_VALIDATION } = FORM_VALIDATION_SCHEMAS;
  const { DEVICE_TYPES: deviceTypes } = SELECT_VALUES;

  const dispatch = useDispatch();
  const device = useSelector(selectDevice) || null;
  // const updatedDevice = useSelector(selectUpdateResult);
  const isUpdating = useSelector(selectIsUpdatingDevice);
  const isLoading = useSelector(selectIsLoading);
  const loadingError = useSelector(selectLoadingError);

  useEffect(() => {
    dispatch(getDeviceAsync(deviceId));
  }, [deviceId, dispatch]);

  const handleSubmit = (editedDevice) => {
    const deviceData = { editedDevice, deviceId };
    dispatch(updateDeviceAsync(deviceData));
  };

  return (
    <Paper
      elevation={2}
      sx={{
        padding: '2rem',
        maxWidth: {
          xs: '85%',
          md: '65%',
          lg: '55%',
          xl: '45%',
        },
        margin: '0 auto',
      }}
    >
      {Boolean(device) && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 0,
            }}
          >
            <Typography component="h1" variant="h4">
              EDITAR DISPOSITIVO
            </Typography>
          </Box>
          <Formik
            initialValues={{
              deviceType: device.deviceType || '',
              brand: device.brand || '',
              model: device.model || '',
              serialNumber: device.serialNumber || '',
              yearMade: device.yearMade || '',
              imgUrl: device.imgUrl || '',
            }}
            validationSchema={DEVICE_EDIT_FORM_VALIDATION}
            onSubmit={handleSubmit}
          >
            <Form style={{ display: 'flex', flex: 1 }}>
              <Box
                sx={{
                  mt: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <Grid
                  container
                  spacing={{
                    xs: 0,
                    sm: 3,
                  }}
                >
                  <Grid item xs={12} sm={6}>
                    <Select
                      margin="normal"
                      name="deviceType"
                      label="Tipo"
                      options={deviceTypes}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField margin="normal" label="Marca" name="brand" />
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={{
                    xs: 0,
                    sm: 3,
                  }}
                >
                  <Grid item xs={12} sm={6}>
                    <TextField margin="normal" label="Modelo" name="model" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      label="Año de Fabricación"
                      name="yearMade"
                    />
                  </Grid>
                </Grid>
                <TextField
                  margin="normal"
                  label="# Serial"
                  name="serialNumber"
                />
                <CloudinaryWidget name={'imgUrl'} />
                <Grid
                  container
                  spacing={{
                    xs: 2,
                    sm: 3,
                  }}
                  sx={{
                    marginBottom: { xs: '0', md: '2.5rem' },
                    marginTop: { xs: '0.1rem', md: '0' },
                  }}
                >
                  <Grid item xs={12} sm={6}>
                    <MUIButton
                      variant={'outlined'}
                      color={'secondary'}
                      type="button"
                      fullWidth
                      disabled={isUpdating}
                      component={RRLink}
                      to={`/dispositivos/${device?.clientId}`}
                    >
                      CANCELAR
                    </MUIButton>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button isLoading={isUpdating}>GUARDAR</Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          </Formik>
        </Box>
      )}
      {Boolean(isLoading) && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 0,
            }}
          >
            <Typography component="h1" variant="h4">
              EDITAR DISPOSITIVO
            </Typography>
          </Box>
          <Typography component="p" variant="h6">
            Cargando...
          </Typography>
        </Box>
      )}
      {Boolean(loadingError) && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 0,
            }}
          >
            <Typography component="h1" variant="h4">
              EDITAR DISPOSITIVO
            </Typography>
          </Box>
          <Typography component="p" variant="h6">
            No se encontro al dispositivo
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default EditDevice;
