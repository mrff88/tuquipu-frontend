import { Link as RRLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MUIButton from '@mui/material/Button';
import TextField from '../components/formComponents/TextField';
import Button from '../components/formComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  createClientAsync,
  selectCreatedClient,
  selectIsCreatingClient,
} from '../redux/features/clientsSlice';
import { FORM_VALIDATION_SCHEMAS, INITIAL_FORM_STATES } from '../constants';
import AutoResetForm from '../components/formComponents/AutoResetForm';

const RegisterClient = () => {
  const { INITIAL_CLIENT_REGISTER_FORM_STATE } = INITIAL_FORM_STATES;
  const { CLIENT_REGISTER_FORM_VALIDATION } = FORM_VALIDATION_SCHEMAS;

  const dispatch = useDispatch();
  const createdClient = useSelector(selectCreatedClient);
  const isLoading = useSelector(selectIsCreatingClient);

  const handleSubmit = (client) => {
    dispatch(createClientAsync(client));
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: {
            xs: '80vh',
            md: '60vh',
          },
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
            REGISTRAR CLIENTE
          </Typography>
        </Box>
        <Formik
          initialValues={{ ...INITIAL_CLIENT_REGISTER_FORM_STATE }}
          validationSchema={CLIENT_REGISTER_FORM_VALIDATION}
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
                  <TextField
                    margin="normal"
                    label="Nombres"
                    name="name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    label="Apellidos"
                    name="lastname"
                  />
                </Grid>
              </Grid>
              <TextField
                margin="normal"
                label="Email"
                name="email"
                autoComplete="email"
                type="email"
              />
              <Grid
                container
                spacing={{
                  xs: 0,
                  sm: 3,
                }}
              >
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    label="Número de telefono"
                    name="phone"
                    type="tel"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField margin="normal" label="DNI" name="dni" />
                </Grid>
              </Grid>
              <TextField margin="normal" label="Dirección" name="address" />
              <Grid
                container
                spacing={{
                  xs: 2,
                  sm: 3,
                }}
                sx={{
                  flex: 1,
                  alignItems: 'flex-end',
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
                    disabled={isLoading}
                    component={RRLink}
                    to="/clientes"
                  >
                    CANCELAR
                  </MUIButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button isLoading={isLoading}>GUARDAR</Button>
                </Grid>
              </Grid>
            </Box>
            <AutoResetForm flag={createdClient} />
          </Form>
        </Formik>
      </Box>
    </Paper>
  );
};

export default RegisterClient;
