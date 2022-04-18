import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from './../helpers/routes';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import certificadoPDF from './certificado.pdf';

export default function CertificatePages() {

    const [infoCourse, setInfoCourse] = useState();
    const [infoUser, setInfoUser] = useState();
    const [infoSchool, setInfoSchool] = useState();

    useEffect(() => {
        async function getInfo() {
            let urlElements = window.location.pathname.split('/');
            const data = {
                student: localStorage.getItem('_id'),
                course: urlElements[2]
            }
            const res = await fetch(`http://localhost:4000/api/certifications/certification/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const existCertif = await res.json();

            const resCourse = await fetch(`http://localhost:4000/api/courses/${existCertif.data.course}`);
            const infCourse = await resCourse.json();
            setInfoCourse(infCourse.data);

            const resUser = await fetch(`http://localhost:4000/api/users/${existCertif.data.student}`);
            const infUser = await resUser.json();
            setInfoUser(infUser.data);

            const resSchool = await fetch(`http://localhost:4000/api/users/${infCourse.data.school}`);
            const infSchool = await resSchool.json();
            setInfoSchool(infSchool.data);
        }
        setTimeout(function () {
            getInfo();
        }, 2000);
    }, []);

    const download = () => {
        const nameUser = capitalize(infoUser.name);
        const nameCourse = capitalize(infoCourse.title);
        const nameSchool = capitalize(infoSchool.name);
        generatePDF(nameUser, nameCourse, nameSchool);
    };


    const capitalize = (str, lower = false) =>
        (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
            match.toUpperCase()
        );

    const generatePDF = async (name, nameCurso, nameMaestro) => {
        const existingPdfBytes = await fetch(certificadoPDF).then((res) =>
            res.arrayBuffer()
        );

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        // Get the first page of the document
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];


        // Draw a string of text diagonally across the first page
        firstPage.drawText(name, {
            x: 250,
            y: 400,
            size: 45,
            color: rgb(1, 1, 1),
        });
        firstPage.drawText(nameCurso, {
            x: 50,
            y: 225,
            size: 30,
            color: rgb(1, 1, 1),
        });
        firstPage.drawText(nameMaestro, {
            x: 560,
            y: 115,
            size: 15,
            color: rgb(1, 1, 1),
        });


        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();

        var file = new File(
            [pdfBytes],
            `Certificado${name}en${nameCurso}.pdf`, {
            type: "application/pdf;charset=utf-8",
        }
        );
        saveAs(file);
    }

    return (
        <>
            <header>
                <a href="perfil.php"><img src={require('./img/logo.png')} alt='Logo' className="logo" /></a>
                <h1><strong>Felicitaciones </strong> </h1>
                <h4>UNIEMY</h4>
                <h4>ortorga su certificado por haber concluido el curso </h4>
            </header>

            <main>
                <button onClick={download}>Descargar Certificado</button>
                <Link to={routes.course(infoCourse?._id)}>
                    <button>Ir al curso</button>
                </Link>
            </main>
        </>
    )
}