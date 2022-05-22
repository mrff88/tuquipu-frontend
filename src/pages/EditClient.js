import { useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import {
  getClientAsync,
  selectClient,
  // selectIsLoading,
  selectIsUpdatingClient,
  updateClientAsync,
} from '../redux/features/clientsSlice';
import { FORM_VALIDATION_SCHEMAS } from '../constants';

const EditClient = () => {
  const { clientId } = useParams();
  const { CLIENT_EDIT_FORM_VALIDATION } = FORM_VALIDATION_SCHEMAS;

  const dispatch = useDispatch();
  const client = useSelector(selectClient) || {};
  // const isLoadingClient = useSelector(selectIsLoading);
  const isUpdatingClient = useSelector(selectIsUpdatingClient);

  useEffect(() => {
    dispatch(getClientAsync(clientId));
  }, [clientId, dispatch]);

  const handleSubmit = (editedClient) => {
    dispatch(updateClientAsync({ clientId: client._id, editedClient }));
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
            sm: '60vh',
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
            EDITAR CLIENTE
          </Typography>
        </Box>
        <Formik
          enableReinitialize={true}
          initialValues={{
            email: client.email || '',
            phone: client.phone || '',
            address: client.address || '',
          }}
          validationSchema={CLIENT_EDIT_FORM_VALIDATION}
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
                    defaultValue={client?.name}
                    key={client?.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    label="Apellidos"
                    name="lastname"
                    defaultValue={client?.lastnam}
                    key={client?.lastnam}
                    disabled
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
                  <TextField
                    margin="normal"
                    label="DNI"
                    name="dni"
                    defaultValue={client?.dni}
                    key={client?.dni}
                    disabled
                  />
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
                    disabled={isUpdatingClient}
                    component={RRLink}
                    to="/clientes"
                  >
                    CANCELAR
                  </MUIButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    isLoading={
                      isUpdatingClient || Boolean(!Object.keys(client).length)
                    }
                  >
                    GUARDAR
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Paper>
  );
};

export default EditClient;
