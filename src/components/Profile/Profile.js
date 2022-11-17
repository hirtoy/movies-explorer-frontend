import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../utils/validateAutch';
import './Profile.css';

// изменение профиля
export default function Profile({ onSignOut, handleUpdateUser }) {
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        handleUpdateUser(values);
    }

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm]);

    const reqValidate = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

    return (
        <div className="profile">
            <h1 className="profile__title">Привет, ${currentUser.name || ''}!`</h1>
            <form className="profile__form"
                method="post"
                name="profileForm"
                noValidate
                onSubmit={handleSubmit}>

                <div className="profile__form-input-item">

                    <label className="profile__form-input-title">Имя</label>

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
                </div>

                <div className="profile__form-line">{errors.name || ''}</div>

                <div className="profile__form-input-item">
                    <label className="profile__form-input-title">E-mail</label>
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
                </div>

                <span className="profile__form-input-error">{errors.email || ''}</span>

                <button type="submit"
                    className="profile__form-submit-btn"
                    disabled={reqValidate ? true : false}>
                    Редактировать
                </button>
            </form>
            <Link to="/logout" className="profile__logout" onClick={onSignOut}>Выйти из аккаунта</Link>
        </div>
    )
}
