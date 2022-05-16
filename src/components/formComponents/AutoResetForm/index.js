import { useEffect } from 'react';
import { useFormikContext } from 'formik';

const AutoResetForm = ({ flag }) => {
  const { resetForm } = useFormikContext();

  useEffect(() => {
    if (flag) resetForm();
  }, [flag, resetForm]);

  return null;
};

export default AutoResetForm;
