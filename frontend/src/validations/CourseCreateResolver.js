import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    title: yup
        .string("El título debe ser String")
        .required("Debe ingresar un título")
        .min(3, "El título debe contener al menos 3 cáracteres")
        .max(50, "El título debe contener un máximo de 50 cáracteres"),
    image: yup
        .string("La imagen debe ser String")
        .required("Debe ingresar una ruta de imagen")
        .url('Debe ingresar una URL válida'),
    description: yup
        .string("La description debe ser String")
        .required("Debe ingresar una descripción")
        .min(5, "La descripción debe contener al menos 5 cáracteres"),
    price: yup
        .number("Ingrese un precio válido")
        .required("Debe ingresar un precio")
        .min(0, "Favor de ingresar un precio válido")
});

export default yupResolver(schema);