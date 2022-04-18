import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    name: yup
        .string("El nombre debe ser String")
        .required("Debe ingresar un nombre")
        .min(3, "El nombre debe contener al menos 3 cáracteres")
        .max(25, "El nombre debe contener un máximo de 25 cáracteres"),
    email: yup
        .string("El nombre debe ser String")
        .required("Debe ingresar un correo")
        .email("Ingrese un correo válido")
});

export default yupResolver(schema);