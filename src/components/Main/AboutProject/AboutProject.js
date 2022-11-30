import React from 'react';
import './AboutProject.css';

export default function AboutProject() {
    return (
        <section className="about-project" id="show-more">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__line"></div>
            <div className="about-project__items">

                <div className="about-project__item">
                    <p className="about-project__item-title">Дипломный проект включал 5 этапов</p>
                    <p className="about-project__item-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>

                <div className="about-project__item">
                    <p className="about-project__item-title">На выполнение диплома ушло 5 недель</p>
                    <p className="about-project__item-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className="about-project__time">
                <div className="about-project__time-backend"><span>1 неделя</span></div>
                <div className="about-project__time-frontend"><span>4 недели</span></div>
                <div className="about-project__time-subtitle"><span>Back-end</span></div>
                <div className="about-project__time-subtitle"><span>Front-end</span></div>
            </div>

        </section>
    )
}
