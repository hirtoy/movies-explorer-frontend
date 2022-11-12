import React from 'react';
import './Techs.css';

export default function Techs() {
    return (
        <section className="techs">
            <h2 className="techs__title">Технологии</h2>
            <div className="techs__line"></div>
            <div className="techs__items">
                <p className="techs__item-title">7 технологий</p>
                <p className="techs__item-subtitle">
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
                <ul className="techs__item-technics">
                    <li className="techs__item-value">HTML</li>
                    <li className="techs__item-value">CSS</li>
                    <li className="techs__item-value">JS</li>
                    <li className="techs__item-value">React</li>
                    <li className="techs__item-value">Git</li>
                    <li className="techs__item-value">Express.js</li>
                    <li className="techs__item-value">mongoDB</li>
                </ul>
            </div>
        </section>
    )
}
