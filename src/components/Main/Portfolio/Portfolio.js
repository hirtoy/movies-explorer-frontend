import React from 'react';
import './Portfolio.css';

export default function Portfolio() {
    return (
        <div className="portfolio__block">

            <p className="portfolio">Портфолио</p>

            <ul className="portfolio__links">

                <li className="portfolio__link">
                    <a target="_blank" href="https://github.com/hirtoy/russian-travel"
                        className="portfolio__link-title" rel="noreferrer">
                        <div className="portfolio__link-title-text">Статичный сайт</div>
                        <div className="portfolio__link-title-image"></div>
                    </a>
                    <div className="portfolio__line"></div>
                </li>

                <li className="portfolio__link">
                    <a target="_blank" href="https://github.com/hirtoy/mesto"
                        className="portfolio__link-title" rel="noreferrer">
                        <div className="portfolio__link-title-text">Адаптивный сайт</div>
                        <div className="portfolio__link-title-image"></div>
                    </a>
                    <div className="portfolio__line"></div>
                </li>
                
                <li className="portfolio__link">
                    <a target="_blank" href="https://github.com/hirtoy/mesto-react"
                        className="portfolio__link-title" rel="noreferrer">
                        <div className="portfolio__link-title-text">Одностраничное приложение</div>
                        <div className="portfolio__link-title-image"></div>
                    </a>
                </li>
            </ul>
        </div>
    );
}