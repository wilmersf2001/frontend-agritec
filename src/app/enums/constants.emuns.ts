export enum CONSTANTES {
  ANIO_INICIO_POSTULACION = 1980,
  DURATION_SNACKBAR = 3000,
  RANGO_ANIOS = 14,
  ANIO_MAYOR_EDAD = 18,
}

export enum ACTIONS {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  PERMISSIONS = 'PERMISSIONS',
}

export const ACTION_DETAILS = {
  [ACTIONS.CREATE]: {
    titleForm: 'CREAR USUARIO',
    namebutton: 'Crear',
    colorButton: 'primary',
    iconButton: 'add',
  },
  [ACTIONS.UPDATE]: {
    titleForm: 'ACTUALIZAR USUARIO',
    namebutton: 'Actualizar',
    colorButton: 'primary',
    iconButton: 'edit',
  },
  [ACTIONS.DELETE]: {
    titleForm: 'ELIMINAR USUARIO',
    namebutton: 'Eliminar',
    colorButton: 'warn',
    iconButton: 'delete',
  },
  [ACTIONS.PERMISSIONS]: {
    titleForm: 'PERMISOS',
    namebutton: 'Guardar',
    colorButton: 'primary',
    iconButton: 'save',
  },
};
