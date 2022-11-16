import Cookies from 'js-cookie';

class MainApi {
    constructor(options) {
        this._headers = options.headers;
        this._url = options.baseUrl;
    }

    getUserInfo(token) {
        return Promise.all([this.checkAuthorize(token), this.getUserMovies()]);
    }

    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ name, email, password })
        })
            .then(res => this._getResponseData(res));
    }

    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })
            .then(res => this._getResponseData(res));
    }

    getUserMovies() {
        return fetch(`${this._url}/movies`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
            },
            credentials: 'include',
        })
            .then(res => this._getResponseData(res))
    }

    checkAuthorize() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
            },
        })
            .then(res => this._getResponseData(res));
    }

    setUserData(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
            },
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
            .then(res => this._getResponseData(res));
    }

    addMovie(movie) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
            },
            credentials: 'include',
            body: JSON.stringify(movie)
        })
            .then(res => this._getResponseData(res));
    }

    deleteMovie(movieId) {
        return fetch(`${this._url}/movies/` + movieId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
            },
            credentials: 'include',
        })
            .then(res => this._getResponseData(res));
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}

export const mainApi = new MainApi({
    baseUrl: 'https://api.hirtoy.nomoredomains.icu',
    headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
});