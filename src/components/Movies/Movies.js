import React from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './Movies.css';

export default function Movies({ movies, isMovies }) {
    return (
        <section className="movies">
            <div className="movies__item">
                {movies.map(item => <MoviesCardList key={item.id} movie={item} isMovies={isMovies} />)}
            </div>
            <div className="movies__more-item">
                <button type="button" className="movies__more">Ещё</button>
            </div>
        </section>
    )
}