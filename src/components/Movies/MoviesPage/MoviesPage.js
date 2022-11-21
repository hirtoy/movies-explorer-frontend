/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Header from '../../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Movies from '../Movies';
import Footer from '../../Footer/Footer';
import { useLocation } from 'react-router-dom';

export default function MoviesPage({
    loggedIn,
    movies,
    sortingMovies,
    savedMovies,
    isMovies,
    onMenuClick,
    isLoading,
    searchMovies,
    isNotFound,
    isServerError,
    onMore,
    like,
    resMoviesCard }) {

    const location = useLocation();

    useEffect(() => {
        resMoviesCard();
    }, [location]);

    return (
        <>
            <Header loggedIn={loggedIn} onMenuClick={onMenuClick} />
            <main>
                <SearchForm searchMovies={searchMovies} />
                <Movies
                    movies={movies}
                    sortingMovies={sortingMovies}
                    isMovies={isMovies}
                    isLoading={isLoading}
                    isNotFound={isNotFound}
                    savedMovies={savedMovies}
                    isServerError={isServerError}
                    onMore={onMore}
                    like={like} />
            </main>
            <Footer />
        </>
    )
}
