/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useHistory } from "react-router-dom";
import LoginHeader from '../Login/form/LoginHeader/LoginHeader';
import LoginFooter from '../Login/form/LoginFooter/LoginFooter';
import './Register.css';
import useFormWithValidation from '../../utils/validateAutch'
// import LoginForm from '../Login/form/LoginForm/LoginForm';
// import LoginSubmit from '../Login/form/LoginSubmit/LoginSubmit';
// import '../Login/form/LoginFooter/LoginFooter.css';
// import '../Login/form/LoginHeader/LoginHeader.css';

export default function Register({ onRegister }) {
    // const [message, setMessage] = useState('');
    const user = React.useContext(CurrentUserContext);
    const history = useHistory();


    const { values, handleChange, errors, isValid } = useFormWithValidation();
    function handleSubmit(e) {
        e.preventDefault();
        onRegister(values);
    }
    // const { register, handleSubmit,
    //     formState: { errors, isValid } } = useForm({ mode: "onChange" });
    // const onSubmit = (data) => {
    //     onRegister(data)
    //         .catch((err) => {
    //             console.log(err);
    //             if (err === 'Ошибка: 409') {
    //                 setMessage('Такой пользователь уже существует');
    //             }
    //         })
    // }

    useEffect(() => {
        if (Object.keys(user).length !== 0) {
            history.push('/');
        }
    }, [user]);

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
                    {errors.name && <span className="register_form-filed-input-error">{errors.name.message}</span>}
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
                        <span className="register_form-filed-input-error">{errors.email.message}</span>}
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
                        <span className="register_form-filed-input-error">{errors.password.message}</span>}
                </div>

                <div className="register_form-submit__item">
                    <span className="register_form-filed-input-error"></span>
                    <button type="submit" className="register_form-submit" disabled={!isValid}>
                        Зарегистрироваться
                    </button>
                </div>
            </form>
            <LoginFooter title={'Уже зарегистрированы?'} linkText={'Войти'} link={'/signin'} />
        </div>
    )
}