import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import roles from '../helpers/roles';
import routes from '../helpers/routes';
import useModal from '../hooks/useModal';
import DeleteModal from './Modals/DeleteModal';
import EditModal from './Modals/EditModal';
import ProfilePicModal from './Modals/ProfilePicModal';
import './css/UserPage.css';

export default function UserPage() {

    const { user } = useAuth();

    const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
    const [isOpenEditModal, openEditModal, closeEditModal] = useModal();
    const [isOpenProfilePicModal, openProfilePicModal, closeProfilePicModal] = useModal();

    const [listcourses, setListCourses] = useState(false);

    useEffect(() => {
        function getCourses() {
            if (user.type === roles.Escuela)
                getCoursesEscuela();
            else
                getCoursesEstudiante();
        }

        getCourses();
    }, []);

    const getCoursesEscuela = async () => {
        const res = await fetch(`http://localhost:4000/api/courses/school/${localStorage.getItem('_id')}`);
        const infCourses = await res.json();
        if (infCourses.data.length > 0) {
            setListCourses(infCourses.data);
        }
    }

    const getCoursesEstudiante = async () => {
        const res = await fetch(`http://localhost:4000/api/purchases/purchases/${localStorage.getItem('_id')}`);
        const infCourses = await res.json();
        if (infCourses.data.length > 0) {
            setListCourses(infCourses.data);
        }
    }

    return (
        <>
            <Container>
                <Row className='mt-4'>
                    <Col>
                        <img
                            className='avat'
                            src={user?.avatar || "/img/avatar.svg"}
                            alt="Profile"
                            style={{
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} />
                    </Col>
                    <Col className='mt-4'>
                        <Card className="info" style={{ maxWidth: '360px' }}>
                            <p className='text-center'> <b>Nombre: </b> {user.name} </p>
                            <p className='text-center'> <b>Correo: </b> {user.email} </p>
                            <p className='text-center'> <b>Rol: </b> {user.type === 0 ? 'Estudiante' : 'Escuela'} </p>

                            <Button variant="warning" onClick={openEditModal}>
                                Editar Cuenta
                            </Button>
                            <Button variant="link" className='mt-1' onClick={openProfilePicModal}>
                                Cambiar Foto de Perfil
                            </Button>
                            <Button variant="link" className='mt-3 text-danger' onClick={openDeleteModal}>
                                Eliminar Cuenta
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {
                user.type === roles.Escuela ? (

                    <>
                    <br></br>
                    <hr />
                        <h2 className='text' align="center">Cursos Creados</h2>
                        {
                            listcourses === false ? (
                                <h4 align="center">No hay cursos creados</h4>
                            ) : (
                                <Row xs={1} md={2} lg={3} className="g-4">
                                    {
                                        listcourses.map(course => (
                                            <Col>
                                                <Card className='tarjeta'>
                                                    <Card.Img variant="top" src={course.image} width="100%" height={200}/>
                                                    <Card.Body>
                                                        <Card.Title>{course.title}</Card.Title>
                                                        <Link to={routes.course(course._id)}>
                                                            <Button className='ver'>Ver Curso</Button>
                                                        </Link>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            )
                        }
                    </>

                ) : (

                    <>
                    <hr />
                        <h2 className='text' align="center">Cursos Comprados</h2>
                        {
                            listcourses === false ? (
                                <h4 align="center">No hay cursos comprados</h4>
                            ) : (
                                <Row xs={1} md={2} lg={3} className="g-4">
                                    {
                                        listcourses.map(course => (
                                            <Col>
                                                <Card className='tarjeta'>
                                                    <Card.Img variant="top" src={course.imageCourse} />
                                                    <Card.Body>
                                                        <Card.Title>{course.titleCourse}</Card.Title>
                                                        <Link to={routes.course(course.course)}>
                                                            <Button className='ver'>Ver Curso</Button>
                                                        </Link>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            )
                        }
                    </>

                )
            }


            <EditModal
                isOpen={isOpenEditModal}
                close={closeEditModal}
                user={user}
            />

            <ProfilePicModal
                isOpen={isOpenProfilePicModal}
                close={closeProfilePicModal}
                user={user}
            />

            <DeleteModal
                isOpen={isOpenDeleteModal}
                close={closeDeleteModal}
            />

        </>
    );
}
