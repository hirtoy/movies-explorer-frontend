/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import LoginHeader from '../Login/form/LoginHeader/LoginHeader';
import LoginFooter from '../Login/form/LoginFooter/LoginFooter';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../utils/validateAutch';
import './Register.css';

export default function Register({ onRegister }) {
    const currentUser = useContext(CurrentUserContext);
    const [message, setMessage] = useState('');
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
    function handleSubmit(e) {
        e.preventDefault();
        onRegister(values).catch((err) => {
            console.log(err);
            if (err === 'Ошибка: 409') {
                setMessage('Пользователь с таким email уже существует');
            }
        })

        setTimeout(() => setMessage(''), 3000);
    }

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm]);

    const reqValidate = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

    return (
        <div className="register">
            <LoginHeader title={'Добро пожаловать!'} />
            <form className="register__form" method="post" name="registerUserForm" onSubmit={handleSubmit}
                noValidate>
                <div className="register_form-filed">
                    <label className="register_form-filed-input-title">Имя</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Имя"
                        onChange={handleChange}
                        className={`register_form-filed-input ${errors.name && 'register_form-filed-input_failed-validation'}`}
                        minLength="2" maxLength="30" id={`profile-name-input`}
                        required
                        value={values.name || ''}
                        pattern="^[A-Za-zА-Яа-яЁё /s -]+$" />
                    {errors.name && 
                    <span className="register_form-filed-input-error">{errors.name || ''}</span>}
                </div>

                <div className="register_form-filed">
                    <label className="register_form-filed-input-title">E-mail</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="pochta@yandex.ru"
                        onChange={handleChange}
                        className={`register_form-filed-input ${errors.email && 'register_form-filed-input_failed-validation'}`}
                        minLength="2" maxLength="30" id={`profile-email-input`}
                        required
                        value={values.email || ''} />
                    {errors.email &&
                        <span className="register_form-filed-input-error">{errors.email || ''}</span>}
                </div>

                <div className="register_form-filed">
                    <label className="register_form-filed-input-title">Пароль</label>
                    <input
                        name="password"
                        type="password"
                        placeholder=""
                        onChange={handleChange}
                        className={`register_form-filed-input ${errors.password && 'register_form-filed-input_failed-validation'}`}
                        minLength="2" maxLength="30" id={`profile-password-input`}
                        required
                        value={values.password || ''} />
                    {errors.password &&
                        <span className="register_form-filed-input-error">{errors.password || ''}</span>}
                </div>

                <div className="register_form-submit__item">
                    <span className="register_form-filed-input-error">{message}</span>
                    <button type="submit" className={`register_form-submit ${reqValidate && 'register_form-submit_disabled'}`} disabled={!isValid}>
                        Зарегистрироваться
                    </button>
                </div>
            </form>
            <LoginFooter title={'Уже зарегистрированы?'} linkText={'Войти'} link={'/signin'} />
        </div>
    )
}