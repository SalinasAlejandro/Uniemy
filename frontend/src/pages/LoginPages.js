import React from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../auth/useAuth';
import { Link, useLocation } from 'react-router-dom';
import "./css/LoginPages.css"
import { DivWrapper } from './Componentes/stylesComponents';
import routes from '../helpers/routes';

export default function LoginPages() {

    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();

    const onSubmit = async (formData) => {
        toast.dismiss();

        const res = await fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const hayCoincidencia = await res.json();

        if (hayCoincidencia.success !== true) {
            toast.error(hayCoincidencia.message);
        } else {
            login(hayCoincidencia.data, location.state?.from);
        }
    };

    return (
        <Container>
            <Row>
                <DivWrapper className="wrapper">
                    <div id="formContent">
                        <div>
                            <img src={require('../pages/img/logo.png')} className="icon" alt='Logo Uniemy' />
                            <h1 className='Textiniciar'>Iniciar Sesión</h1>
                        </div>

                        <Col sm={{ span: 4, offset: 4 }}>
                            <Form onSubmit={handleSubmit(onSubmit)}>

                                <Form.Group>
                                    <Form.Label className='Text'>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        placeholder='Escriba su correo'
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
                                </Form.Group>

                                <Button className='btni' onClick={handleSubmit(onSubmit)}>Ingresar</Button>

                            </Form>
                        </Col>

                        <div>
                            <Link className="registro" to={routes.register}>
                                ¿No tiene cuenta? Registrese
                            </Link>
                        </div>
                    </div>
                </DivWrapper>


            </Row>
        </Container>
    )

}
