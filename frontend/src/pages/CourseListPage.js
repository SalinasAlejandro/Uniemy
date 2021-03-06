import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import routes from '../helpers/routes';

export default class CourseListPage extends Component {

    state = {
        courses: []
    }

    componentDidMount() {
        this.getCourses();
    }

    async getCourses() {
        const res = await axios.get('http://localhost:4000/api/courses?filter=title');
        this.setState({ courses: res.data.data });
    }

    render() {
        return (
            <div className="container">
                <div className="row">

                    {
                        this.state.courses.length === 0 ? (
                            <h1>Actualmente no hay cursos :c</h1>
                        ) : (
                            this.state.courses?.map(course => (

                                <div className="col-md-4 p-2" key={course._id}>
                                    <Link className="card" id="curso" to={routes.course(course._id)}>
                                        <div >

                                            <img src={course.image} width="100%" height={200} alt="Imagen del curso" />

                                            <div className="card-title" align="center">
                                                <h5>{course.title}</h5>
                                            </div>
                                            <div className="card-body">
                                                <p>{course.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            ))
                        )
                    }

                </div>
            </div>

        )
    }
}
