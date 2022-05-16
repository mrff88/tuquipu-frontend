import { Link as RRLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '../components/formComponents/TextField';
import Button from '../components/formComponents/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUserAsync,
  selectCreatedUser,
  selectIsCreating,
} from '../redux/features/usersSlice';
import { FORM_VALIDATION_SCHEMAS, INITIAL_FORM_STATES } from '../constants';
import AutoResetForm from '../components/formComponents/AutoResetForm';

const Register = () => {
  const { INITIAL_USER_REGISTER_FORM_STATE } = INITIAL_FORM_STATES;
  const { USER_REGISGER_FORM_VALIDATION } = FORM_VALIDATION_SCHEMAS;

  const dispatch = useDispatch();
  const createdUser = useSelector(selectCreatedUser);
  const isLoading = useSelector(selectIsCreating);
  const handleSubmit = ({ passwordConf, ...user }) => {
    dispatch(createUserAsync(user));
  };

  return (
    <Paper
      elevation={2}
      sx={{
        padding: '1.5rem',
        minWidth: {
          xs: '85vw',
          md: '60vw',
          lg: '40vw',
          xl: '35vw',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: {
            xs: '80vh',
            md: '70vh',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Typography component="h1" variant="h4">
            Regístrate
          </Typography>
        </Box>
        <Formik
          initialValues={{ ...INITIAL_USER_REGISTER_FORM_STATE }}
          validationSchema={USER_REGISGER_FORM_VALIDATION}
          onSubmit={handleSubmit}
        >
          <Form>
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                flex: 2,
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
              <TextField
                margin="normal"
                label="Número de telefono"
                name="phone"
                type="tel"
              />
              <TextField
                margin="normal"
                label="Contraseña"
                name="password"
                type="password"
              />
              <TextField
                margin="normal"
                label="Confirmar contraseña"
                name="passwordConf"
                type="password"
              />
              <Button
                isLoading={isLoading}
                sx={{
                  mt: 3,
                  mb: 2,
                  alignSelf: 'center',
                  maxWidth: '80%',
                }}
              >
                Regístrate
              </Button>
            </Box>
            <AutoResetForm flag={createdUser} />
          </Form>
        </Formik>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flex: 1,
          }}
        >
          <Link component={RRLink} to="../login" variant="body2">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Register;
