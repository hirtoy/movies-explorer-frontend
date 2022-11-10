import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './MoviesCard.css';
import '../Movies.css';

export default function MoviesCard({ movies, isMovies }) {
    return (
        <section className="movies-card">
            <div className="movies__item">
            {movies.map(item => <MoviesCardList key={item.id} movie={item} isMovies={isMovies} />)}
            </div>
        </section>
    )
}
