import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import routes from '../helpers/routes';
import roles from './../helpers/roles';

export default function Navigation() {

    const { isLogged, logout, user } = useAuth();

    return (
        <Navbar collapseOnSelect expand='lg' variant='dark' bg='dark'>
            <Navbar.Brand as={NavLink} to="/">Unidemy</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav' className='mr-auto'>
                <Nav>
                    <Nav.Link as={NavLink} to={routes.courses}>Bliblioteca</Nav.Link>
                </Nav>
                {!isLogged() ? (
                    <Nav >
                        <Nav.Link as={NavLink} to={routes.login}>Iniciar Sesión</Nav.Link>
                        <Nav.Link as={NavLink} to={routes.register}>Registrarse</Nav.Link>
                    </Nav>
                ) : (
                    user.type === roles.Escuela ? (
                        <Nav >
                            <Nav.Link as={NavLink} to={routes.createCourse}>Crear Curso</Nav.Link>
                            <Nav.Link as={NavLink} to={routes.createLevel}>Crear Nivel</Nav.Link>
                            <NavDropdown title="Perfil">
                                <NavDropdown.Item as={NavLink} to={routes.profile}>Mi Cuenta</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={NavLink} to={routes.login} onClick={logout}>Cerrar Sesión</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav >
                            <NavDropdown title="Perfil">
                                <NavDropdown.Item as={NavLink} to={routes.profile}>Mi Cuenta</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={NavLink} to={routes.login} onClick={logout}>Cerrar Sesión</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ))
                }
            </Navbar.Collapse >
        </Navbar >
    )
}
