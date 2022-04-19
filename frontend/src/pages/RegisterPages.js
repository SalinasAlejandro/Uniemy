import React from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import roles from '../helpers/roles';
import UserAccountResolver from './../validations/UserResolver';
import { toast } from 'react-toastify';
import routes from '../helpers/routes';
import "./css/RegisterPages.css"
import { Link } from 'react-router-dom';

export default function RegisterPages() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: UserAccountResolver });

    const onSubmit = async (formData) => {
        if (formData.type === "Estudiante") {
            formData.type = 0;
        } else {
            formData.type = 1;
        }

        toast.promise(async () => {

            const res = await fetch('http://localhost:4000/api/users/', {
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
                toast.promise(() => {

                    setTimeout(function () {
                        window.location.href = routes.login;
                    }, 3000);

                }, {
                    pending: 'Redireccionando...'
                })
            }

        }, {
            pending: 'Creando usuario'
        });
    };

    return (
        <Container>

            <div id="formC">
                <div>
                    <img src={require('../pages/img/logo.png')} className="icon" alt='Logo Uniemy' />
                    <h1 className='Textregistrar'>Registrarse</h1>
                </div>
                <Row>
                    <Col sm={{ span: 4, offset: 4 }}>
                        <Form onSubmit={handleSubmit(onSubmit)}>

                            <Form.Group>
                                <Form.Label className='Text'>Nombre</Form.Label>
                                <Form.Control
                                    placeholder='Escriba su Nombre'
                                    {...register('name')}
                                    type='text'
                                />
                                {errors?.name && (
                                    <Form.Text>
                                        <Alert variant='danger'>
                                            {errors.name.message}
                                        </Alert>
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='Text'>Correo Electrónico</Form.Label>
                                <Form.Control
                                    placeholder='Escriba su Correo Electrónico'
                                    {...register('email')}
                                    type='email'
                                />
                                {errors?.email && (
                                    <Form.Text>
                                        <Alert variant='danger'>
                                            {errors.email.message}
                                        </Alert>
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='Text'>Contraseña</Form.Label>
                                <Form.Control
                                    placeholder='Escriba su Contraseña'
                                    {...register('password')}
                                    type='password'
                                />
                                {errors?.password && (
                                    <Form.Text>
                                        <Alert variant='danger'>
                                            {errors.password.message}
                                        </Alert>
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='Text'>Tipo</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register('type')}
                                >
                                    <option>Seleccione el Tipo de Cuenta</option>
                                    {Object.keys(roles).map(role => (
                                        <option key={role}>{role}</option>
                                    ))}
                                </Form.Control>
                                {errors?.type && (
                                    <Form.Text>
                                        <Alert variant='danger'>
                                            {errors.type.message}
                                        </Alert>
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Link to='/login'>
                                <Button className='btnr' onClick={handleSubmit(onSubmit)}>
                                    Registrarse
                                </Button>
                            </Link>

                        </Form>
                    </Col>
                </Row>
            </div>

        </Container>
    )

}
