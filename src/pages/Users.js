import MUIDataTable from 'mui-datatables';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUsersAsync,
  hideModalUserEdit,
  hideModalUserInfor,
  selectShowModalUserEdit,
  selectShowModalUserInfo,
  selectToken,
  selectUsers,
} from '../redux/features/usersSlice';
import { useEffect } from 'react';
import MUI_DATA_TABLE from '../constants/muiDataTable';
import { parseJWT } from '../utils';
import { UserInfo, UserStateChange } from '../components/modalDialogs';
import { useTheme } from '@mui/material/styles';
import userDataAdapter from '../utils/dataAdapters/userDataAdapter';

const Users = () => {
  const token = useSelector(selectToken);
  const allUsers = useSelector(selectUsers) || null;
  const showModalUserInfo = useSelector(selectShowModalUserInfo) || false;
  const showModalUserEdit = useSelector(selectShowModalUserEdit) || false;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleHideModalUserInfo = () => {
    dispatch(hideModalUserInfor());
  };

  return (
    <>
      <MUIDataTable
        title={'Lista de Usuarios'}
        data={adaptedData}
        columns={columns}
        options={options}
      />
      <UserInfo
        fullScreen={fullScreen}
        open={showModalUserInfo}
        handleClose={handleHideModalUserInfo}
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
