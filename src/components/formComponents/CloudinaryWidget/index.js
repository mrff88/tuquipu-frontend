import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';

import { useField, useFormikContext } from 'formik';

const CloudinaryWidget = ({ name }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const showWidgetCloudinary = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUD_NAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        sources: ['local'],
        showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        defaultSource: 'local',
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1',
          },
          fonts: {
            default: null,
            "'Space Mono', monospace": {
              url: 'https://fonts.googleapis.com/css?family=Space+Mono',
              active: true,
            },
          },
        },
        language: 'es',
        text: {
          es: {
            menu: {
              files: 'Mis archivos',
            },
            crop: {
              title: 'Recorte su imagen',
              crop_btn: 'Recortar',
              skip_btn: 'Saltar',
              reset_btn: 'Restablecer',
              close_btn: 'Si',
              close_prompt:
                'Si cierra la ventana se cancelaran las subidas de imágenes, ¿Está seguro?',
              image_error: 'Hubo un error al subir la imagen',
              corner_tooltip:
                'Arrastre la esquina para cambiar el tamaño del cuadro',
              handle_tooltip:
                'Arrastre el filo para cambiar el tamaño del cuadro',
            },
            local: {
              browse: 'Buscar',
              dd_title_single: 'Arrastre y suelte su imágen aquí',
              drop_title_single: 'Arrastre y suelte la imágen a subir',
            },
          },
        },
      },
      (err, result) => {
        if (!err && result?.event === 'success') {
          const { secure_url } = result.info;
          setFieldValue(name, secure_url);
        }
        // console.log(
        //   'error: ',
        //   err,
        //   'result: ',
        //   result,
        //   'meta: ',
        //   meta,
        //   'fieldValue: ',
        //   field.value
        // );
      }
    );
  };

  return (
    <Box
      component={'div'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        maxWidth: '100%',
        maxHeight: '16rem',
        marginY: { xs: '1rem', sm: '1.5rem' },
      }}
    >
      <Box
        component={'img'}
        sx={{
          alignSelf: 'center',
          height: '100%',
          width: '100%',
          objectFit: 'contain',
          borderRadius: 5,
          border: '1px solid #8C8C8C',
        }}
        alt={`${name}`}
        src={
          field.value ||
          'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='
        }
      />
      <Tooltip title={'Agregar Foto'}>
        <IconButton
          sx={{ position: 'absolute', right: { xs: '1rem', sm: '2rem' } }}
          onClick={showWidgetCloudinary}
        >
          <AddPhotoIcon color="primary" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CloudinaryWidget;
