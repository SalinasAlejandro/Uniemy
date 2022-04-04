import React from "react";
import "../css/Card.css"
import { TitleCard } from './stylesComponents';

const Card = () => {
   return (
      <div className="Seccion">
         <TitleCard>{'CURSOS NUEVOS'}</TitleCard>
         <div className="container">
            <div className="row">
               <div className="col-md-4">
                  <div className='card' id="curso">
                     <img src={require('../img/curso2.png')} />
                     <div className='card-body'>
                        <h4 className="card-title" align="center">Curso1</h4>
                        <p>lorem sndakndkjandjkansdkasdm,</p>
                     </div>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className='card' id="curso">
                     <img src={require('../img/curso3.png')} />
                     <div className='card-body'>
                        <h4 className='card-title' align="center">Curso2</h4>
                        <p>lorem sndakndkjandjkansdkasdm,</p>
                     </div>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className='card' id="curso">
                     <img src={require('../img/curso4.png')} />
                     <div className='card-body'>
                        <h4 className='card-title' align="center">Curso3</h4>
                        <p>lorem sndakndkjandjkansdkasdm,</p>
                     </div>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className='card' id="curso">
                     <img src={require('../img/curso.png')} />
                     <div className='card-body'>
                        <h4 className='card-title' align="center">Curso3</h4>
                        <p>lorem sndakndkjandjkansdkasdm,</p>
                     </div>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className='card' id="curso">
                     <img src={require('../img/curso.png')} />
                     <div className='card-body'>
                        <h4 className='card-title' align="center">Curso3</h4>
                        <p>lorem sndakndkjandjkansdkasdm,</p>
                     </div>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className='card' id="curso">
                     <img src={require('../img/curso.png')} />
                     <div className='card-body'>
                        <h4 className='card-title' align="center">Curso3</h4>
                        <p>lorem sndakndkjandjkansdkasdm,</p>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
   )
}
export default Card