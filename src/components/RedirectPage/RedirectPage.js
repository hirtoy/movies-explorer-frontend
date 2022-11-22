import React from 'react';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';

export default function RedirectPage({loggedIn, onMenuClick, onSignOut, handleUpdateUser, errorMessage}) {
    return (
        <>
            <Header loggedIn={loggedIn} onMenuClick={onMenuClick}/>
            <Profile loggedIn={loggedIn} onSignOut={onSignOut} handleUpdateUser={handleUpdateUser} errorMessage={errorMessage}/>
        </>
    )
}
