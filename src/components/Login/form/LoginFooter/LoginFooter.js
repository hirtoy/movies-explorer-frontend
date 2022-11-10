import React from 'react';
import './LoginFooter.css';
import {Link} from "react-router-dom";

export default function LoginFooter({title, linkText, link}) {
    return (
        <div className="login-footer">
            <p className="login-footer__title">{title}</p>
            <Link to={link} className="login-footer__link">{linkText}</Link>
        </div>
    )
}
