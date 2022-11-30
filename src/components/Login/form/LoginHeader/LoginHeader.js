import React from 'react';
import {Link} from "react-router-dom";
import './LoginHeader.css';
import '../../../Header/Header.css';

export default function LoginHeader({title}) {
    return (
        <div className="login-header">
            <Link to="/" className="header__logo header__logo_login-header"></Link>
            <h1 className="login-header__title">{title}</h1>
        </div>
    )
}
