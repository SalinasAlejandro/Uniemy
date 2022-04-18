import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    title: yup
        .string("El título debe ser String")
        .required("Debe ingresar un título")
        .min(3, "El título debe contener al menos 3 cáracteres")
        .max(50, "El título debe contener un máximo de 50 cáracteres"),
    video: yup
        .string("El video debe ser String")
        .required("Debe ingresar una ruta de video")
        .url('Debe ingresar una URL válida'),
    description: yup
        .string("La description debe ser String")
        .required("Debe ingresar una descripción")
        .min(5, "La descripción debe contener al menos 5 cáracteres"),
    course: yup
        .string("La escuela debe ser String")
        .required("Debe ingresar un curso")
});

export default yupResolver(schema);