import * as Yup from 'yup';

const phoneRegEx =
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const dniRegEx = /^\d{8}(?:[-\s]\d{4})?$/;

const FORM_VALIDATION_SCHEMAS = {
  LOGIN_FORM_VALIDATION: Yup.object().shape({
    email: Yup.string()
      .email('Ingrese un email valido')
      .required('Debe ingresar un email'),
    password: Yup.string().required('Debe ingresar su contraseña'),
  }),
  USER_REGISTER_FORM_VALIDATION: Yup.object().shape({
    name: Yup.string().required('Ingrese un nombre'),
    lastname: Yup.string().required('Ingrese un apellido'),
    email: Yup.string()
      .email('Ingrese un email válido')
      .required('Debe ingresar un email'),
    phone: Yup.string()
      .matches(phoneRegEx, 'Ingrese un número de teléfono válido')
      .required('Ingrese un número de teléfono'),
    password: Yup.string()
      .matches(
        passwordRegEx,
        'Debe tener por lo menos 8 characteres: 1 mayúscula, 1 minúscla, 1 número y un character especial (Ej. @)'
      )
      .required('Ingrese una contraseña'),
    passwordConf: Yup.string()
      .oneOf([Yup.ref('password')], 'Debe ser igual a su contraseña')
      .required('Ingrese la confirmación de contraseña'),
  }),
  CLIENT_REGISTER_FORM_VALIDATION: Yup.object().shape({
    name: Yup.string().required('Ingrese un nombre'),
    lastname: Yup.string().required('Ingrese un apellido'),
    email: Yup.string()
      .email('Ingrese un email válido')
      .required('Debe ingresar un email'),
    phone: Yup.string()
      .matches(phoneRegEx, 'Ingrese un número de teléfono válido')
      .required('Ingrese un número de teléfono'),
    dni: Yup.string()
      .matches(dniRegEx, 'Ingrese un número de DNI válido')
      .required('Ingrese el DNI del cliente'),
    address: Yup.string(),
  }),
  CLIENT_EDIT_FORM_VALIDATION: Yup.object().shape({
    email: Yup.string()
      .email('Ingrese un email válido')
      .required('Debe ingresar un email'),
    phone: Yup.string()
      .matches(phoneRegEx, 'Ingrese un número de teléfono válido')
      .required('Ingrese un número de teléfono'),
    address: Yup.string(),
  }),
};

export default FORM_VALIDATION_SCHEMAS;
