import React from 'react';
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__line"></div>
            <div className="footer__text">
                <p className="footer__copyright">&copy; 2022</p>
                <nav>
                    <ul className="footer__links">
                        <li className="footer__link-item">
                            <a target="_blank" href="https://practicum.yandex.ru/"
                                className="footer__link" rel="noreferrer">Яндекс.Практикум</a>
                        </li>
                        <li className="footer__link-item">
                            <a target="_blank" href="https://github.com/hirtoy"
                                className="footer__link" rel="noreferrer">Github</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}
