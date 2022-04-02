import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import routes from '../helpers/routes';

export default function PublicRoute(props) {

    const { isLogged } = useAuth();

    if (isLogged()) return <Navigate to={routes.profile} />;

    return <Outlet {...props} />;

}
