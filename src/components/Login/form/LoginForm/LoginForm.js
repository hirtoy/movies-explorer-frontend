import React from 'react';
import './LoginForm.css';

export default function LoginForm({title, placeholder, name, type, error, isValid}) {
    return (
        <div className="login-form">
            <label className="login-form__forms-input-title">{title}</label>
            <input name={name} type={type}
                   placeholder={placeholder}
                   className={`login-form__forms-input ${isValid || 'login-form__forms-input_failed-validation'}`}
                   minLength="2" maxLength="30" id={`profile-${name}-input`} required/>
            <span className="login-form__forms-input-error">{error}</span>
        </div>
    )
}
