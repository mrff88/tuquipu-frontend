import { useParams } from 'react-router-dom';
import { Link as RRLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MUIButton from '@mui/material/Button';
import Select from '../components/formComponents/Select';
import Button from '../components/formComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  createServiceAsync,
  selectCreatedService,
  selectIsCreatingService,
} from '../redux/features/servicesSlice';
import {
  FORM_VALIDATION_SCHEMAS,
  INITIAL_FORM_STATES,
  SELECT_VALUES,
} from '../constants';
import AutoResetForm from '../components/formComponents/AutoResetForm';
import { useEffect } from 'react';
import {
  getDeviceAsync,
  selectDevice,
  selectIsLoading,
  selectLoadingError,
} from '../redux/features/devicesSlice';

const RegisterService = () => {
  const { deviceId } = useParams();
  const { INITIAL_SERVICE_REGISTER_FORM_STATE } = INITIAL_FORM_STATES;
  const { SERVICE_REGISTER_FORM_VALIDATION } = FORM_VALIDATION_SCHEMAS;
  const { SERVICE_TYPES: serviceTypes } = SELECT_VALUES;

  const dispatch = useDispatch();
  const device = useSelector(selectDevice) || null;
  const createdService = useSelector(selectCreatedService);
  const isCreating = useSelector(selectIsCreatingService);
  const isLoading = useSelector(selectIsLoading);
  const loadingError = useSelector(selectLoadingError);

  useEffect(() => {
    dispatch(getDeviceAsync(deviceId));
  }, [deviceId, dispatch]);

  const handleSubmit = (service) => {
    const serviceData = { service, deviceId };
    dispatch(createServiceAsync(serviceData));
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
              REGISTRAR SERVICIO
            </Typography>
          </Box>
          <Formik
            initialValues={{ ...INITIAL_SERVICE_REGISTER_FORM_STATE }}
            validationSchema={SERVICE_REGISTER_FORM_VALIDATION}
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
                <Select
                  margin="normal"
                  name="serviceType"
                  label="Tipo de servicio"
                  options={serviceTypes}
                />
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
                      to={`/servicios/${device?._id}`}
                    >
                      CANCELAR
                    </MUIButton>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button isLoading={isCreating}>GUARDAR</Button>
                  </Grid>
                </Grid>
              </Box>
              <AutoResetForm flag={createdService} />
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
              REGISTRAR SERVICIO
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
              REGISTRAR SERVICIO
            </Typography>
          </Box>
          <Typography component="p" variant="h6">
            No se encontro el dispositivo
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default RegisterService;
