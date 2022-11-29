import React from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './Movies.css';
import { ERROR_NOT_FOUND, ERROR_SERVER, ERROR_REQUEST } from '../../utils/Constants';
import Preloader from '../Main/Preloader/Preloader';

export default function Movies({ movies, isMovies, isLoading, isNotFound, isServerError, onMore, sortingMovies, like, savedMovies }) {
    return (
        <section className="movies">
            {isLoading && <Preloader />}
            {!isLoading && isNotFound ?
                <p className="movies__items-none">{ERROR_NOT_FOUND}</p> : ''}

            {!isLoading && isNotFound ?
                <p className="movies__items-none">{ERROR_REQUEST}</p> : ''}

            {!isLoading && isServerError ?
                <p className="movies__items-none">{ERROR_SERVER}</p> : ''}

            <div className="movies__item">
                {movies.map(item => <MoviesCardList key={item.id} movie={item} isMovies={isMovies} like={like}
                    saved={savedMovies.some((m) => item.id === +m.movieId)} />)}
            </div>

            {!isLoading && movies.length < sortingMovies.length ?
                <div className="movies__more-item">
                    <button type="button" className="movies__more" onClick={onMore}>Ещё</button>
                </div> : ''}

        </section>
    )
}