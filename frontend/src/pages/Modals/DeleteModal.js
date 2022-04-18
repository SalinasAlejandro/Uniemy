import React from 'react';
import { Modal, Alert, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useAuth from '../../auth/useAuth';

export default function DeleteModal({ isOpen, close }) {

    const { logout } = useAuth();

    const handleDelete = () => {


        toast.promise(async () => {

            const id = localStorage.getItem("_id");
            const res = await fetch(`http://localhost:4000/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const hasDeleted = await res.json();
            
            if (hasDeleted.success !== true) {
                toast.error(hasDeleted.message);
            } else {
                toast.success(hasDeleted.message);
                logout();
            }

        }, {
            pending: 'Eliminando usuario'
        });

    }

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Cuenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant='danger'>
                    ¿Estás seguro de eliminar su cuenta? <b>Se perderán sus datos</b>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Cancelar</Button>
                <Button variant="danger" onClick={handleDelete}>Eliminar Cuenta</Button>
            </Modal.Footer>
        </Modal>
    )
}
