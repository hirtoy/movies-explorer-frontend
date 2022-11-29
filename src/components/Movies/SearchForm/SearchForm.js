import React, { useState, useEffect } from 'react';
import useFormWithValidation from '../../../utils/validateAutch';
import './SearchForm.css';

export default function SearchForm({ searchMovies }) {
    const [searchRequest, setSearchRequest] = useState(localStorage.getItem('searchRequest') ?? '');
    const [shortFilms, setShortFilms] = useState(localStorage.getItem('shortFilms') ?? false);
    const { handleChange, isValid } = useFormWithValidation();

    const [message, setMessage] = useState('');

    function handleSearch() {
        searchMovies({
            shortFilms: +shortFilms,
            searchRequest
        });
    }

    function handleChangeFilms(e) {
        setShortFilms(+e.target.checked);
        localStorage.setItem('shortFilms', +e.target.checked);
    }

    function handleChangeRequest(e) {
        setSearchRequest(e.target.value);
        localStorage.setItem('searchRequest', e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        handleSearch(handleChangeFilms);
    }

    useEffect(() => {
        setMessage('')
    }, [isValid]);


    return (
        <section className="searchform">
            <form className="searchform__items" noValidate name="search" onSubmit={onSubmit}>
                <label className="searchform__input-item">
                    <input
                        name="search"
                        type="text"
                        className="searchform__input"
                        placeholder="Фильм"
                        autoComplete="off"
                        required
                        onChange={handleChangeRequest}
                        defaultValue={searchRequest || ''}>
                    </input>
                    <span className="searchform__input-error">{message}</span>
                    <button type="submit" className="searchform__input-submit" onChange={handleChange}>Поиск</button>

                </label>

                <div className="searchform__checkbox-group">

                    <label className="searchform__checkbox-item">
                        <input
                            type="checkbox"
                            value={shortFilms || 0}
                            onClick={handleSearch}
                            onChange={handleChangeFilms}
                            checked={Boolean(+shortFilms)} />
                        <span className="searchform__checkbox-slider"></span>
                    </label>

                    <p className="searchform__checkbox-title">Короткометражки</p>
                </div>
            </form>

            <div className="searchform__line"></div>

        </section>
    )
}
