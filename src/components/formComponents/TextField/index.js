import { TextField } from '@mui/material';
import { useField } from 'formik';

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const { fullWidth, variant, ...rest } = otherProps || {};

  const configTextfield = {
    ...field,
    ...rest,
    fullWidth: fullWidth || true,
    variant: variant || 'outlined',
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;
