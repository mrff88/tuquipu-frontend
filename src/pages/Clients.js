import cloneDeep from 'lodash/cloneDeep';
import { useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllClientsAsync,
  hideModalClientInfor,
  selectClients,
  selectShowModalUserInfo,
} from '../redux/features/clientsSlice';
import MUI_DATA_TABLE from '../constants/muiDataTable';
import { RedirectIconButton } from '../components/tableComponents';
import { clientDataAdapter } from '../utils';
import { ClientInfo } from '../components/modalDialogs';
import { useTheme } from '@mui/material/styles';

const Clients = () => {
  const allClients = useSelector(selectClients) || null;
  const showModalUserInfo = useSelector(selectShowModalUserInfo) || false;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClientsAsync());
  }, [dispatch]);

  const { OPTIONS: options, CLIENT_COLUMNS: columns } =
    cloneDeep(MUI_DATA_TABLE);

  options.customToolbar = () => {
    return (
      <RedirectIconButton
        route={'/clientes/registrar'}
        title={'Registrar un cliente'}
      >
        <AddIcon />
      </RedirectIconButton>
    );
  };

  const adaptedData = clientDataAdapter(allClients);

  const handleHideModalClientInfo = () => {
    dispatch(hideModalClientInfor());
  };

  return (
    <>
      <MUIDataTable
        title={'Lista de Clientes'}
        data={adaptedData}
        columns={columns}
        options={options}
      />
      <ClientInfo
        fullScreen={fullScreen}
        open={showModalUserInfo}
        handleClose={handleHideModalClientInfo}
      />
    </>
  );
};

export default Clients;
