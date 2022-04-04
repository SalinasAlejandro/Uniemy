import React, { Component } from 'react'

export default class CoursePage extends Component {
    render() {
        return (
           
       
    <div className="container">
    <h1 className='tituloSeccion' align="center">Título del curso</h1>

     
    <h2>Categoría: Programación web</h2>

   

    <div className="text-center">
        <img src={ require('./img/curso2.png')}/>
    </div>

     

    <h2>Descripción:</h2>

     
    <textarea rows="3" className="form-control" readonly>Aquí debe ir la información del curso.</textarea>

     
    <h2 align="center">Niveles: 3 niveles en total</h2>

    <div className="container">
    <div className="row">
              <div className="col-md-4">
                <div className='card' id="curso">
                    <h3 className="card-title" align="center">Nivel 1: Título del nivel</h3>
                    <div>
                        <label>Haga click en la imagen para ver contendio del nivel: </label>            
                    </div>
                          <a href="/">
                             <img src={ require('./img/curso.png')} width="100%"/>
                           </a>  
                </div>
              </div>

              <div className="col-md-4">
                <div className='card' id="curso">
                    <h3 className="card-title" align="center">Nivel 1: Título del nivel</h3>
                    <div>
                        <label>Haga click en la imagen para ver contendio del nivel: </label>            
                    </div>
                          <a href="/">
                             <img src={ require('./img/curso3.png')}width="100%"/>
                           </a>  
                </div>
              </div>
              <div className="col-md-4">
                <div className='card' id="curso">
                    <h3 className="card-title" align="center">Nivel 1: Título del nivel</h3>
                    <div>
                        <label>Haga click en la imagen para ver contendio del nivel: </label>            
                    </div>
                          <a href="/">
                             <img src={ require('./img/curso4.png')}width="100%"/>
                           </a>  
                </div>
              </div>
              
    </div>
    </div>

    

   
 <form  id="frmAñadirReseña" autocomplete="off" align="center">
 <label>¿Te gustó el curso?</label>
                    <select name="valoracion" id="valoracion">
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                    <br></br>
                    <label>Escribe un comentario</label>
                    <br></br>

                    <textarea name="comentario" id="comentario" cols="30" rows="10"></textarea>
 </form>









</div>

        )
    }
}
