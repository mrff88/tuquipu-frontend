import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectToken } from '../../../redux/features/usersSlice';

const NoAuthLayout = () => {
  const token = useSelector(selectToken);

  if (token) {
    return <Navigate to="/" replace />;
  }
  return (
    <Box
      sx={{ display: 'flex', backgroundColor: '#F2F2F2', minHeight: '100vh' }}
    >
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default NoAuthLayout;
