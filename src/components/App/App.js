import '../../index.css';
import './App.css';
import Header from '../Header/Header';
import Main from "../Main/Main";
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Movies from '../Movies/Movies';
import ErrorNotFound from '../error/ErrorNotFound';
import NavTab from '../Main/NavTab/NavTab';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import { api } from '../../utils/Api';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';

export default function App() {
    const [movies, setMovieState] = useState([]);
    const [isOpenNavTab, setNavTabState] = useState(false);

    React.useEffect(() => {
        api.getInitialCards().then((moviesData) => {
            setMovieState(moviesData);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const handleClick = () => setNavTabState(true);
    const closeNavTab = () => setNavTabState(false);
    const handleLinkClick = () => closeNavTab();

    return (
        <div className="app">
            <Switch>
                <Route exact path="/">
                    <Header loggedIn={false} aboutPage={true} onClick={handleClick} />
                    <Main />
                </Route>

                <Route path="/movies">
                    <Header loggedIn={true} onClick={handleClick} />
                    <main>
                    <SearchForm />
                    <Movies movies={movies.slice(0, 12)} isMovies={false} />
                    </main>
                    <Footer />
                </Route>

                <Route path="/saved-movies">
                    <Header loggedIn={true} onClick={handleClick}/>
                    <main>
                        <SearchForm/>
                        <MoviesCard movies={movies.slice(0, 3)} isUserMovies={true}/>
                    </main>
                    <Footer/>
                </Route>

                <Route path="/signup">
                    <Register />
                </Route>

                <Route path="/signin">
                    <Login />
                </Route>

                <Route path="/profile">
                    <Header loggedIn={true} onClick={handleClick} />
                    <Profile />
                </Route>

                <Route path="/not-found">
                    <ErrorNotFound />
                </Route>

                <Route path="/*">
                    <Redirect to="/not-found" />
                </Route>

            </Switch>

            <NavTab onClose={closeNavTab}
                isOpen={isOpenNavTab}
                onClick={handleLinkClick} />
        </div>
    );
}

