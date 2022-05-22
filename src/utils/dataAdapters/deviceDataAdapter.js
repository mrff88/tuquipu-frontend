import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import {
  RedirectIconButton,
  ShowModalIconButton,
} from '../../components/tableComponents';
import { deviceInfo } from '../../redux/features/devicesSlice';

const deviceDataAdapter = (deviceData) => {
  const adaptedData = deviceData?.map((device) => [
    device.deviceType,
    device.model,
    device.serialNumber,
    <>
      <ShowModalIconButton
        data={device}
        reduxFunc={deviceInfo}
        title={'Más información'}
      >
        <InfoIcon color="info" />
      </ShowModalIconButton>
      <RedirectIconButton
        route={`/dispositivos/editar/${device._id}`}
        title={'Editar dispositivo'}
      >
        <EditIcon color="warning" />
      </RedirectIconButton>
    </>,
  ]);
  return adaptedData;
};

export default deviceDataAdapter;
