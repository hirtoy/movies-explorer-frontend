import React from 'react';
import './MoviesCardList.css';
import { IMAGE_URL } from '../../../utils/Constants';
import { useLocation } from 'react-router-dom';
import { getDuration } from '../../../utils/Utilite';

export default function MoviesCardList({ movie, isMovies, like, saved }) {
    let buttonClass;
    let buttonName;
    const pathname = useLocation().pathname;

    if (isMovies) {
        buttonClass = 'movie-list__like-button-delete';
        buttonName = '';
    } else {
        buttonClass = saved ? 'movie-list__like-button-liked' : 'movie-list__like-button-unliked';
        buttonName = saved ? '' : 'Сохранить';
    }

    function handleLikeClick() {
        like(movie, pathname === '/saved-movies');
    }

    return (
        <article className="movie-list" id={movie.id}>
            <div className="movie-list__title">
                
                <a target="_blank" rel="noreferrer" href={`${movie.trailerLink}`}
                    className="movie-list__title-text">{movie.nameRU}</a>
                <p className="movie-list__title-duration">{getDuration(movie.duration)}</p>
            </div>
            <a target="_blank" rel="noreferrer" href={`${movie.trailerLink}`}>

                <img className="movie-list__image"
                    alt={movie.nameRU}
                    src={movie.image.url ? `${IMAGE_URL}${movie.image.url}` : movie.image} />
            </a>

            <div className="movie-list__like-button-item">

                <button
                    type="button"
                    onClick={handleLikeClick}
                    className={`movie-list__like-button ${buttonClass}`}>
                    {buttonName}
                </button>
            </div>
        </article>
    )
}
