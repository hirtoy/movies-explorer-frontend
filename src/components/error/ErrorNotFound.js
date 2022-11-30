import React from 'react';
// import {Link} from 'react-router-dom';
import './ErrorNotFound.css';

export default function ErrorNotFound({ goBack }) {
    return (
        <div className="not-found">
            <h1 className="not-found__title">404</h1>
            <h2 className="not-found__subtitle">Страница не найдена</h2>
            <button onClick={goBack} className="not-found__back-link">Назад</button>
        </div>
    )
}
