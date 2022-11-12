import React from 'react';
import './Promo.css';

export default function Promo() {
    return (
        <section className="promo">
            <div className="promo__main">
                <div className="promo__text">
                    <h1 className="promo__title">Учебный проект студента факультета <br />Веб-разработки.</h1>
                    <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                </div>
                <div className="promo__logo"></div>
            </div>
            <div className="promo__more">
                <a href="#show-more">
                    <button type="button" className="promo__button">Узнать больше</button>
                </a>
            </div>
        </section>
    )
}
