import { Link as RRLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
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
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', sm: '80%', lg: '60%' },
            flex: 2,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
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
