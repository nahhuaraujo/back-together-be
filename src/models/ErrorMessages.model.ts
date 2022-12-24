export enum ErrorMessages {
  FILE_NOT_FOUND = 'Archivo no encontrado',
  EMAIL_NOT_FOUND = 'Email no encontrado',
  EMAIL_NOT_REGISTERED = 'Este email no esta registrado, registrate y volve a intentar',
  EMAIL_EXISTS_ALREADY = 'Este email ya esta registrado, intenta registrarte con otro',
  INCORRECT_PASSWORD = 'Esta contraseña es incorrecta, por favor intenta de nuevo',
  AUTH_FAILED = 'La autenticacion fallo, intenta iniciar sesion nuevamente',
  SESSION_EXPIRED = 'La sesion expiro, inicia sesion nuevamente',
  UNKNOWN_ERROR = 'Ocurrio un error desconocido, por favor intenta mas tarde',
}

export enum ValidationErrors {
  EMAIL_IS_REQUIRED = 'El campo email es requerido',
  PASSWORD_IS_REQUIRED = 'El campo contraseña es requerido',
  PHONE_IS_REQUIRED = 'El campo telefono es requerido',
}
