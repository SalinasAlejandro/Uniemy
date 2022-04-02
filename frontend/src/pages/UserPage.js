import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../auth/useAuth';
import useModal from '../hooks/useModal';

export default function UserPage() {

    const { user } = useAuth();

    const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
    const [isOpenChangePasswordModal, openChangePasswordModal, closeChangePasswordModal] = useModal();
    const [isOpenEditModal, openEditModal, closeEditModal] = useModal();
    const [isOpenProfilePicModal, openProfilePicModal, closeProfilePicModal] = useModal();

    return (<>
        <Container>
            <Row className='mt-4'>
                <Col>
                    <img
                        src={user?.avatar || "/img/avatar.svg"}
                        alt="Profile"
                        onClick={openProfilePicModal}
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        }} />
                </Col>
                <Col className='mt-4'>
                    <Card style={{ maxWidth: '360px' }} className='mx-auto p-4'>
                        <p className='text-center'> <b>Nombre: </b> {user.name} </p>
                        <p className='text-center'> <b>Correo: </b> {user.email} </p>
                        <p className='text-center'> <b>Rol: </b> {user.type === 0 ? 'Estudiante' : 'Escuela'} </p>

                        <Button variant="warning" onClick={openEditModal}>
                            Editar Cuenta
                        </Button>
                        <Button variant="link" className='mt-1' onClick={openChangePasswordModal}>
                            Cambiar contraseña
                        </Button>
                        <Button variant="link" className='mt-3 text-danger' onClick={openDeleteModal}>
                            Eliminar Cuenta
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
    );
}
