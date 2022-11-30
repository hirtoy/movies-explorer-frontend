import {Link} from 'react-router-dom';
import React from 'react';
import '../Header/Header.css';

export default function HeaderNavigation() {
    return (
        <nav className="header__nav">
            <ul className="header__links">
                
                <li className="header__link-item">
                    <Link to="/movies" className="header__link">Фильмы</Link>
                </li>

                <li className="header__link-item">
                    <Link to="/saved-movies" className="header__link">Сохраненные фильмы</Link>
                </li>

            </ul>
        </nav>
    )
}
