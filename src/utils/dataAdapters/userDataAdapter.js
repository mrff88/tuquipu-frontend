import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { ShowModalIconButton } from '../../components/tableComponents';
import { userToEdit, userInfo } from '../../redux/features/usersSlice';

const userDataAdapter = (usersData, id) => {
  const adaptedData = usersData
    ?.filter((user) => user._id !== id)
    .map((item) => [
      item.name,
      item.lastname,
      item.state,
      <>
        <ShowModalIconButton
          data={item}
          reduxFunc={userInfo}
          title={'Más información'}
        >
          <InfoIcon color="info" />
        </ShowModalIconButton>
        <ShowModalIconButton
          data={item}
          reduxFunc={userToEdit}
          title={'Cambiar estado'}
        >
          <EditIcon color="warning" />
        </ShowModalIconButton>
      </>,
    ]);
  return adaptedData;
};

export default userDataAdapter;
