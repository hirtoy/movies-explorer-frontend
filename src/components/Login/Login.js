/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import LoginHeader from './form/LoginHeader/LoginHeader';
// import LoginForm from './form/LoginForm/LoginForm';
// import LoginSubmit from './form/LoginSubmit/LoginSubmit';
import LoginFooter from './form/LoginFooter/LoginFooter';
import './Login.css';
import '../Register/Register.css';

export default function Login({ onLogin }) {
    const [message, setMessage] = useState('');
    const user = React.useContext(CurrentUserContext);
    const history = useHistory();
    const { register, handleSubmit,
        formState: { errors, isValid } } = useForm({ mode: "onChange" });
    const onSubmit = (data) => {
        onLogin(data).catch((err) => {
            console.log(err);
            if (err === 'Ошибка: 400') {
                setMessage('Почта или пароль введен неверно');
            }
            if (err === 'Ошибка: 401') {
                setMessage('Неверная почта или пароль');
            }
        });
        setTimeout(() => setMessage(''), 3000);
    }

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            history.push('/');
        }
    }, [user]);

    return (
        <div className="login">
            <LoginHeader title={'Рады видеть!'} />
            <form className="login__form"
                method="post"
                name="loginUserForm"
                noValidate
                onSubmit={handleSubmit(onSubmit)}>
                <div className="register_form-filed">
                    <label className="register_form-filed-input-title">E-mail</label>
                    <input type="email"
                        placeholder="pochta@yandex.ru"
                        className={`register_form-filed-input ${errors?.email && 'register_form-filed-input_failed-validation'}`}
                        minLength="2" maxLength="30" id={`profile-email-input`}
                        required
                        {...register('email', {
                            required: 'Поле обязательно к заполнению',
                            pattern: {
                                value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
                                message: 'Неправильный формат email'
                            }
                        })} />
                    {errors?.email && <span className="register_form-filed-input-error">{errors?.email?.message}</span>}
                </div>
                <div className="register_form-filed">
                    <label className="register_form-filed-input-title">Пароль</label>
                    <input type="password"
                        placeholder=""
                        className={`register_form-filed-input ${errors?.password && 'register_form-filed-input_failed-validation'}`}
                        minLength="2" maxLength="30" id={`profile-password-input`}
                        required
                        {...register('password', {
                            required: 'Поле обязательно к заполнению',
                            minLength: {
                                value: 6,
                                message: 'Минимум 6 символов'
                            }
                        })} />
                    {errors?.password &&
                        <span className="register_form-filed-input-error">{errors?.password?.message}</span>}
                </div>
                <div className="register_form-submit__item">
                    <span className="register_form-filed-input-error">{message}</span>
                    <button type="submit" className="register_form-submit register_form-submit_login" disabled={!isValid}>
                        Войти
                    </button>
                </div>
            </form>
            <LoginFooter title={'Ещё не зарегистрированы?'} linkText={'Регистрация'} link={'/signup'} />
        </div>
    )
}
