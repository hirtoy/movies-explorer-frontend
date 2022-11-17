import React, { useState } from 'react';
import './SearchForm.css';

export default function SearchForm({ searchMovies }) {
    const [searchRequest, setSearchRequest] = useState(localStorage.getItem('searchRequest') ?? '');
    const [shortFilms, setShortFilms] = useState(localStorage.getItem('shortFilms') ?? 0);

    function handleSearch() {
        searchMovies({
            searchRequest,
            shortFilms: +shortFilms
        });
    }

    function handleChangeRequest(e) {
        setSearchRequest(e.target.value);
        localStorage.setItem('searchRequest', e.target.value);
    }
    function handleChangeFilms(e) {
        setShortFilms(+e.target.checked);
        localStorage.setItem('shortFilms', +e.target.checked);
    }

    function onSubmit(e) {
        e.preventDefault();
        handleSearch();
    }

    return (
        <section className="searchform">
            <form className="searchform__items" onSubmit={onSubmit}>
                <label className="searchform__input-item">
                    <input type="text"
                        className="searchform__input"
                        placeholder="Фильм"
                        required
                        onChange={handleChangeRequest}
                        value={searchRequest || ''}>
                    </input>

                    <button type="submit" className="searchform__input-submit" onClick={handleSearch}>Поиск</button>

                </label>
                <div className="searchform__checkbox-group">
                    <label className="searchform__checkbox-item">
                        <input type="checkbox" value={shortFilms || 0} onChange={handleChangeFilms} checked={Boolean(+shortFilms)} />
                        <span className="searchform__checkbox-slider"></span>
                    </label>
                    <p className="searchform__checkbox-title">Короткометражки</p>
                </div>
            </form>
            <div className="searchform__line"></div>
        </section>
    )
}
