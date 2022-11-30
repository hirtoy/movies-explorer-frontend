import React from 'react';
import Auth from '../Auth/Auth';
import {Link} from "react-router-dom";
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import './Header.css';

export default function Header({loggedIn, aboutPage, onMenuClick}) {
    return (
        <header className={`header ${aboutPage && 'header__backraund'}`}>
            <Link to="/" className="header__logo"></Link>

            {loggedIn && <HeaderNavigation />}
            
            <Auth loggedIn={loggedIn} onMenuClick={onMenuClick}/>
        </header>
    )
}
