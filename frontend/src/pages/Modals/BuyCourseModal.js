import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function BuyCourseModal({ isOpen, close, infoCourse, purchase }) {

    const handleBuy = () => {

        toast.promise(async () => {

            const id = localStorage.getItem("_id");
            const formData = {
                type: 0,
                student: id,
                course: infoCourse._id,
                titleCourse: infoCourse.title,
                imageCourse: infoCourse.image,
                school: infoCourse.school
            }
            const res = await fetch(`http://localhost:4000/api/purchases/`, {
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
                purchase(true);
                close();
            }

        }, {
            pending: 'Comprando curso...'
        });

    }

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Comprar Curso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Curso: {infoCourse?.title}</p>
                <p>con precio de ${infoCourse?.price} MXN</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Cancelar</Button>
                <Button variant="primary" onClick={handleBuy}>Comprar Curso</Button>
            </Modal.Footer>
        </Modal>
    )
}
