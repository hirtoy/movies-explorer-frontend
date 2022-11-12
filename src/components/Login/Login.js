import React from 'react';
import LoginHeader from './form/LoginHeader/LoginHeader';
import LoginForm from './form/LoginForm/LoginForm';
import LoginSubmit from './form/LoginSubmit/LoginSubmit';
import LoginFooter from './form/LoginFooter/LoginFooter';
import './Login.css';

export default function Login() {
    // const [email, setEmail] = React.useState('');
    // const [password, setPassword] = React.useState('');

    // function handleEmailChange(event) { setEmail(event.target.value) };
    // function handlePasswordChange(event) { setPassword(event.target.value) };

    // function handleAuthorize(event) {
    //     event.preventDefault();
    //     props.onAuthorise(email, password);
    // }

    return (
        <div className="login">
            <LoginHeader title={'Рады видеть!'} />
            <form className="login__form" method="post" name="loginForm"
                noValidate>
                <LoginForm title={'E-mail'} placeholder={'pochta@yandex.ru'} name={'email'} type="email"
                    isValid={true} />
                <LoginForm title={'Пароль'} placeholder={''} name={'password'} type="password"
                    error={'Что-то пошло не так...'} isValid={false} />
                <LoginSubmit title={'Войти'} isLogin={true} />
            </form>
            <LoginFooter title={'Ещё не зарегистрированы?'} linkText={'Регистрация'} link={'/signup'} />
        </div>
    )
}
