import React from 'react';
import LoginHeader from '../Login/form/LoginHeader/LoginHeader';
import LoginForm from '../Login/form/LoginForm/LoginForm';
import LoginSubmit from '../Login/form/LoginSubmit/LoginSubmit';
import LoginFooter from '../Login/form/LoginFooter/LoginFooter';
import './Register.css';

export default function Register() {
    return (
        <div className="register">
            <LoginHeader title={'Добро пожаловать!'} />
            <form className="register__form" method="post" name="registerUserForm"
                noValidate>
                <LoginForm
                    title={'Имя'}
                    placeholder={'Имя'}
                    name={'name'}
                    type={'text'}
                    isValid={true} />
                <LoginForm
                    title={'E-mail'}
                    placeholder={'pochta@yandex.ru'}
                    name={'email'}
                    type={'email'}
                    isValid={true} />
                <LoginForm
                    title={'Пароль'}
                    placeholder={''}
                    name={'password'}
                    type={'password'}
                    error={'Что-то пошло не так...'}
                    isValid={false} />
                <LoginSubmit title={'Зарегистрироваться'} />
            </form>
            <LoginFooter title={'Уже зарегистрированы?'} linkText={'Войти'} link={'/signin'} />
        </div>
    )
}
