const routes = {
    home: '/',
    certificate: (Id) => Id ? `/certificate/${Id}` : '/certificate/:id',
    courses: '/courses',
    course: (Id) => Id ? `/course/course/${Id}` : '/course/course/:id',
    createCourse: '/course/create',
    editCourse: (Id) => Id ? `/course/edit/${Id}` : '/course/edit/:id',
    level: (IdCourse, IdLevel) => IdCourse ? `/levels/${IdCourse}/${IdLevel}` : '/levels/:idCourse/:idLevel',
    createLevel: '/levels/create',
    editLevel: (Id) => Id ? `/levels/edit/${Id}` : '/levels/edit/:id',
    login: '/login',
    register: '/register',
    profile: '/profile'
};

export default routes;