import cloneDeep from 'lodash/cloneDeep';
import { useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getAllServicesAsync,
  hideModalCancelService,
  hideModalFinishService,
  selectServices,
  selectShowModalCancelService,
  selectShowModalFinishService,
} from '../redux/features/servicesSlice';
import MUI_DATA_TABLE from '../constants/muiDataTable';
import { RedirectIconButton } from '../components/tableComponents';
import { ServiceCancel, ServiceFinish } from '../components/modalDialogs';
import { serviceDataAdapter } from '../utils';
import { useTheme } from '@mui/material/styles';

const Services = () => {
  const { deviceId } = useParams();
  const allServices = useSelector(selectServices) || null;
  const showModalCancelService =
    useSelector(selectShowModalCancelService) || false;
  const showModalFinishService =
    useSelector(selectShowModalFinishService) || false;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllServicesAsync(deviceId));
  }, [deviceId, dispatch]);

  const { OPTIONS: options, SERVICES_COLUMNS: columns } =
    cloneDeep(MUI_DATA_TABLE);

  options.customToolbar = () => {
    return (
      <RedirectIconButton
        route={`/servicios/registrar/${deviceId}`}
        title={'Registrar un servicio'}
      >
        <AddIcon />
      </RedirectIconButton>
    );
  };

  const adaptedData = serviceDataAdapter(allServices);

  const handleHideModalCancelService = () => {
    dispatch(hideModalCancelService());
  };

  const handleHideModalFinishService = () => {
    dispatch(hideModalFinishService());
  };

  return (
    <>
      <MUIDataTable
        title={'Lista de Servicios'}
        data={adaptedData}
        columns={columns}
        options={options}
      />
      <ServiceCancel
        fullScreen={fullScreen}
        open={showModalCancelService}
        handleClose={handleHideModalCancelService}
      />
      <ServiceFinish
        fullScreen={fullScreen}
        open={showModalFinishService}
        handleClose={handleHideModalFinishService}
      />
    </>
  );
};

export default Services;
