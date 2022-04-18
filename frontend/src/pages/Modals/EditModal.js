import React, { useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../auth/useAuth';
import EditAccountResolver from '../../validations/EditAccountResolver';

export default function EditModal({ isOpen, close, user }) {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm({ resolver: EditAccountResolver });
    const { updateUser } = useAuth();

    //Para ver si hay algún cambio del texto original
    const isDirty = !!Object.keys(dirtyFields).length;

    const onSubmit = (formData) => {

        toast.promise(async () => {

            const id = localStorage.getItem("_id");
            const res = await fetch(`http://localhost:4000/api/users/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const hasChanged = await res.json();
            
            if (hasChanged.success !== true) {
                toast.error(hasChanged.message);
            } else {
                toast.success(hasChanged.message);
                updateUser(formData);
                close();
            }

        }, {
            pending: 'Actualizando usuario'
        });

    };

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                role: user.role
            })
        }
    }, [user, reset])

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cuenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
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
                        <Form.Label>Correo</Form.Label>
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

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit(onSubmit)}
                    disabled={!isDirty}>Actualizar Cuenta</Button>
            </Modal.Footer>
        </Modal>
    )
}
