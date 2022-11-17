import { Link } from "react-router-dom";
import React from "react";
import './NavTab.css';
import '../../Header/Header.css';

export default function NavTab({ isOpen, onClose, onMenuClick }) {
    return (
        <div className={`navtab ${isOpen ? 'navtab_opened' : ''}`}>
            <div className="navtab__container">
                <button type="button" className="navtab__close-button"
                    onClick={onClose} />
                <nav>
                    <ul className="navtab__links">
                        <li className="navtab__link-item">
                            <Link to="/" className="navtab__link" onClick={onMenuClick}>Главная</Link>
                        </li>
                        <li className="navtab__link-item">
                            <Link to="/movies" className="navtab__link navtab__link_underline" onClick={onMenuClick}>Фильмы</Link>
                        </li>
                        <li className="navtab__link-item">
                            <Link to="/saved-movies" className="navtab__link" onClick={onMenuClick}>Сохраненные фильмы</Link>
                        </li>
                    </ul>
                </nav>
                <Link to="/profile" className="navtab__profile" onClick={onMenuClick}>
                    <span className="header__profile-name">Аккаунт</span>
                    <div className="header__profile-logo"></div>
                </Link>
            </div>
        </div>
    )
}
