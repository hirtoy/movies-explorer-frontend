import React from 'react';
import './MoviesCardList.css';

export default function MoviesCardList({ movie, isMovies }) {
    let buttonClass;
    let buttonName;

    if (isMovies) {
        buttonClass = 'movie-list__like-button-delete';
        buttonName = '';
    } else {
        buttonClass = movie.id % 2 ? 'movie-list__like-button-liked' : 'movie-list__like-button-unliked';
        buttonName = movie.id % 2 ? '' : 'Сохранить';
    }

    return (
        <article className="movie-list" id={movie.id}>
            <div className="movie-list__title">
                <h2 className="movie-list__title-text">{movie.nameRU}</h2>
                <p className="movie-list__title-duration">{`${movie.duration} минут`}</p>
            </div>
            <img className="movie-list__image"
                alt={movie.nameRU}
                src={`https://api.nomoreparties.co${movie.image.url}`} />
            <div className="movie-list__like-button-item">
                <button type="button" className={`movie-list__like-button ${buttonClass}`}>
                    {buttonName}
                </button>
            </div>
        </article>
    )
}
