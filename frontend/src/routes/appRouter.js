import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '../helpers/routes';
import HomePages from '../pages/HomePages';
import CertificatePages from '../pages/CertificatePages';
import CourseListPage from '../pages/CourseListPage';
import CoursePage from '../pages/CoursePage';
import CreateCoursePage from '../pages/CreateCoursePage';
import LevelPage from '../pages/LevelPage';
import CreateLevelPage from '../pages/CreateLevelPage';
import LoginPages from '../pages/LoginPages';
import RegisterPages from '../pages/RegisterPages';
import UserPage from '../pages/UserPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import roles from '../helpers/roles';
import NotFoundPages from '../pages/NotFoundPages';

export default function appRouter() {
    return (
        <Routes>

            <Route path={routes.home} element={<HomePages />} />
            <Route path={routes.courses} element={<CourseListPage />} />


            <Route path={routes.login} element={<PublicRoute />}>
                <Route path={routes.login} element={<LoginPages />} />
            </Route>
            <Route path={routes.register} element={<PublicRoute />}>
                <Route path={routes.register} element={<RegisterPages />} />
            </Route>


            <Route path={routes.certificate} element={<CertificatePages />} />

            <Route path={routes.course()} element={<CoursePage />} />

            <Route path={routes.createCourse} element={<CreateCoursePage />} />

            <Route path={routes.editCourse()} element={<CreateCoursePage />} />

            <Route path={routes.level()} element={<LevelPage />} />

            <Route path={routes.createLevel} element={<CreateLevelPage />} />

            <Route path={routes.editLevel()} element={<CreateLevelPage />} />

            <Route path={routes.profile} element={<UserPage />} />

            <Route path='*' element={<NotFoundPages />} />
        </Routes>
    )
}


/*
            <Route exact path={routes.certificate} element={<PrivateRoute />}>
                <Route path={routes.certificate} element={<CertificatePages />} />
            </Route>
*/