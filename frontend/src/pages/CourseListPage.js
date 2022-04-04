import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class CourseListPage extends Component {

    state = {
        courses: []
    }

    componentDidMount() {
        this.getCourses();
    }

    async getCourses() {
        const res = await axios.get('http://localhost:4000/api/courses/');
        this.setState({ courses: res.data.Data });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        this.state.courses.map(course => (

                            <div className="col-md-4 p-2" key={course._id}>
                                <Link className="card" id="curso" to={"/course/course/" + course._id}>
                                    <div className='card-body'>

                                        <img src={course.image} width="100%" height={150} alt="Imagen del curso" />

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
                    }
                </div>
            </div>

        )
    }
}
