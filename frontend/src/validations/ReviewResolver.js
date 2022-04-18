import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    like: yup
        .number("El nombre debe ser Entero")
        .required("Debe ingresar un like"),
    comment: yup
        .string("El nombre debe ser String")
        .required("Debe ingresar un comentario")
        .min(5, "Debe ingresar al menos 5 cáracteres")
});

export default yupResolver(schema);