import * as Yup from 'yup';

const phoneRegEx =
  /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const dniRegEx = /^\d{8}(?:[-\s]\d{4})?$/;
const modelRegEx = /^[a-zA-Z0-9-\s]+$/;
const serialNumberReqEx = /^[a-zA-Z0-9-\s]+$/;
const yearRegEx = /^\d{4}$/;

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
  DEVICE_REGISTER_FORM_VALIDATION: Yup.object().shape({
    deviceType: Yup.string()
      .oneOf(['PC', 'Laptop', 'All-In-One'])
      .required('Seleccione un tipo para el dispositivo'),
    brand: Yup.string().required('Ingrese la marca del dispositivo'),
    model: Yup.string()
      .matches(modelRegEx, 'Ingrese un modelo válido')
      .required('Ingrese el modelo del dispositivo'),
    serialNumber: Yup.string()
      .matches(serialNumberReqEx, 'Ingrese un número de serie válido')
      .required('Ingrese el número de serial'),
    yearMade: Yup.string().matches(yearRegEx, 'Ingrese un año válido'),
    imgUrl: Yup.string()
      .url('Ingrese un url válido')
      .required('Debe agregar una foto del dispositivo'),
  }),
  DEVICE_EDIT_FORM_VALIDATION: Yup.object().shape({
    deviceType: Yup.string()
      .oneOf(['PC', 'Laptop', 'All-In-One'])
      .required('Seleccione un tipo para el dispositivo'),
    brand: Yup.string().required('Ingrese la marca del dispositivo'),
    model: Yup.string()
      .matches(modelRegEx, 'Ingrese un modelo válido')
      .required('Ingrese el modelo del dispositivo'),
    serialNumber: Yup.string()
      .matches(serialNumberReqEx, 'Ingrese un número de serie válido')
      .required('Ingrese el número de serial'),
    yearMade: Yup.string().matches(yearRegEx, 'Ingrese un año válido'),
    imgUrl: Yup.string()
      .url('Ingrese un url válido')
      .required('Debe agregar una foto del dispositivo'),
  }),
  SERVICE_REGISTER_FORM_VALIDATION: Yup.object().shape({
    serviceType: Yup.string()
      .oneOf([
        'Diagnóstico',
        'Formateo',
        'Limpieza',
        'Instalación',
        'Reparación',
        'Ensamblaje',
        'Repotenciación',
      ])
      .required('Seleccione un tipo de servicio'),
  }),
};

export default FORM_VALIDATION_SCHEMAS;
