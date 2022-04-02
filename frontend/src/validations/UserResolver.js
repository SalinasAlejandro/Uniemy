import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import roles from '../helpers/roles';

const schema = yup.object().shape({
    name: yup
        .string("El nombre debe ser String")
        .required("Debe ingresar un nombre")
        .min(3, "El nombre debe contener al menos 3 cáracteres")
        .max(25, "El nombre debe contener un máximo de 25 cáracteres"),
    email: yup
        .string("El nombre debe ser String")
        .required("Debe ingresar un correo")
        .email("Ingrese un correo válido"),
    password: yup
        .string("El nombre debe ser String")
        .required("Debe ingresar una contraseña")
        .min(5, "La contraseña debe contener al menos 5 cáracteres")
        .max(25, "La contraseña debe contener un máximo de 25 cáracteres"),
    type: yup
        .string("El rol debe ser String")
        .oneOf(Object.keys(roles), "Seleccione el tipo de cuenta")
});

export default yupResolver(schema);