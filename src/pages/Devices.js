import { useParams } from 'react-router-dom';

const Devices = () => {
  const { clientId } = useParams();
  return (
    <div>
      <h1>{clientId}</h1>
    </div>
  );
};

export default Devices;
