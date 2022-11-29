import {DESKTOP_WIDTH, MOVIES_CARD, SHORT_DURATION, MOBAL_WIDTH} from './Constants';

const isNameFound = (movie, name, formData) => {
    return movie[name].toLowerCase().includes(formData.searchRequest.toLowerCase());
}

const isFoundShortDuration = (movie, formData) => {
    const isShort = movie.duration <= SHORT_DURATION;
    const russian = isNameFound(movie, 'nameRU', formData) && isShort;
    const english = isNameFound(movie, 'nameEN', formData) && isShort;

    return russian || english;
}

const isFoundDuration = (movie, formData) => {
    const russian = isNameFound(movie, 'nameRU', formData);
    const english = isNameFound(movie, 'nameEN', formData);

    return russian || english;
}

export const isFound = (movie, formData) => {
    if (formData.shortFilms) {
        return isFoundDuration(movie, formData);
    } else {
        return isFoundShortDuration(movie, formData);
    }
}

export const getWindow = (width) => {
    let window;

    if (width >= DESKTOP_WIDTH) {
        window = MOVIES_CARD.desktop;
    } else if (width < DESKTOP_WIDTH && width >= MOBAL_WIDTH) {
        window = MOVIES_CARD.tablet;
    } else {
        window = MOVIES_CARD.mobile;
    }

    return window;
}

export const getDuration = (duration) => {
    const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
};