const routes = {
    home: '/',
    certificate: '/certificate',
    courses: '/courses',
    course: (Id) => Id ? `/course/course/:${Id}` : '/course/course/:id',
    createCourse: '/course/create',
    editCourse: (Id) => Id ? `/course/edit/:${Id}` : '/course/edit/:id',
    level: (Id) => Id ? `/levels/level/:${Id}` : '/levels/level/:id',
    createLevel: '/levels/create',
    editLevel: (Id) => Id ? `/levels/edit/:${Id}` : '/levels/edit/:id',
    login: '/login',
    register: '/register',
    profile: '/profile'
};

export default routes;