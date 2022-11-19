import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './MoviesCard.css';
import '../Movies.css';
import Spinner from '../../Spinner/Spinner';

export default function MoviesCard({ movies, isMovies, like, isLoading }) {
    return (
        <section className="movies-card">
            {isLoading ? <Spinner/> : ''}
            <div className="movies__item">

                {movies.map(item =>
                    <MoviesCardList
                        key={item._id}
                        movie={item}
                        isMovies={isMovies}
                        like={like} />)}

            </div>
        </section>
    )
}
