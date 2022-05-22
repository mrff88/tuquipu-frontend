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
  createDeviceAsync,
  selectCreatedDevice,
  selectIsCreatingDevice,
} from '../redux/features/devicesSlice';
import {
  FORM_VALIDATION_SCHEMAS,
  INITIAL_FORM_STATES,
  SELECT_VALUES,
} from '../constants';
import AutoResetForm from '../components/formComponents/AutoResetForm';
import { useEffect } from 'react';
import {
  getClientAsync,
  selectClient,
  selectIsLoading,
  selectLoadingError,
} from '../redux/features/clientsSlice';
import CloudinaryWidget from '../components/formComponents/CloudinaryWidget';

const RegisterDevice = () => {
  const { clientId } = useParams();
  const { INITIAL_DEVICE_REGISTER_FORM_STATE } = INITIAL_FORM_STATES;
  const { DEVICE_REGISTER_FORM_VALIDATION } = FORM_VALIDATION_SCHEMAS;
  const { DEVICE_TYPES: deviceTypes } = SELECT_VALUES;

  const dispatch = useDispatch();
  const client = useSelector(selectClient) || null;
  const createdDevice = useSelector(selectCreatedDevice);
  const isCreating = useSelector(selectIsCreatingDevice);
  const isLoading = useSelector(selectIsLoading);
  const loadingError = useSelector(selectLoadingError);

  useEffect(() => {
    dispatch(getClientAsync(clientId));
  }, [clientId, dispatch]);

  const handleSubmit = (device) => {
    const deviceData = { device, clientId };
    dispatch(createDeviceAsync(deviceData));
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
      {Boolean(client) && (
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
              REGISTRAR DISPOSITIVO
            </Typography>
          </Box>
          <Formik
            initialValues={{ ...INITIAL_DEVICE_REGISTER_FORM_STATE }}
            validationSchema={DEVICE_REGISTER_FORM_VALIDATION}
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
                      disabled={isCreating}
                      component={RRLink}
                      to={`/dispositivos/${client?._id}`}
                    >
                      CANCELAR
                    </MUIButton>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button isLoading={isCreating}>GUARDAR</Button>
                  </Grid>
                </Grid>
              </Box>
              <AutoResetForm flag={createdDevice} />
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
              REGISTRAR DISPOSITIVO
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
              REGISTRAR DISPOSITIVO
            </Typography>
          </Box>
          <Typography component="p" variant="h6">
            No se encontro al cliente
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default RegisterDevice;
