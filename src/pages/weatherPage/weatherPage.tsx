import React, { useEffect, useState } from 'react';
import { getCurrentPositionWeather } from 'shared/helpers/getUserLocation';

import cls from './weather.module.scss';

export const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState([]);
    console.log(weatherData);

    useEffect(() => {
        getCurrentPositionWeather(setWeatherData);
    }, []);

    return <div className={cls.wrapper}>WEATHER PAGE</div>;
};
