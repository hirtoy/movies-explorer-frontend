import '../../index.css';
import './App.css';
import { getWindow, isFound, isFoundShort } from "../../utils/Utilite";
import { IMAGE_URL } from '../../utils/Constants';
import { Redirect, Switch, Route, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React from 'react';
import Cookies from 'js-cookie';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import MoviesPage from '../Movies/MoviesPage/MoviesPage';
import MoviesPages from '../Movies/MoviesPage/MoviesPages';
import ErrorNotFound from '../error/ErrorNotFound';
import NavTab from '../Main/NavTab/NavTab';
import RedirectPage from '../RedirectPage/RedirectPage';
import ProtectedRoute from '../Route/ProtectedRoute'
import { mainApi } from '../../Api/MainApi';
import { moviesApi } from '../../Api/MoviesApi';

export default function App() {
    const [sortingMovies, setSortingMovieState] = useState([]);
    const [isRenderMovies, setIsRenderMoviesState] = useState([]);
    const [savedMovies, setSavedMoviesState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenMenuPopup, setMenuPopupState] = useState(false);
    const [isNotFound, setIsNotFoundState] = useState(false);
    const [isServerError, setIsServerError] = useState(false);
    const [isRenderCount, setIsRenderCount] = useState(0);

    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //определение размера экрана
    const [windows, setWindows] = React.useState({});

    const history = useHistory();

    const handleClick = () => setMenuPopupState(true);
    const closeMenuPopup = () => setMenuPopupState(false);
    const handleLinkClick = () => closeMenuPopup();

    const clearStorage = () => {
        localStorage.removeItem('allMovies');
        localStorage.removeItem('sortingMovies');
        localStorage.removeItem('isRenderMovies');
        localStorage.removeItem('searchRequest');
        localStorage.removeItem('shortFilms');
    }

    //проверка авторизации и данных пользователя
    React.useEffect(() => {
        if (Cookies.get('jwt') && Cookies.get('jwt').length === 172) {
            mainApi.getUserInfo()
                .then((res) => {
                    if (res) {
                        setCurrentUser(res[0]);
                        setSavedMoviesState(res[1]);
                        setLoggedIn(true);
                        localStorage.setItem('loggedIn', true);
                    }
                })
                .catch((err) => {
                    localStorage.setItem('loggedIn', false);
                    clearStorage();
                    setCurrentUser({});
                    setSavedMoviesState([]);
                    Cookies.delete('jwt');
                    console.log(err);
                });
        }
    }, []);

    //кол-во фильмов в зависимости от экрана
    React.useEffect(() => {
        setWindows(getWindow(window.innerWidth));
        setIsRenderCount(getWindow(window.innerWidth).count);
    }, []);

    React.useEffect(() => {
        const debouncedHandle = debounce(function handleResize() {
            setWindows(getWindow(window.innerWidth));
        }, 1000)
        window.addEventListener('resize', debouncedHandle);

        return () => {
            window.removeEventListener('resize', debouncedHandle)
        }
    });

    const debounce = (fn, ms) => {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this, arguments);
            }, ms)
        };
    }

    React.useEffect(() => {
        if (localStorage.getItem('sortingMovies')) {
            setSortingMovieState(JSON.parse(localStorage.getItem('sortingMovies')));
        }
        if (localStorage.getItem('isRenderMovies')) {
            setIsRenderMoviesState(JSON.parse(localStorage.getItem('isRenderMovies')));
        }
    }, []);

    const setIsRenderMovies = (sortingMovies) => {

        sortingMovies.length === 0 ? setIsNotFoundState(true) : setIsNotFoundState(false);
        localStorage.setItem('sortingMovies', JSON.stringify(sortingMovies));
        setSortingMovieState(sortingMovies);

        localStorage.setItem('isRenderMovies', JSON.stringify(sortingMovies.slice(0, isRenderCount)));
        setIsRenderMoviesState(sortingMovies.slice(0, isRenderCount));
    }

    const handleSearchMoviesShort = (formData) => {
        setSortingMovieState([]);
        setIsServerError(false);
        if (localStorage.getItem('allMovies')) {
            const allMoviesLocal = JSON.parse(localStorage.getItem('allMovies'));
            const sortingMovies = allMoviesLocal
                .filter(function (movie) {
                    return isFoundShort(movie, formData);
                })
            setIsRenderMovies(sortingMovies)
        }
    }



    const handleSearchMovies = (formData) => {
        setSortingMovieState([]);
        setIsServerError(false);
        if (localStorage.getItem('allMovies')) {
            const allMoviesLocal = JSON.parse(localStorage.getItem('allMovies'));
            const sortingMovies = allMoviesLocal
                .filter(function (movie) {
                    return isFound(movie, formData);
                })
            setIsRenderMovies(sortingMovies);
        }
        if (loggedIn) {
            setIsLoading(true);
            moviesApi.getAll()
                .then((moviesData) => {
                    localStorage.setItem('allMovies', JSON.stringify(moviesData));
                    const sortingMovies = moviesData.filter(function (movie) {
                        return isFound(movie, formData);
                    })
                    setIsRenderMovies(sortingMovies);
                })
                .catch((err) => {
                    console.log(err);
                    setIsServerError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

    }

    const handleSearchUserMovies = (formData) => {
        setIsLoading(true);
        setIsServerError(false);
        mainApi.getUserMovies()
            .then((moviesData) => {
                const sortingMovies = moviesData.filter(function (movie) {
                    return isFound(movie, formData);
                })
                setSavedMoviesState(sortingMovies);
            })
            .catch((err) => {
                console.log(err);
                setIsServerError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleLoadMore = () => {
        if (sortingMovies.length > isRenderMovies.length) {
            setIsRenderCount(isRenderMovies.length + windows.more);
            setIsRenderMoviesState(sortingMovies.slice(0, isRenderMovies.length + windows.more));
        }
    };

    const handleLike = (movie, isSavedMoviesPage) => {
        if (isSavedMoviesPage) {
            mainApi.deleteMovie(movie._id)
                .then((movie) => {
                    setSavedMoviesState(savedMovies => savedMovies.filter((m) => m._id !== movie._id));
                    setIsRenderMoviesState(JSON.parse(localStorage.getItem('isRenderMovies')));
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            const isLiked = savedMovies.some(m => +m.movieId === movie.id);
            if (isLiked) {
                const movieDB = savedMovies.filter(m => +m.movieId === movie.id);
                mainApi.deleteMovie(movieDB[0]._id)
                    .then((movie) => {
                        setSavedMoviesState(savedMovies => savedMovies.filter((m) => m._id !== movie._id));
                        setIsRenderMoviesState(JSON.parse(localStorage.getItem('isRenderMovies')));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                mainApi.addMovie({
                    country: movie.country,
                    director: movie.director,
                    duration: movie.duration,
                    year: movie.year,
                    description: movie.description,
                    image: IMAGE_URL + movie.image.url,
                    trailerLink: movie.trailerLink,
                    thumbnail: IMAGE_URL + movie.image.formats.thumbnail.url,
                    movieId: movie.id,
                    nameRU: movie.nameRU,
                    nameEN: movie.nameEN
                })
                    .then((movie) => {
                        savedMovies.push(movie);
                        setIsRenderMoviesState(JSON.parse(localStorage.getItem('isRenderMovies')));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    };

    function goBack() {
        history.goBack();
    }

    const resMoviesCard = () => {
        setIsLoading(true);
        setIsServerError(false);
        mainApi.getUserMovies().then((moviesData) => {
            setSavedMoviesState(moviesData);
        })
            .catch((err) => {
                console.log(err);
                setIsServerError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    //редактор пользователя
    const handleUpdateUser = ({ name, email }) => {
        return mainApi.setUserData(name, email)
            .then((userData) => {
                setCurrentUser(userData);
            });
    };

    //регистрация
    const onRegister = ({ name, email, password }) => {
        return mainApi.register(name, email, password)
            .then((res) => {
                if (res) {
                    onLogin({ email, password });
                    setErrorMessage('');
                    history.push('/movies');
                }
            });
    }

    //авторизация
    const onLogin = ({ email, password }) => {
        return mainApi.authorize(email, password)
            .then((res) => {
                if (res.token) {
                    Cookies.set('jwt', res.token)
                    setLoggedIn(true);
                    localStorage.setItem('loggedIn', true);
                    setCurrentUser(res.user);
                    setErrorMessage('');
                    mainApi.getUserMovies().then((moviesData) => {
                        setSavedMoviesState(moviesData)
                    });
                    history.push('/movies');
                }
            });
    };

    //выход
    const onSignOut = () => {
        const jwt = Cookies.get('jwt');
        if (jwt) {
            Cookies.remove('jwt');
            setLoggedIn(false);
            localStorage.setItem('loggedIn', false);
            setCurrentUser({});
            setSortingMovieState([]);
            setIsRenderMoviesState([]);
            setSavedMoviesState([]);
            clearStorage();
            history.push('/');
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">

                <Switch>
                    <Route exact path="/">
                        <Header loggedIn={loggedIn} aboutPage={true} onMenuClick={handleClick} />
                        <Main />
                    </Route>

                    <ProtectedRoute path="/movies"
                        loggedIn={localStorage.getItem('loggedIn') === 'true'}
                        searchError={errorMessage}
                        movies={isRenderMovies}
                        sortingMovies={sortingMovies}
                        savedMovies={savedMovies}
                        isMovies={false}
                        component={MoviesPage}
                        isLoading={isLoading}
                        onMenuClick={handleClick}
                        searchMoviesShort={handleSearchMoviesShort}
                        searchMovies={handleSearchMovies}
                        isNotFound={isNotFound}
                        isServerError={isServerError}
                        onMore={handleLoadMore}
                        like={handleLike}
                        resMoviesCard={resMoviesCard} />

                    <ProtectedRoute path="/saved-movies"
                        loggedIn={localStorage.getItem('loggedIn') === 'true'}
                        movies={savedMovies}
                        isMovies={true}
                        component={MoviesPages}
                        isLoading={isLoading}
                        onMenuClick={handleClick}
                        searchMovies={handleSearchUserMovies}
                        like={handleLike}
                        resMoviesCard={resMoviesCard} />

                    <Route path="/signup">
                        {!loggedIn ? (
                            <Register onRegister={onRegister} />
                        ) : (
                            <Redirect to='/' />
                        )}
                    </Route>

                    <Route path="/signin">
                        {!loggedIn ? (
                            <Login onLogin={onLogin} />
                        ) : (
                            <Redirect to='/' />
                        )}
                    </Route>

                    <ProtectedRoute path="/profile"
                        loggedIn={localStorage.getItem('loggedIn') === 'true'}
                        component={RedirectPage}
                        onMenuClick={handleClick}
                        onSignOut={onSignOut}
                        onUpdateUser={handleUpdateUser}
                        errorMessage={errorMessage} />

                    <Route path="*">
                        <ErrorNotFound goBack={goBack} />
                    </Route>

                </Switch>

                <NavTab onClose={closeMenuPopup}
                    isOpen={isOpenMenuPopup}
                    onLickClick={handleLinkClick} />
            </div >
        </CurrentUserContext.Provider>
    );
}

