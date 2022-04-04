import React from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../auth/useAuth';
import { useLocation } from 'react-router-dom';
import "./css/LoginPages.css"

export default function LoginPages() {

    const location = useLocation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { login } = useAuth();

    const onSubmit = async (formData) => {
        try {
            const hayCoincidencia = await axios.post('http://localhost:4000/api/users/login', formData);
            if (hayCoincidencia.data.success) {
                login(hayCoincidencia.data.data, location.state?.from)
            }
        } catch (error) {
            toast.error("Credenciales incorrectas");
        }
    };

    return (
        <Container>
            <Row>
            <div className="wrapper">
        <div id="formContent">
            <div>
            <img  src={ require('../pages/img/logo.png')} className="icon"/>
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
                <a className="registro" href="register">¿No tiene cuenta? Registrese</a>
            </div>
            </div>
        </div>
   
               
            </Row>
        </Container>
    )

}
