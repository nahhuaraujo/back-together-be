import { checkSchema } from 'express-validator';

export const checkLogin = () => {
  return checkSchema({
    email: {
      isEmail: true,
      errorMessage: 'El email es requerido para iniciar sesion',
    },
    password: {
      notEmpty: true,
      errorMessage: 'La password es requerida para iniciar sesion',
    },
  });
};

export const checkRegister = () => {
  return checkSchema({
    email: {
      isEmail: true,
      errorMessage: 'El email es requerido para registrarse',
    },
    password: {
      notEmpty: true,
      errorMessage: 'La password es requerida para registrarse',
    },
    phone: {
      isMobilePhone: true,
      errorMessage: 'El telefono es requerido para registrarse',
    },
  });
};
