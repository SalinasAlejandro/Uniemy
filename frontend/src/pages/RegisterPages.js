import React from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import roles from '../helpers/roles';
import UserAccountResolver from './../validations/UserResolver';
import axios from 'axios';
import { toast } from 'react-toastify';
import routes from '../helpers/routes';
import "./css/RegisterPages.css"

export default function RegisterPages() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: UserAccountResolver });

    const onSubmit = async (formData) => {
        if (formData.type == "Estudiante") {
            formData.type = 0;
        } else {
            formData.type = 1;
        }

        try {
            const isCreated = await axios.post('http://localhost:4000/api/users/', formData);
            console.log("El success:", isCreated.data.success);
            if (isCreated.data.success) {
                toast.success("Registrado con éxito");
                reset();
                setTimeout(function () {
                    window.location.href = routes.login;
                }, 3000);
            }
        } catch (e) {
            toast.error("Algo falló, intentelo más tarde");
        }
    };

    return (
        <Container>

            <div id="formC">
                <div>
                    <img src={require('../pages/img/logo.png')} className="icon" />
                    <h1 className='Textregistrar'>Registrarse</h1>
                </div>
                <Row>
                    <Col sm={{ span: 4, offset: 4 }}>
                        <Form onSubmit={handleSubmit(onSubmit)}>

                            <Form.Group>
                                <Form.Label className='Text'>Nombre</Form.Label>
                                <Form.Control
                                    placeholder='Escriba su nombre'
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
                                <Form.Label className='Text'>Correo</Form.Label>
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
                                <Form.Label className='Text'>Nueva Contraseña</Form.Label>
                                <Form.Control
                                    placeholder='Escriba su nueva Contraseña'
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
                                    <option>Seleccione el tipo de cuenta</option>
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

                            <Button className='btnr' onClick={handleSubmit(onSubmit)}>Registrarse</Button>

                        </Form>
                    </Col>
                </Row>
            </div>

        </Container>
    )

}
