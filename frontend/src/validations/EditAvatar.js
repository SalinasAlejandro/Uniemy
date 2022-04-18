import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    avatar: yup
        .string("El nombre debe ser String")
        .required("Debe ingresar un nombre")
        .url("Debe ingresar una URL válida")
});

export default yupResolver(schema);