import React, { useEffect, useState } from 'react';
import { getCurrentPositionWeather } from 'shared/helpers/getUserLocation';

import cls from './weather.module.scss';
import { LanguageSwitcher } from 'feature/languageSwitcher/languageSwitcher';
import { useTranslation } from 'react-i18next';

export const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState([]);
    console.log(weatherData);
    const { t } = useTranslation();

    useEffect(() => {
        // getCurrentPositionWeather(setWeatherData);
    }, []);

    return (
        <div className={cls.wrapper}>
            <LanguageSwitcher />
            <h1>{t('WEATHER PAGE')}</h1>
        </div>
    );
};
