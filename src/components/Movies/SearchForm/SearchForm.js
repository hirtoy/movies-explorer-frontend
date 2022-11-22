import React, { useState, useEffect } from 'react';
import useFormWithValidation from '../../../utils/validateAutch';
// import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import './SearchForm.css';

export default function SearchForm({ searchMovies }) {
    const [searchRequest, setSearchRequest] = useState(localStorage.getItem('searchRequest') ?? '');
    const [shortFilms, setShortFilms] = useState(localStorage.getItem('shortFilms') ?? 0);
    const { values, handleChange, isValid } = useFormWithValidation();
    // const currentUser = useContext(CurrentUserContext);

    const [message, setMessage] = useState('');

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
        isValid ? handleSearch(values.search) : setMessage('Нужно ввести ключевое слово.');
    };

    useEffect(() => {
        setMessage('')
    }, [isValid]);

    // function onSubmit(e) {
    //     e.preventDefault();
    //     handleSearch();
    // }

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
                        value={searchRequest || ''}>
                    </input>
                    <span className="searchform__input-error">{message}</span>
                    <button type="submit" className="searchform__input-submit" onChange={handleChange} onClick={handleSearch} >Поиск</button>

                </label>

                <div className="searchform__checkbox-group">

                    <label className="searchform__checkbox-item">
                        <input type="checkbox" value={shortFilms || 0} onClick={handleSearch} onChange={handleChangeFilms} checked={Boolean(+shortFilms)} />
                        <span className="searchform__checkbox-slider"></span>
                    </label>

                    <p className="searchform__checkbox-title">Короткометражки</p>
                </div>
            </form>

            <div className="searchform__line"></div>

        </section>
    )
}
