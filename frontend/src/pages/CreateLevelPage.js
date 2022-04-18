import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BtnN } from './Componentes/stylesComponents';
import LevelCreateResolver from '../validations/LevelCreateResolver';
import { useForm } from 'react-hook-form';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';

export default function CreateLevelPage() {

    const [infoLevel, setInfoLevel] = useState();
    const [isEditing, setIsEditing] = useState();
    const [isOwner, setIsOwner] = useState();
    const [courses, setCourses] = useState();
    const [courseParent, setCourseParent] = useState();

    const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm({ resolver: LevelCreateResolver });


    useEffect(() => {
        async function fetchData() {
            let urlElements = window.location.pathname.split('/');
            if (urlElements.length !== 4) {
                setIsEditing(false);
                setIsOwner(true);
                const id = localStorage.getItem("_id");
                const res = await axios.get(`http://localhost:4000/api/courses/school/${id}`);

                if (res.data.data.length > 0)
                    setCourses(res.data.data.map(courses => courses));
            } else {
                setIsEditing(true);
                const res = await fetch(`http://localhost:4000/api/levels/${urlElements[3]}`);
                const infLevel = await res.json();

                setInfoLevel(infLevel.data);
                setIsOwner(infLevel.data.school === localStorage.getItem('_id'));

                setValue('course', infLevel.data.course);
                setValue('title', infLevel.data.title);
                setValue('description', infLevel.data.description);
                setValue('video', infLevel.data.video);
            }

        }
        fetchData();
    }, []);

    const onSelectChange = e => {
        setCourseParent(e.target.value);
    }


    const onSubmit = (formData) => {
        if (isOwner === true) {
            if (isEditing === false) {
                creatingLevel(formData);
            } else {
                editingLevel(formData);
            }
        }
    };

    const creatingLevel = async (formData) => {

        toast.promise(async () => {

            const resCourse = await fetch(`http://localhost:4000/api/courses/${courseParent}`);
            const existCourse = await resCourse.json();

            if (existCourse.success !== true) {
                toast.error('Seleccione un curso válido');
                return;
            }

            const resLevels = await fetch(`http://localhost:4000/api/levels/course/${courseParent}`);
            const hasLevels = await resLevels.json();

            formData.number = (hasLevels.data.length + 1);
            formData.school = localStorage.getItem('_id');

            const res = await fetch('http://localhost:4000/api/levels/', {
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
                setCourseParent(null);
                reset();
            }

        }, {
            pending: 'Creando nivel...'
        });

    }

    const editingLevel = async (formData) => {
        toast.promise(async () => {

            const levelEdited = {
                title: formData.title,
                video: formData.video,
                description: formData.description,
                number: infoLevel.number,
                course: formData.course,
            }

            const res = await fetch(`http://localhost:4000/api/levels/${infoLevel._id}`, {
                method: 'PATCH',
                body: JSON.stringify(levelEdited),
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
            pending: 'Editando Nivel...'
        });
    }

    return (

        <div className="col-md-6 offset-md-3">
            <div className="card card-body" id='tarjeta'>
                <h4>Crear un nivel</h4>

                <Form onSubmit={handleSubmit(onSubmit)}>

                    {
                        isEditing === false ? (
                            <Form.Group>
                                <Form.Label className='Text'>Curso</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register('course')}
                                    onChange={onSelectChange}
                                >
                                    <option>Seleccione el curso</option>
                                    {
                                        courses === undefined ? (
                                            <option>No tienes cursos</option>
                                        ) : (
                                            courses.map(courseP =>
                                                <option value={courseP._id} key={courseP._id}>
                                                    {courseP.title}
                                                </option>)
                                        )
                                    }
                                </Form.Control>
                                {errors?.role && (
                                    <Form.Text>
                                        <Alert variant='danger'>
                                            {errors.role.message}
                                        </Alert>
                                    </Form.Text>
                                )}
                                {errors?.course && (
                                    <Form.Text>
                                        <Alert variant='danger'>
                                            {errors.course.message}
                                        </Alert>
                                    </Form.Text>
                                )}
                            </Form.Group>
                        ) : (
                            <></>
                        )
                    }
                    <Form.Group>
                        <Form.Label className='Text'>Título</Form.Label>
                        <Form.Control
                            placeholder='Título del Nivel'
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
                            placeholder='Descripción del Nivel'
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
                        <Form.Label className='Text'>Vídeo</Form.Label>
                        <Form.Control
                            placeholder='Vídeo del nivel'
                            {...register('video')}
                            type='text'
                        />
                        {errors?.video && (
                            <Form.Text>
                                <Alert variant='danger'>
                                    {errors.video.message}
                                </Alert>
                            </Form.Text>
                        )}
                    </Form.Group>

                    <BtnN
                        style={{
                            width: '90%',
                            marginLeft: '3%',
                            marginTop: '1%'
                        }}
                    >{'Guardar'}</BtnN>

                </Form>


            </div>
        </div>

    )

}