import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../utils/validateAutch';
import './Profile.css';

// изменение профиля
export default function Profile({ loggedIn, onSignOut, handleUpdateUser }) {
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);
    const [message, setMessage] = useState('');

    const handleClick = (e) => {
        if (loggedIn) {
            e.preventDefault();
            onSignOut()
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleUpdateUser(values)
        .then(() => {
            setMessage('Данные сохранены');
        })
        .catch((err) => {
            console.log(err);
            setMessage('Ошибка сохранения данных');
        });
        setTimeout(() => setMessage(''), 3000);
    }

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, true);
        }
    }, [currentUser, resetForm]);

    const reqValidate = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

    return (
        <div className="profile">
            <form className="profile__form"
                method="post"
                name="profileForm"
                noValidate
                onSubmit={handleSubmit}>
                <h1 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h1>

                <div className="profile__form-input-item">

                    <label className="profile__form-input-label">
                        <span className="profile__form-input-title">Имя </span>

                        <input value={values.name || ''}
                            onChange={handleChange}
                            name="name"
                            type="text"
                            placeholder="Имя"
                            className="profile__form-input"
                            minLength="2"
                            maxLength="30"
                            id="profile-name-input"
                            pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
                            required />

                        <span className="profile__form-input-error">{errors.name || ''}</span>
                    </label>

                    <span className="profile__form-line" />

                    <label className="profile__form-input-label">
                        <span className="profile__form-input-title">E-mail</span>
                        <input onChange={handleChange}
                            value={values.email || ''}
                            name="email"
                            type="email"
                            placeholder="email"
                            className="profile__form-input"
                            minLength="2"
                            maxLength="30"
                            id="profile-email-input"
                            required />

                        <span className="profile__form-input-error">{errors.email || ''}</span>
                    </label>
                </div>

                <div className="profile__form-submit-item">
                <span className="profile__form-input-message">{message}</span>
                    <button type="submit"
                        className= {`profile__form-submit-btn ${reqValidate ? 'profile__form-submit-btn_disabled' : ''}`}
                        disabled={reqValidate ? true : false}>
                        Редактировать
                    </button>
                    <Link to="/logout" className="profile__logout" onClick={handleClick}>Выйти из аккаунта</Link>
                </div>

            </form>
        </div >
    )
}
