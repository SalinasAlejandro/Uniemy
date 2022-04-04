import React, { Component } from 'react'
import InicioCarrusel from "./Componentes/Carrusel";
import Card from "./Componentes/Card";
import "./css/HomePages.css"

export default class HomePages extends Component {
    render() {
        return (
            <div className='Paginicio'>

                <InicioCarrusel />
                <Card />

            </div>
        )
    }
}
