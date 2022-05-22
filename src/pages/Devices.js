import cloneDeep from 'lodash/cloneDeep';
import { useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getAllDevicesAsync,
  hideModalDeviceInfor,
  selectDevices,
  selectShowModalDeviceInfo,
} from '../redux/features/devicesSlice';
import MUI_DATA_TABLE from '../constants/muiDataTable';
import { RedirectIconButton } from '../components/tableComponents';
import { deviceDataAdapter } from '../utils';
import { DeviceInfo } from '../components/modalDialogs';
import { useTheme } from '@mui/material/styles';

const Devices = () => {
  const { clientId } = useParams();
  const allDevices = useSelector(selectDevices) || null;
  const showModalDeviceInfo = useSelector(selectShowModalDeviceInfo) || false;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDevicesAsync(clientId));
  }, [clientId, dispatch]);

  const { OPTIONS: options, DEVICES_COLUMNS: columns } =
    cloneDeep(MUI_DATA_TABLE);

  options.customToolbar = () => {
    return (
      <RedirectIconButton
        route={`/dispositivos/registrar/${clientId}`}
        title={'Registrar un dispositivo'}
      >
        <AddIcon />
      </RedirectIconButton>
    );
  };

  const adaptedData = deviceDataAdapter(allDevices);

  const handleHideModalDeviceInfo = () => {
    dispatch(hideModalDeviceInfor());
  };

  return (
    <>
      <MUIDataTable
        title={'Lista de Dispositivos'}
        data={adaptedData}
        columns={columns}
        options={options}
      />
      <DeviceInfo
        fullScreen={fullScreen}
        open={showModalDeviceInfo}
        handleClose={handleHideModalDeviceInfo}
      />
    </>
  );
};

export default Devices;
