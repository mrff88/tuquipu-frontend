import {
  ShowEditUserModal,
  ShowUserInfoModal,
} from '../../components/tableComponents';

const userDataAdapter = (usersData, id) => {
  const adaptedData = usersData
    ?.filter((user) => user._id !== id)
    .map((item) => [
      item.name,
      item.lastname,
      item.state,
      <>
        <ShowUserInfoModal userData={item} />
        <ShowEditUserModal userData={item} />
      </>,
    ]);
  return adaptedData;
};

export default userDataAdapter;
