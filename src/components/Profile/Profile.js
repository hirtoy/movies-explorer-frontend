import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

// изменение профиля
export default function Profile() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    return (
        <div className="profile">
            <h1 className="profile__title">Привет, Василий!</h1>
            <form className="profile__form" method="post" name="profileForm"
                noValidate>

                <div className="profile__form-input-item">

                    <label className="profile__form-input-title">Имя</label>

                    <input value={name || 'Василий'}
                        onChange={handleChangeName}
                        name="name"
                        type="text"
                        placeholder="Имя"
                        className="profile__form-input"
                        minLength="2"
                        maxLength="30"
                        id="profile-name-input"
                        required />
                </div>

                <div className="profile__form-line"></div>

                <div className="profile__form-input-item">
                    <label className="profile__form-input-title">E-mail</label>
                    <input value={email || 'pochta@yandex.ru'}
                        onChange={handleChangeEmail}
                        name="email"
                        type="email"
                        placeholder="email"
                        className="profile__form-input"
                        minLength="2"
                        maxLength="30"
                        id="profile-email-input"
                        required />
                </div>

                <span className="profile__form-input-error"></span>

                <button type="submit" className="profile__form-submit-btn">
                    Редактировать
                </button>
            </form>
            <Link to="/logout" className="profile__logout">Выйти из аккаунта</Link>
        </div>
    )
}
