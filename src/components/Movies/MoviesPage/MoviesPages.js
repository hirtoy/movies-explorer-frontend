/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchMoviesPage from '../SerchMoviesPage/SearchMoviesPage';
import { useLocation } from 'react-router-dom';

export default function MoviesPages({ loggedIn, movies, isMovies, onMenuClick, isLoading, searchMovies, like, resMoviesCard }) {

    const location = useLocation();

    useEffect(() => {
        resMoviesCard();
    }, [location]);

    return (
        <>
            <Header loggedIn={loggedIn} onMenuClick={onMenuClick} />
            <main>
                <SearchMoviesPage searchMovies={searchMovies} />
                
                <MoviesCard
                    movies={movies}
                    isMovies={isMovies}
                    isLoading={isLoading}
                    like={like}
                    resMoviesCard={resMoviesCard} />
            </main>
            <Footer />
        </>
    )
}
