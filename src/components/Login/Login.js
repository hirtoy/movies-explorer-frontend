/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import LoginHeader from './form/LoginHeader/LoginHeader';
import useFormWithValidation from '../../utils/validateAutch';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import LoginFooter from './form/LoginFooter/LoginFooter';
import './Login.css';
import '../Register/Register.css';

export default function Login({ onLogin }) {
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(values);
    }

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, resetForm]);

    const reqValidate = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

    return (
        <div className="login">
            <LoginHeader title={'Рады видеть!'} />

            <form className="login__form"
                method="post"
                name="loginForm"
                noValidate
                onSubmit={handleSubmit}>

                <div className="register_form-filed">

                    <label className="register_form-filed-input-title">E-mail</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="pochta@yandex.ru"
                        className={`register_form-filed-input ${errors.email && 'register_form-filed-input_failed-validation'}`}
                        minLength="2" maxLength="30" id={`profile-email-input`}
                        required
                        onChange={handleChange}
                        value={values.email || ''} />
                    {errors.email &&
                        <span className="register_form-filed-input-error">{errors.email || ''}</span>}
                </div>

                <div className="register_form-filed">
                    <label className="register_form-filed-input-title">Пароль</label>

                    <input
                        type="password"
                        name="password"
                        placeholder=""
                        className={`register_form-filed-input ${errors.password && 'register_form-filed-input_failed-validation'}`}
                        minLength="2" maxLength="30" id={`profile-password-input`}
                        required
                        onChange={handleChange}
                        value={values.password || ''} />

                    {errors.password &&
                        <span className="register_form-filed-input-error">{errors.password || ''}</span>}
                </div>

                <div className="register_form-submit__item">
                    <span className="register_form-filed-input-error"></span>
                    <button type="submit" className={`register_form-submit ${reqValidate && 'register_form-submit_disabled'}`} disabled={!isValid}>
                        Войти
                    </button>
                </div>

            </form>

            <LoginFooter title={'Ещё не зарегистрированы?'} linkText={'Регистрация'} link={'/signup'} />
        </div>
    )
}
