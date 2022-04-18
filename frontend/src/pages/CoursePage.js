import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/CoursePage.css';
import routes from './../helpers/routes';
import useModal from '../hooks/useModal';
import BuyCourseModal from './Modals/BuyCourseModal';
import ReviewModal from './Modals/ReviewModal';

export default function CoursePage() {


  const [isOwner, setIsOwner] = useState();
  const [infoCourse, setInfoCourse] = useState();
  const [infoLevels, setInfoLevels] = useState();
  const [enableLink, setEnableLink] = useState();
  const [isFinished, setIsFinished] = useState(false);
  const [myReview, setMyReview] = useState(false);
  const [courseReviews, setCourseReviews] = useState(false);

  const [isOpenBuyModal, openBuyModal, closeBuyModal] = useModal();
  const [isOpenReviewModal, openReviewModal, closeReviewModal] = useModal();

  useEffect(() => {

    async function getInfoCourse() {
      const idUser = localStorage.getItem('_id');
      let urlElements = window.location.pathname.split('/');
      const res = await fetch(`http://localhost:4000/api/courses/${urlElements[3]}`);
      const infoCourse = await res.json();
      setInfoCourse(infoCourse.data);
      setIsOwner(infoCourse.data.school === idUser);

      const resLevels = await fetch(`http://localhost:4000/api/levels/course/${urlElements[3]}`);
      const infLevels = await resLevels.json();
      setInfoLevels(infLevels.data);

      if (infoCourse.data.school === idUser) {
        setEnableLink(true);
      } else {

        const formData = {
          student: idUser,
          course: infoCourse.data._id
        }
        const resPurchase = await fetch(`http://localhost:4000/api/purchases/getPurchase`, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const purchase = await resPurchase.json();
        if (purchase.success === true) {
          setEnableLink(true);
          finished(infoCourse.data._id);
        } else {
          setEnableLink(false);
        }

      }
    }

    getInfoCourse();

    getAllReviews();
  }, []);

  const getAllReviews = async () => {
    let urlElements = window.location.pathname.split('/');
    const res = await fetch(`http://localhost:4000/api/reviews/reviews/${urlElements[3]}`);
    const allReviews = await res.json();

    if (allReviews.data.length > 0) {
      setCourseReviews(allReviews.data);
    }
  }

  const finished = async (idCourse) => {
    let urlElements = window.location.pathname.split('/');
    const data = {
      student: localStorage.getItem('_id'),
      course: urlElements[3]
    }
    const res = await fetch(`http://localhost:4000/api/certifications/certification/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const existCertif = await res.json();
    if (existCertif.success !== true) {
      setIsFinished(false);
    } else {

      setIsFinished(true);
      const idUser = localStorage.getItem('_id');
      const formData = {
        student: idUser,
        course: idCourse
      }
      const resReview = await fetch(`http://localhost:4000/api/reviews/review`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const review = await resReview.json();
      if (review.success === true) {
        setMyReview(review.data);
      }

    }
  }

  return (
    <>

      <div className="container">

        <h1 className='tituloSeccion' align="center">{infoCourse?.title}</h1>

        <div className="text-center">
          <img src={infoCourse?.image} alt='Imagen del curso' />
        </div>

        <h4>{infoCourse?.description}</h4>

        {
          isOwner === true ? (
            <Link to={routes.editCourse(infoCourse?._id)}>
              <button className='btnCourse'>
                Editar curso
              </button>
            </Link>
          ) : (
            enableLink === true ? (
              <></>
            ) : (
              <button className='btnCourse' onClick={openBuyModal}>
                Comprar Curso
              </button>
            )
          )
        }


        <h2 align="center">Niveles: {infoLevels?.length} nivel(es) en total</h2>

        <ul className='list-group list-group-flush'>
          {
            enableLink === true ? (
              infoLevels?.map(level => (
                <li className='list-group-item'>
                  <Link to={routes.level(infoCourse._id, level._id)}>
                    <h5>Nivel {level.number} {level.title}</h5>
                  </Link>
                </li>
              ))
            ) : (
              infoLevels?.map(level => (
                <li className='list-group-item'>
                  <h5>Nivel {level.number} {level.title}</h5>
                </li>
              ))
            )
          }

        </ul>

      </div>

      {
        isOwner === true ?
          (<></>) : (
            enableLink === false ?
              (<></>) : (
                isFinished === false ? (
                  <>
                    <hr />
                    <h3>Finaliza el curso para poder añadir una reseña :D </h3>
                    <hr />
                  </>
                ) : (
                  myReview === false ? (
                    <>
                      <hr />
                      <button onClick={openReviewModal}>Añadir Reseña</button>
                      <hr />
                    </>
                  ) : (
                    <div>
                      <hr />
                      <h4>Mi Reseña</h4>
                      {
                        myReview?.like === 1 ? (
                          <h5>Like</h5>
                        ) : (
                          <h5>Dislike</h5>
                        )
                      }
                      <p>{myReview?.comment}</p>
                      <button onClick={openReviewModal}>Editar Reseña</button>
                      <hr />
                    </div>
                  )
                )
              )
          )
      }

      <h4>Reseñas del curso</h4>
      {
        courseReviews === false ? (
          <>
            <br />
            <h4>Curso sin reseñas</h4>
            <br />
          </>
        ) : (
          courseReviews?.map(reviewCourse => {
            return reviewCourse.like === 0 ? (
              <>
                <br />
                <img
                  src="/img/dislike.png"
                  alt="Dislike" />
                <h6>{reviewCourse.comment}</h6>
                <br />
              </>
            ) : (
              <>
                <br />
                <img
                  src="/img/like.png"
                  alt="Dislike" />
                <h6>{reviewCourse.comment}</h6>
                <br />
              </>
            )
          })
        )
      }

      <BuyCourseModal
        isOpen={isOpenBuyModal}
        close={closeBuyModal}
        infoCourse={infoCourse}
        purchase={setEnableLink}
      />

      <ReviewModal
        isOpen={isOpenReviewModal}
        close={closeReviewModal}
        infoCourse={infoCourse}
        review={myReview}
        setReview={setMyReview}
        allReviews={getAllReviews}
      />

    </>
  )
}