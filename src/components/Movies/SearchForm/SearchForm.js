import React from 'react';
import './SearchForm.css';

export default function SearchForm() {
    return (
        <section className="searchform">
            <form className="searchform__items">
                <label className="searchform__input-item">
                    <input type="text" className="searchform__input" placeholder="Фильм" required></input>
                    <button type="button" className="searchform__input-submit">Поиск</button>
                </label>
                <div className="searchform__checkbox-group">
                    <label className="searchform__checkbox-item">
                        <input type="checkbox"/>
                        <span className="searchform__checkbox-slider"></span>
                    </label>
                    <p className="searchform__checkbox-title">Короткометражки</p>
                </div>
            </form>
            <div className="searchform__line"></div>
        </section>
    )
}
