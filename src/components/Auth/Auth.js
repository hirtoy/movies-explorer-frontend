import {Link, useHistory} from 'react-router-dom';
import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import '../Header/Header.css';

export default function Auth({loggedIn, onMenuClick, email}) {
    const history = useHistory();

    const user = React.useContext(CurrentUserContext);

    const handleLoginClick = () => {
        history.push('/signin');
    };

    function handleClick(e) {
        e.preventDefault();
        onMenuClick();
    }

    return (
        <div className="header__profile-links">
            {!loggedIn && <Link to="/signup" className="header__signup">Регистрация</Link>}
            {!loggedIn && <button type="button" className="header__signin" onClick={handleLoginClick}>Войти</button>}
            {loggedIn &&
                <Link to="/profile" className="header__profile header__profile-none">
                    <span className="header__profile-name">{user ? user.email : 'Аккаунт'}</span>
                    <div className="header__profile-logo"></div>
                </Link>
            }
            {loggedIn &&
                <span className="header__menu" onClick={handleClick}></span>
            }
        </div>
    )
}
