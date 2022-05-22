import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ShowModalIconButton } from '../../components/tableComponents';
import {
  loadServiceToCancel,
  loadServiceToFinish,
} from '../../redux/features/servicesSlice';

const serviceDataAdapter = (serviceData) => {
  const adaptedData = serviceData?.map((service) => [
    service.serviceType,
    service.state,
    service.state === 'Cancelado' || service.state === 'Realizado'
      ? new Date(service.updatedAt).toISOString().slice(0, 10)
      : '-',
    service.state === 'Pendiente' ? (
      <>
        <ShowModalIconButton
          data={service}
          reduxFunc={loadServiceToCancel}
          title={'Cancelar servisio'}
        >
          <CancelIcon color="error" />
        </ShowModalIconButton>
        <ShowModalIconButton
          data={service}
          reduxFunc={loadServiceToFinish}
          title={'Finalizar servicio'}
        >
          <CheckCircleIcon color="success" />
        </ShowModalIconButton>
      </>
    ) : (
      ''
    ),
  ]);
  return adaptedData;
};

export default serviceDataAdapter;
