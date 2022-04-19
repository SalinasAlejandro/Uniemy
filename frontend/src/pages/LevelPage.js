import React, { useEffect, useState } from 'react';
import "./css/LevelPage.css";
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import routes from '../helpers/routes';
import { toast } from 'react-toastify';

export default function LevelPage() {

    const [isOwner, setIsOwner] = useState();
    const [infoLevel, setInfoLevel] = useState();
    const [nLevels, setNLevels] = useState();
    const [cantProgress, setCantProgress] = useState();
    const [prevLev, setPrevLev] = useState();
    const [nextLev, setNextLev] = useState();

    const reload = async (url) => {
        const idUser = localStorage.getItem('_id');
        const res = await fetch(`http://localhost:4000/api/levels/${url}`);
        const infLevel = await res.json();
        setInfoLevel(infLevel.data);
        setIsOwner(infLevel.data.school === idUser);

        const resLevels = await fetch(`http://localhost:4000/api/levels/course/${infLevel.data.course}`);
        const levelsN = await resLevels.json();
        setNLevels(levelsN.data.length);

        if (infLevel.data.number > 1) {
            const prevLevel = {
                course: infLevel.data.course,
                number: (infLevel.data.number - 1)
            }
            const resPrev = await fetch(`http://localhost:4000/api/levels/level/PrevNext`, {
                method: 'POST',
                body: JSON.stringify(prevLevel),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const levelPrev = await resPrev.json();
            setPrevLev(levelPrev.data[0]._id);
        }

        if (levelsN.data.length !== infLevel.data.number) {
            const nextLevel = {
                course: infLevel.data.course,
                number: (infLevel.data.number + 1)
            }
            const resNext = await fetch(`http://localhost:4000/api/levels/level/PrevNext`, {
                method: 'POST',
                body: JSON.stringify(nextLevel),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const levelNext = await resNext.json();
            setNextLev(levelNext.data[0]._id)
        }
    }

    useEffect(() => {

        function initInfo() {
            let urlElements = window.location.pathname.split('/');
            reload(urlElements[3]);
            infoProgress();
        }

        initInfo();
    }, []);

    const infoProgress = async () => {

        const idUser = localStorage.getItem('_id');
        let urlElements = window.location.pathname.split('/');
        const res = await fetch(`http://localhost:4000/api/progress/`);
        const progress = await res.json();

        var nProgress = 0;
        var existThis = false;
        if (progress.success === true) {
            progress.data.map(progres => {
                if (progres.student === idUser && progres.course === urlElements[2]) {
                    nProgress++;
                    if (progres.level === urlElements[3]) {
                        existThis = true;
                    }
                }
            })
        }

        if (existThis === false) {
            const formData = {
                student: idUser,
                course: urlElements[2],
                level: urlElements[3]
            }
            const resCreated = await fetch(`http://localhost:4000/api/progress/`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const isCreatedProgress = await resCreated.json();
            if (isCreatedProgress.success === true)
                nProgress++;
        }
        setCantProgress(nProgress);

    }

    const newUrl = () => {
        setTimeout(function () {
            let urlElements = window.location.pathname.split('/');
            reload(urlElements[3]);
            infoProgress();
        }, 300);
    }

    const finishCourse = async () => {
        const data = {
            student: localStorage.getItem('_id'),
            course: infoLevel.course
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

            toast.promise(async () => {
                const resisCreated = await fetch(`http://localhost:4000/api/certifications/`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const isCreated = await resisCreated.json();

                if (isCreated.success !== true) {
                    toast.error(isCreated.message);
                } else {
                    toast.success("Felicidades :D");
                }
            }, {
                pending: 'Finalizando curso...'
            });

        }
    }

    return (
        <div className='container'>
            <h1 className='tituloSeccionN' align="center">{infoLevel?.title}</h1>
            <Link to={routes.course(infoLevel?.course)}className="volver">
                Volver al curso
            </Link>
            <ReactPlayer
                url={infoLevel?.video}
                width='100%'
                height='600px'
                controls
            />

            <p>{infoLevel?.description}</p>

          

            {
                isOwner === true ? (
                    <Link to={routes.editLevel(infoLevel?._id)}>
                        <button className="finalizarCurso">
                            Editar Nivel
                        </button>
                    </Link>
                ) : (
                    cantProgress === nLevels ? (
                        <Link className="finalizarCurso" to={routes.certificate(infoLevel?.course)} onClick={finishCourse}>
                            Finalizar Curso
                        </Link>
                    ) : (<></>)
                )
            }

<br></br>
            {
                infoLevel?.number !== 1 ? (
                    <Link className="prev" to={routes.level(infoLevel?.course, prevLev)} onClick={newUrl}>
                        Nivel Anterior
                    </Link>
                ) : (<></>)
            }
            {
                nLevels !== infoLevel?.number ? (
                    <Link className="next" to={routes.level(infoLevel?.course, nextLev)} onClick={newUrl} >
                        Siguiente nivel
                    </Link>
                ) : (<></>)
            }

        </div>
    )
}