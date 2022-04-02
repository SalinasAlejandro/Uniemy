import React, { Component } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import routes from '../helpers/routes';

export default class CreateLevelPage extends Component {

    state = {
        title: '',
        video: '',
        description: '',
        number: 1,
        course: '',
        courses: [],
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const ruta = window.location.pathname.split('/');
        if (ruta.length > 3) {
            //Editar Nivel
            this.state.editing = true;
        } else {
            const res = await axios.get('http://localhost:4000/api/courses/');
            this.setState({
                courses: res.data.Data.map(user => user),
                course: res.data.Data[0].title
            })
        }
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSelectChange = e => {
        console.log(e.target.value);
    }

    onSubmit = async (e) => {
        e.preventDefault();

        if (this.validarDatos()) {
            const newLevel = {
                title: this.state.title,
                video: this.state.video,
                description: this.state.description,
                number: this.state.number,
                course: this.state.course
            };
            if (this.state.editing) {
                await axios.patch('http://localhost:4000/api/levels/' + this.state._id, newLevel);
                toast.success('Curso editado con éxito');
            } else {
                const level = await axios.post('http://localhost:4000/api/levels/', newLevel);
                this.setState({
                    title: '',
                    video: '',
                    description: '',
                    course: 'no'
                });
                toast.success('Nivel creado con éxito');
                //window.location.href = `/levels/level/${level.data.data.id_}`;
            }
        }
    }

    validarDatos = () => {
        var todoBien = true;

        if (this.state.title == '') {
            todoBien = false;
            toast.error('Ingrese Un título')
        } else if (this.state.title.length < 5) {
            todoBien = false;
            toast.error('El título debe contener al menos 5 cáracteres');
        }
        if (this.state.video == '') {
            todoBien = false;
            toast.error('Ingrese un enlace de vídeo')
        } else if (this.state.video.length < 5) {
            todoBien = false;
            toast.error('Ingrese un enlace válido');
        }
        if (this.state.description == '') {
            todoBien = false;
            toast.error('Ingrese una descripción')
        } else if (this.state.description.length < 5) {
            todoBien = false;
            toast.error('La descripción debe contener al menos 5 cáracteres');
        }

        if (this.state.course.length != 24) {
            todoBien = false;
            toast.error('Seleccione un curso');
        }

        return todoBien;
    }

    render() {
        return (


            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear un nivel</h4>

                    <div className="form-group">
                        <select
                            name="course"
                            className='form-control'
                            onChange={this.onInputChange}
                            value={this.state.course}
                        >
                            <option value="no">Seleccione un curso</option>
                            {
                                this.state.courses.map(courseP =>
                                    <option value={courseP._id} key={courseP._id}>
                                        {courseP.title}
                                    </option>)
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text" className='form-control' placeholder='Title' id='Título del nivel' name='title' required
                            value={this.state.title}
                            onChange={this.onInputChange} />
                    </div>

                    <div className="form-group">
                        <textarea name="description" className='form-control' placeholder='Descripción del nivel' required
                            value={this.state.description}
                            onChange={this.onInputChange}></textarea>
                    </div>


                    <div className="form-group">
                        <input type="text" className='form-control' placeholder='Enlace del vídeo' name='video' required
                            value={this.state.video}
                            onChange={this.onInputChange} />
                    </div>

                    <form onSubmit={this.onSubmit}>

                        <button type='submit' className='btn btn-primary'>
                            Guardar
                        </button>
                    </form>


                </div>
            </div>

        )
    }
}
