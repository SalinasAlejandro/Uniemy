import React, { useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../auth/useAuth';
import EditAvatar from '../../validations/EditAvatar';

export default function ProfilePicModal({ isOpen, close }) {

    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm({ resolver: EditAvatar });
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

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Cambiar foto de Perfil</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>Escriba la URL de la imagen</Form.Label>
                        <Form.Control
                            placeholder='Escriba su nombre'
                            {...register('avatar')}
                            type='text'
                        />
                        {errors?.avatar && (
                            <Form.Text>
                                <Alert variant='danger'>
                                    {errors.avatar.message}
                                </Alert>
                            </Form.Text>
                        )}
                    </Form.Group>
                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit(onSubmit)}
                    disabled={!isDirty}>Actualizar Imagen</Button>
            </Modal.Footer>
        </Modal>
    )
}
