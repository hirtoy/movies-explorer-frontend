/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useHistory } from "react-router-dom";
import LoginHeader from '../Login/form/LoginHeader/LoginHeader';
// import LoginForm from '../Login/form/LoginForm/LoginForm';
// import LoginSubmit from '../Login/form/LoginSubmit/LoginSubmit';
import LoginFooter from '../Login/form/LoginFooter/LoginFooter';
// import '../Login/form/LoginFooter/LoginFooter.css';
// import '../Login/form/LoginHeader/LoginHeader.css';
import './Register.css';

export default function Register({ onRegister, errorMessage }) {
    const [message, setMessage] = useState('');
    const user = React.useContext(CurrentUserContext);
    const history = useHistory();

    const { register, handleSubmit,
        formState: { errors, isValid } } = useForm({ mode: "onChange" });
    const onSubmit = (data) => {
        onRegister(data)
            .catch((err) => {
                console.log(err);
                if (err === 'Ошибка: 409') {
                    setMessage('Такой пользователь уже существует');
                }
            })
    }

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            history.push('/');
        }
    }, [user]);

    return (
        <div className="register">
            <LoginHeader title={'Добро пожаловать!'} />
            <form className="register__form" method="post" name="registerUserForm" onSubmit={handleSubmit(onSubmit)}
                noValidate>
                <div className="register_form-filed">
                    <label className="register_form-filed-input-title">Имя</label>
                    <input type="text"
                        placeholder="Имя"
                        className={`register_form-filed-input ${errors?.name && 'register_form-filed-input_failed-validation'}`}
                        minLength="2" maxLength="30" id={`profile-name-input`}
                        required
                        {...register('name', {
                            required: 'Поле обязательно к заполнению',
                            minLength: { value: 2, message: 'Минимум 2 символа' }
                        })} />
                    {errors?.name && <span className="register_form-filed-input-error">{errors?.name?.message}</span>}
                </div>
                
                <div className="register_form-filed">
                    <label className="register_form-filed-input-title">E-mail</label>
                    <input type="email"
                        placeholder="pochta@yandex.ru"
                        className={`register_form-filed-input ${errors?.email && 'register_form-filed-input_failed-validation'}`}
                        minLength="2" maxLength="30" id={`profile-email-input`}
                        required
                        {...register('email', {
                            required: 'Поле обязательно к заполнению',
                            pattern: { value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/, message: 'Неправильный формат email' }
                        })} />
                    {errors?.email && 
                    <span className="register_form-filed-input-error">{errors?.email?.message}</span>}
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
                            minLength: { value: 6, message: 'Минимум 6 символов' }
                        })} />
                    {errors?.password &&
                        <span className="register_form-filed-input-error">{errors?.password?.message}</span>}
                </div>

                <div className="register_form-submit__item">
                    <span className="register_form-filed-input-error">{message}</span>
                    <button type="submit" className="register_form-submit" disabled={!isValid}>
                        Зарегистрироваться
                    </button>
                </div>
            </form>
            <LoginFooter title={'Уже зарегистрированы?'} linkText={'Войти'} link={'/signin'} />
        </div>
    )
}