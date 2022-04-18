import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../helpers/routes";
import "../css/Card.css";
import { TitleCard } from './stylesComponents';

const Card = () => {

   const [newCourses, setNewCourses] = useState();
   const [sellerCourses, setSellerCourses] = useState();
   const [freeCourses, setFreeCourses] = useState();

   useEffect(() => {
      async function getNewsCourses() {
         const res = await fetch(`http://localhost:4000/api/courses?size=6&filter=date`);
         const hasNewCourses = await res.json();

         if (hasNewCourses.data.length > 0)
            setNewCourses(hasNewCourses.data.map(courses => courses));
      }
      async function getSellersCourses() {
         const res = await fetch(`http://localhost:4000/api/courses?size=6&filter=sellers`);
         const hasSellerCourses = await res.json();

         if (hasSellerCourses.data.length > 0)
            setSellerCourses(hasSellerCourses.data.map(courses => courses));
      }
      async function getFreeCourses() {
         const res = await fetch(`http://localhost:4000/api/courses?size=6&filter=free`);
         const hasFreeCourses = await res.json();

         if (hasFreeCourses.data.length > 0)
            setFreeCourses(hasFreeCourses.data.map(courses => courses));
      }

      getNewsCourses();
      getSellersCourses();
      getFreeCourses();
   }, []);

   return (

      <div className="Seccion">

         <TitleCard>{'Más recientes'}</TitleCard>
         <div className="container">
            <div className="row">
               {
                  newCourses === undefined ? (
                     <h2>No hay cursos :c</h2>
                  ) : (

                     newCourses.map(course =>
                        <div div className="col-md-4">
                           <Link className="card" id="curso" to={routes.course(course._id)}>
                              <div className='card' id="curso">
                                 <img src={course.image} alt='Imagen del curso' />
                                 <div className='card-body'>
                                    <h4 className='card-title' align="center">{course.title}</h4>
                                    <p>{course.description}</p>
                                 </div>
                              </div>
                           </Link>
                        </div>
                     )
                  )
               }
            </div>
         </div >

         <TitleCard>{'Más vendidos'}</TitleCard>
         <div className="container">
            <div className="row">
               {
                  sellerCourses === undefined ? (
                     <h2>No hay cursos :c</h2>
                  ) : (

                     sellerCourses.map(course =>
                        <div div className="col-md-4">
                           <Link className="card" id="curso" to={routes.course(course._id)}>
                              <div className='card' id="curso">
                                 <img src={course.image} alt='Imagen del curso' />
                                 <div className='card-body'>
                                    <h4 className='card-title' align="center">{course.title}</h4>
                                    <p>{course.description}</p>
                                 </div>
                              </div>
                           </Link>
                        </div>
                     )
                  )
               }
            </div>
         </div >

         <TitleCard>{'Gratis'}</TitleCard>
         <div className="container">
            <div className="row">
               {
                  freeCourses === undefined ? (
                     <h2>No hay cursos :c</h2>
                  ) : (

                     freeCourses.map(course =>
                        <div div className="col-md-4">
                           <Link className="card" id="curso" to={routes.course(course._id)}>
                              <div className='card' id="curso">
                                 <img src={course.image} alt='Imagen del curso' />
                                 <div className='card-body'>
                                    <h4 className='card-title' align="center">{course.title}</h4>
                                    <p>{course.description}</p>
                                 </div>
                              </div>
                           </Link>
                        </div>
                     )
                  )
               }
            </div>
         </div >

      </div >

   )

}

export default Card;