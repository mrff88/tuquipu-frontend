import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import {
  RedirectIconButton,
  ShowModalIconButton,
} from '../../components/tableComponents';
import { clientInfo } from '../../redux/features/clientsSlice';

const clientDataAdapter = (clientData) => {
  const adaptedData = clientData?.map((client) => [
    client.name,
    client.lastname,
    client.dni,
    <>
      <ShowModalIconButton
        data={client}
        reduxFunc={clientInfo}
        title={'Más información'}
      >
        <InfoIcon color="info" />
      </ShowModalIconButton>
      <RedirectIconButton
        route={`/clientes/editar/${client._id}`}
        title={'Editar cliente'}
      >
        <EditIcon color="warning" />
      </RedirectIconButton>
    </>,
  ]);
  return adaptedData;
};

export default clientDataAdapter;
