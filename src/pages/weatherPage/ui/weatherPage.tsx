import React, { useEffect } from 'react';
import { LanguageSwitcher } from 'feature/languageSwitcher';
import { SearchBar } from 'feature/searchCity/ui/searchCity';
import {
    getWeatherList,
    getCurrentForecast,
    initCitiesForecast,
} from 'widgets/weatherCard';
import { useAppDispatch, useAppSelector } from 'app/providers/storeProvider';
import { WeatherList } from './weatherList';

import cls from './weather.module.scss';

export const WeatherPage = () => {
    const weatherData = useAppSelector(getWeatherList);
    const dispatch = useAppDispatch();
    const weatherList = localStorage.getItem('weatherList');

    useEffect(() => {
        if (weatherList) {
            dispatch(initCitiesForecast(JSON.parse(weatherList)));
        } else {
            dispatch(getCurrentForecast());
        }
    }, [dispatch]);

    return (
        <div className={cls.wrapper}>
            <LanguageSwitcher />
            <SearchBar />
            <WeatherList className={cls.weatherList} data={weatherData} />
        </div>
    );
};
