import MUIDataTable from 'mui-datatables';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUsersAsync,
  hideModalUserEdit,
  selectShowModalUserEdit,
  selectToken,
  selectUsers,
} from '../redux/features/usersSlice';
import { useEffect } from 'react';
import MUI_DATA_TABLE from '../constants/muiDataTable';
import { parseJWT } from '../utils';
import { UserStateChange } from '../components/modalDialogs';
import { useTheme } from '@mui/material/styles';
import userDataAdapter from '../utils/dataAdapters/userDataAdapter';

const Users = () => {
  const token = useSelector(selectToken);
  const allUsers = useSelector(selectUsers) || null;
  const showModalUserEdit = useSelector(selectShowModalUserEdit) || false;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { _id } = parseJWT(token) || '';
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) dispatch(getAllUsersAsync());
  }, [allUsers, dispatch]);

  const { OPTIONS: options, USER_COLUMNS: columns } = MUI_DATA_TABLE;

  const adaptedData = userDataAdapter(allUsers, _id);

  const handleHideModalUserEdit = () => {
    dispatch(hideModalUserEdit());
  };

  return (
    <>
      <MUIDataTable
        title={'Lista de Usuarios'}
        data={adaptedData}
        columns={columns}
        options={options}
      />
      <UserStateChange
        fullScreen={fullScreen}
        open={showModalUserEdit}
        handleClose={handleHideModalUserEdit}
      />
    </>
  );
};
export default Users;
