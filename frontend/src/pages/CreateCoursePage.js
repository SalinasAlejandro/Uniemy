import React, { Component } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import routes from '../helpers/routes';
import "./css/CreateCoursePage.css"

export default class CreateCoursePage extends Component {

    state = {
        title: '',
        image: '',
        description: '',
        price: '',
        user: '',
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const ruta = window.location.pathname.split('/')
        if (ruta.length > 3) {
            let idd = ruta[4];
            const res = await axios.get('http://localhost:4000/api/courses/' + idd);
            this.setState({
                title: res.data.title,
                image: res.data.image,
                description: res.data.description,
                price: res.data.price,
                user: res.data.user,
                editing: true,
                _id: idd
            });

        }
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    onSubmit = async (e) => {
        e.preventDefault();

        if (this.validarDatos()) {
            const newCourse = {
                title: this.state.title,
                image: this.state.image,
                description: this.state.description,
                price: 0,
                school: localStorage.getItem('_id')
            };
            if (this.state.editing) {
                await axios.patch('http://localhost:4000/api/courses/' + this.state._id, newCourse);
                toast.success('Curso editado con éxito');
            } else {
                await axios.post('http://localhost:4000/api/courses/', newCourse);
                this.setState({
                    title: '',
                    image: '',
                    description: '',
                    price: ''
                });
                toast.success('Curso creado con éxito');
                //window.location.href = routes.createLevel;
            }
        }
    }

    validarDatos = () => {
        var todoBien = true;

        if (this.state.title == '') {
            todoBien = false;
            toast.error('Ingrese un título')
        }
        if (this.state.image == '') {
            todoBien = false;
            toast.error('Ingrese una imagen')
        }
        if (this.state.description == '') {
            todoBien = false;
            toast.error('Ingrese una descripción')
        }

        return todoBien;
    }

    render() {
        return (


            <div className="col-md-6 offset-md-3">
                <div className="card card-body" id='tarjeta'>
                    <h4>Crear un curso</h4>

                    <div className="form-group">
                        <input type="text" className='form-control' placeholder='Título del Curso' id='title' name='title' required
                            value={this.state.title}
                            onChange={this.onInputChange} />
                    </div>

                    <div className="form-group">
                        <textarea name="description" className='form-control' placeholder='Descripción del Curso' required
                            value={this.state.description}
                            onChange={this.onInputChange}></textarea>
                    </div>


                    <div className="form-group">
                        <input type="text" className='form-control' placeholder='Imagen' name='image' required
                            value={this.state.image}
                            onChange={this.onInputChange} />
                    </div>

                    <form onSubmit={this.onSubmit}>

                        <button type='submit' className='btnn'>
                            Guardar
                        </button>
                    </form>


                </div>
            </div>

        )
    }
}

/*
                    <div className="form-group">
                        <input type="file" className='form-control' name='image' accept="image/png, image/jpeg" required
                            onChange={this.handleFileChange} />
                    </div>
                    */