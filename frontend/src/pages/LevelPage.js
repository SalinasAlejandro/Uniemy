import React, { Component } from 'react'
import "./css/LevelPage.css"

export default class LevelPage extends Component {
    render() {
        return (


            /////////

            <div className='container'>
                <h1 className='tituloSeccionN' align="center">Título del nivel</h1>
                <a href="/">
                    <h5>Realizado por: </h5>
                </a>

                <div className="video">
                    <video margin-left="100%" align="center" width="320" height="240" controls>

                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className="recursos">
                    <h3>Recursos Adicionales *Por parte del CREADOR*</h3>


                    <span class="btn btn-primary" data-toggle="modal" data-target="#modalAgregarArchivos">
                        <span class="fas fa-plus-circle"></span>Agregar archivos
                    </span>

                    <div id="tablaMultimedia"></div>
                </div>

                <div class="container">
                    <button id="btnFinalizarCurso" class="finalizarCurso">
                        <i class="fas fa-check-circle"></i> Finalizar Curso
                    </button>
                </div>



                <a class="btnN" href="nivel.php" role="button">Siguiente nivel</a>

            </div>

        )

    }
}
