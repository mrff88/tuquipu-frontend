const MUI_DATA_TABLE = {
  OPTIONS: {
    search: true,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
    selectableRowsHideCheckboxes: true,
    responsive: 'standard',
    searchPlaceholder: 'Buscar...',
    textLabels: {
      body: {
        noMatch: 'Lo sentímos, no hay resultados para su busqueda',
        toolTip: 'Ordenar',
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: 'Siguiente página',
        previous: 'Página previa',
        rowsPerPage: 'Filas por página:',
        displayRows: 'de',
      },
      toolbar: {
        search: 'Buscar',
      },
    },
  },
  USER_COLUMNS: [
    {
      name: 'Nombres',
      options: {
        sort: false,
        setCellHeaderProps: () => ({ align: 'center' }),
      },
    },
    {
      name: 'Apellidos',
      options: {
        sort: false,
        setCellHeaderProps: () => ({ align: 'center' }),
      },
    },
    {
      name: 'Estado',
      options: {
        sort: false,
        searchable: false,
        setCellHeaderProps: () => ({ align: 'center' }),
        setCellProps: () => ({ align: 'center' }),
      },
    },
    {
      name: 'Acciones',
      options: {
        sort: false,
        searchable: false,
        setCellHeaderProps: () => ({ align: 'center' }),
        setCellProps: () => ({ align: 'center' }),
      },
    },
  ],
};

export default MUI_DATA_TABLE;
