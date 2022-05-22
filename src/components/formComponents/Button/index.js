import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

const ButtonWrapper = ({ children, isLoading, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const { variant, color, fullWidth, ...rest } = otherProps || {};

  const configButton = {
    ...rest,
    variant: variant || 'contained',
    color: color || 'primary',
    fullWidth: fullWidth || true,
    onClick: handleSubmit,
  };

  if (isLoading)
    return (
      <Button
        disabled
        variant={variant || 'contained'}
        color={color || 'primary'}
        fullWidth={fullWidth || true}
        {...otherProps}
      >
        Cargando...
      </Button>
    );
  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
