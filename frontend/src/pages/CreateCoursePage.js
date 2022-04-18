import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import "./css/CreateCoursePage.css"
import { BtnN } from './Componentes/stylesComponents';
import CourseCreateResolver from '../validations/CourseCreateResolver';
import { Alert, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function CreateCoursePage() {

    const [infoCourse, setInfoCourse] = useState();
    const [isEditing, setIsEditing] = useState();
    const [isOwner, setIsOwner] = useState();

    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm({ resolver: CourseCreateResolver });

    useEffect(() => {
        async function getInfoCourse() {
            let urlElements = window.location.pathname.split('/');
            if (urlElements.length !== 4) {
                setIsEditing(false);
                setIsOwner(true);
            } else {
                setIsEditing(true);
                const res = await fetch(`http://localhost:4000/api/courses/${urlElements[3]}`);
                const infCourse = await res.json();

                setInfoCourse(infCourse.data);
                setIsOwner(infCourse.data.school === localStorage.getItem('_id'));

                setValue('title', infCourse.data.title);
                setValue('description', infCourse.data.description);
                setValue('image', infCourse.data.image);
                setValue('price', infCourse.data.price);
            }
        }
        getInfoCourse();
    }, []);

    const onSubmit = (formData) => {
        if (isOwner === true) {
            if (isEditing === false) {
                createCourse(formData);
            } else {
                editCourse(formData);
            }
        }
    };

    const createCourse = async (formData) => {

        toast.promise(async () => {

            formData.school = localStorage.getItem("_id");
            if (formData.price !== 0) {
                formData.ventas = 0;
            }
            formData.title = formData.title.toUpperCase()
            const res = await fetch('http://localhost:4000/api/courses/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const isCreated = await res.json();

            if (isCreated.success !== true) {
                toast.error(isCreated.message);
            } else {
                toast.success(isCreated.message);
                reset();
            }

        }, {
            pending: 'Creando curso'
        });

    }

    const editCourse = async (formData) => {
        toast.promise(async () => {

            if (infoCourse.ventas !== undefined)
                formData.ventas = infoCourse.ventas;
            formData.school = infoCourse.school;

            const res = await fetch(`http://localhost:4000/api/courses/${infoCourse._id}`, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const isEdited = await res.json();

            if (isEdited.success !== true) {
                toast.error(isEdited.message);
            } else {
                toast.success(isEdited.message);
            }

        }, {
            pending: 'Editando curso...'
        });
    }

    return (

        <div className="col-md-6 offset-md-3">
            <div className="card card-body" id='tarjeta'>
                {
                    isEditing === true ? (
                        <h4>Editar curso</h4>
                    ) : (
                        <h4>Crear un curso</h4>
                    )
                }

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label className='Text'>Título</Form.Label>
                        <Form.Control
                            placeholder='Título del curso'
                            {...register('title')}
                            type='text'
                        />
                        {errors?.title && (
                            <Form.Text>
                                <Alert variant='danger'>
                                    {errors.title.message}
                                </Alert>
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='Text'>Descripción</Form.Label>
                        <Form.Control
                            placeholder='Descripción del Curso'
                            {...register('description')}
                            as="textarea" rows={2}
                        />
                        {errors?.description && (
                            <Form.Text>
                                <Alert variant='danger'>
                                    {errors.description.message}
                                </Alert>
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='Text'>Imagen</Form.Label>
                        <Form.Control
                            placeholder='Imagen del curso'
                            {...register('image')}
                            type='text'
                        />
                        {errors?.image && (
                            <Form.Text>
                                <Alert variant='danger'>
                                    {errors.image.message}
                                </Alert>
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='Text'
                            style={{
                                display: 'block'
                            }}
                        >
                            Precio
                        </Form.Label>
                        <Form.Control
                            placeholder='Precio del curso'
                            {...register('price')}
                            type='number'
                            style={{
                                width: '50%',
                                display: 'inline'
                            }}
                            step=".01"
                        />

                        <BtnN>{'Guardar'}</BtnN>

                        {errors?.price ?
                            (
                                <Form.Text>
                                    <Alert variant='danger'
                                        style={{
                                            width: '50%',
                                        }}>
                                        {errors.price.message}
                                    </Alert>
                                </Form.Text>
                            ) :
                            (
                                <Form.Text>
                                    <Alert
                                        style={{
                                            width: '50%',
                                            margin: '0%',
                                            padding: '0%'
                                        }}>
                                        Ingrese '0' si quiere que sea gratuito
                                    </Alert>
                                </Form.Text>
                            )
                        }
                    </Form.Group>

                </Form>

            </div>
        </div >

    )

}