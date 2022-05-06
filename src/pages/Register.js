import { Link as RRLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const Register = () => {
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', sm: '80%', lg: '70%' },
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
                required
                fullWidth
                id="names"
                label="Nombres"
                name="names"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastNames"
                label="Apellidos"
                name="lastNames"
              />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            type="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Número de telefono"
            name="phone"
            type="tel"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Contraseña"
            name="password"
            type="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password-conf"
            label="Confirmar contraseña"
            name="password-conf"
            type="password"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
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
