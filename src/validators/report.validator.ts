import { checkSchema } from 'express-validator';

export const checkReport = () => {
  return checkSchema({
    species: {
      isString: true,
      errorMessage: 'La especie de la mascota es requerida para crear el reporte',
    },
    sex: {
      isString: true,
      errorMessage: 'El sexo de la mascota es requerido para crear el reporte',
    },
    description: {
      isString: true,
      errorMessage: 'La descripcion de la mascota es requerida para crear el reporte',
    },
    img: {
      errorMessage: 'La foto de la mascota es requerida para crear el reporte',
    },
    _id: {
      isString: true,
      isLength: {
        options: {
          min: 24,
        },
        errorMessage: 'La longitud del id debe ser igual o mayor a 12 caracteres',
      },
    },
    email: {
      isEmail: true,
      errorMessage: 'El formato del email ingresado es invalido, use por ejemplo user@domain.com',
    },
    phone: {
      isMobilePhone: true,
      errorMessage: 'El campo telefono es requerido para crear el reporte',
    },
    type: {
      isString: true,
      errorMessage: 'El tipo de reporte es requerido para crear el reporte',
    },
    location: {
      isString: true,
      errorMessage: 'La ubicacion donde se perdio/encontro la mascota es requerida para crear el reporte',
    },
  });
  // return checkSchema({
  //   'pet.species': {
  //     isString: true,
  //     errorMessage: 'La especie de la mascota es requerida para crear el reporte',
  //   },
  //   'pet.sex': {
  //     isString: true,
  //     errorMessage: 'El sexo de la mascota es requerido para crear el reporte',
  //   },
  //   'pet.description': {
  //     isString: true,
  //     errorMessage: 'La descripcion de la mascota es requerida para crear el reporte',
  //   },
  //   'pet.img': {
  //     errorMessage: 'La foto de la mascota es requerida para crear el reporte',
  //   },
  //   'user._id': {
  //     isString: true,
  //     isLength: {
  //       options: {
  //         min: 24,
  //       },
  //       errorMessage: 'La longitud del id debe ser igual o mayor a 12 caracteres',
  //     },
  //   },
  //   'user.email': {
  //     isEmail: true,
  //     errorMessage: 'El formato del email ingresado es invalido, use por ejemplo user@domain.com',
  //   },
  //   'user.phone': {
  //     isMobilePhone: true,
  //     errorMessage: 'El campo telefono es requerido para crear el reporte',
  //   },
  //   type: {
  //     isString: true,
  //     errorMessage: 'El tipo de reporte es requerido para crear el reporte',
  //   },
  //   location: {
  //     isString: true,
  //     errorMessage: 'La ubicacion donde se perdio/encontro la mascota es requerida para crear el reporte',
  //   },
  // });
};

export const checkId = () => {
  return checkSchema({
    id: {
      isString: true,
      errorMessage: 'El id es requerido para obtener el reporte',
    },
  });
};
