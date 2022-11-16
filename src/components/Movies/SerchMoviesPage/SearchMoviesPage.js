import React, { useState } from 'react';
import '../SearchForm/SearchForm.css';

export default function SearchMoviesPage({ searchMovies }) {
    const [searchRequest, setSearchRequest] = useState('');
    const [shortFilms, setShortFilms] = useState(0);

    function handleChangeSearchRequest(e) {
        setSearchRequest(e.target.value);
    }

    function handleChangeShortFilms(e) {
        setShortFilms(+e.target.checked);
    }

    function handleSearch() {
        searchMovies({
            searchRequest,
            shortFilms: +shortFilms
        });
    }

    function onSubmit(e) {
        e.preventDefault();
        handleSearch();
    }

    return (
        <section className="searchform">
            <form className="searchform__items" onSubmit={onSubmit}>
                <label className="searchform__input-item">
                    <input value={searchRequest || ''} onChange={handleChangeSearchRequest} type="text"
                        className="searchform__input"
                        placeholder="Фильм"
                        required>
                    </input>
                    <button onClick={handleSearch} type="button" className="searchform__input-submit">Найти</button>
                </label>
                <div className="searchform__checkbox-group">
                    <p className="searchform__checkbox-title">Короткометражки</p>
                    <label className="searchform__checkbox-item">
                        <input value={shortFilms || 0} onChange={handleChangeShortFilms} type="checkbox"
                            className="searchform__checkbox" checked={Boolean(+shortFilms)} />
                        <span className="searchform__checkbox-slider"></span>
                    </label>
                </div>
            </form>
            <div className="searchform__line"></div>
        </section>
    )
}
