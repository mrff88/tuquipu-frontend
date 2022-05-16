import { Link as RRLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '../components/formComponents/TextField';
import Button from '../components/formComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectIsLogin } from '../redux/features/usersSlice';
import { FORM_VALIDATION_SCHEMAS, INITIAL_FORM_STATES } from '../constants';

const Login = () => {
  const { INITIAL_LOGIN_FORM_STATE } = INITIAL_FORM_STATES;
  const { LOGIN_FORM_VALIDATION } = FORM_VALIDATION_SCHEMAS;
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLogin);

  const handleSubmit = (values) => {
    dispatch(loginAsync(values));
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
          minHeight: '65vh',
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
          <Typography
            color={'#005E5E'}
            fontFamily={'Audiowide'}
            component="h1"
            variant="h2"
          >
            TUQUIPU
          </Typography>
          <Typography component="h1" variant="h4">
            Iniciar Sesión
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', sm: '80%', lg: '60%' },
            flex: 2,
          }}
        >
          <Formik
            initialValues={{ ...INITIAL_LOGIN_FORM_STATE }}
            validationSchema={LOGIN_FORM_VALIDATION}
            onSubmit={handleSubmit}
          >
            <Form>
              <TextField
                margin="normal"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                label="Contraseña"
                name="password"
                type="password"
              />
              <Button isLoading={isLoading} sx={{ mt: 3, mb: 2 }}>
                Iniciar Sesión
              </Button>
            </Form>
          </Formik>
        </Box>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flex: 1,
          }}
        >
          <Link component={RRLink} to="../register" variant="body2">
            Si no tienes una cuenta, regístrate aquí
          </Link>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Login;
