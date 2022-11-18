import React from 'react';
import './AboutMe.css';
import avatar from '../../../images/avatar.jpg';

export default function AboutMe() {
    return (
        <section className="aboutme">
            <h2 className="aboutme__title">Студент</h2>
            <div className="aboutme__line"></div>
            <div className="aboutme__info">

                <div className="aboutme__info-detail">
                    <p className="aboutme__info-name">Валерия</p>
                    <p className="aboutme__info-task">Фронтенд-разработчик, 22 года</p>
                    <p className="aboutme__info-about">Мое первое знакомство с программированием произошло в 2012 году по игре в minecraft, там я создавала мобов написанием их на языку Java, сейчас изучаю Java-script.</p>

                    <a target="_blank" href="https://github.com/hirtoy/movies-explorer-frontend"
                        className="aboutme__info-github" rel="noreferrer">Github</a>
                </div>

                <img alt="Студент Воробьева В.В." className="aboutme__image" src={avatar} />
            </div>
        </section>
    )
}
