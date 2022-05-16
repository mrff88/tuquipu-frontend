import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const notification = useSelector((state) => state.notifications);
  const { message, severity } = notification;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!message);
  }, [message, notification]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <Alert
        elevation={3}
        variant="filled"
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notifications;
