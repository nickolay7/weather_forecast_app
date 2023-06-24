import React, { useEffect } from 'react';
import { LanguageSwitcher } from 'feature/languageSwitcher';
import { useTranslation } from 'react-i18next';
import { SearchBar } from 'feature/searchCity/searchCity';
import {
    WeatherCard,
    getWeatherList,
    getCurrentForecast,
    initCitiesForecast,
} from 'widgets/weatherCard';
import mock from './mock.json';

import cls from './weather.module.scss';

import { useAppDispatch, useAppSelector } from 'app/providers/storeProvider';

export const WeatherPage = () => {
    const weatherData = useAppSelector(getWeatherList);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const weatherList = localStorage.getItem('weatherList');

    useEffect(() => {
        if (weatherList) {
            dispatch(initCitiesForecast(JSON.parse(weatherList)));
        } else {
            dispatch(getCurrentForecast());
        }
    }, []);

    return (
        <div className={cls.wrapper}>
            <LanguageSwitcher />
            <SearchBar />
            <div className={cls.weatherList}>
                {weatherData.map((data, index) => (
                    <WeatherCard key={index} data={data} />
                ))}
            </div>
        </div>
    );
};
