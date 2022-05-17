import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { ShowEditUserModal } from '../../components/tableComponents';

const userDataAdapter = (usersData, id) => {
  const adaptedData = usersData
    ?.filter((user) => user._id !== id)
    .map((item) => [
      item.name,
      item.lastname,
      item.state,
      <>
        <Tooltip title="Más información">
          <IconButton>
            <InfoIcon color="info" />
          </IconButton>
        </Tooltip>
        <ShowEditUserModal userData={item} />
      </>,
    ]);
  return adaptedData;
};

export default userDataAdapter;
