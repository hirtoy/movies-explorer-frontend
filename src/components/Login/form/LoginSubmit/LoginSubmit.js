import React from 'react';
import './LoginSubmit.css';

export default function LoginSubmit({title, isLogin}) {
    return (
        <button type="submit" className={`login-submit ${isLogin && 'login-submit_auth'}`}>
            {title}
        </button>
    )
}
