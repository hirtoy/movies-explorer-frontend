import React from 'react';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import Auth from '../Auth/Auth';
import {Link} from "react-router-dom";
import './Header.css';

function Header({loggedIn, aboutPage, onClick}) {
    return (
        <header className={`header ${aboutPage && 'header__backraund'}`}>
            <Link to="/" className="header__logo"></Link>
            <HeaderNavigation />
            <Auth loggedIn={loggedIn} onClick={onClick}/>
        </header>
    )
}

export default Header;