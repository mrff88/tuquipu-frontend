import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../redux/features/usersSlice';
import { parseJWT } from '../../../utils';

const AdminRoutesGuard = () => {
  const token = useSelector(selectToken);
  const { userType } = parseJWT(token) || '';

  return userType === 'Administrador' ? (
    <Outlet />
  ) : (
    <Navigate to="/clientes" replace />
  );
};

export default AdminRoutesGuard;
