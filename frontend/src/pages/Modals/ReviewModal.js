import React, { useEffect } from 'react';
import { Modal, Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '../../helpers/routes';
import ReviewResolver from '../../validations/ReviewResolver';

export default function ReviewModal({ isOpen, close, infoCourse, review, setReview, allReviews }) {

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({ resolver: ReviewResolver });

    useEffect(() => {
        function initValue() {
            if (review.like !== undefined)
                setValue('like', review?.like);
            setValue('comment', review?.comment);
        }

        initValue();
        allReviews();
    }, [isOpen])

    const onSubmit = (formData) => {

        toast.promise(async () => {

            formData.student = localStorage.getItem('_id');
            formData.course = infoCourse._id;

            if (review === false) {

                const res = await fetch(`http://localhost:4000/api/reviews/`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const hasCreated = await res.json();

                if (hasCreated.success !== true) {
                    toast.error(hasCreated.message);
                } else {
                    setReview(hasCreated.data);
                    toast.success(hasCreated.message);
                    close();
                }

            } else {

                const res = await fetch(`http://localhost:4000/api/reviews/${review._id}`, {
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
                    setReview(isEdited.data.Modificado);
                    toast.success(isEdited.message);
                    close();
                }

            }

        }, {
            pending: 'Publicando reseña...'
        });

    };

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Mi reseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Form.Group>
                        <Form.Label>¿Te gutó el curso?</Form.Label>
                        <Form.Control
                            as="select"
                            {...register('like')}
                        >
                            <option value="1">Sí</option>
                            <option value="0">No</option>
                        </Form.Control>
                        {errors?.like && (
                            <Form.Text>
                                <Alert variant='danger'>
                                    {errors.like.message}
                                </Alert>
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control
                            placeholder='¿Qué opinas del curso?'
                            {...register('comment')}
                            as="textarea" rows={5}
                        />
                        {errors?.comment && (
                            <Form.Text>
                                <Alert variant='danger'>
                                    {errors.comment.message}
                                </Alert>
                            </Form.Text>
                        )}
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Cancelar</Button>
                <Link to={routes.course(infoCourse?._id)}>
                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>Publicar</Button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}
