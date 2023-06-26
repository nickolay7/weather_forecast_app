import React, { FC } from 'react';
import { CityWeatherData, WeatherCard } from 'widgets/weatherCard';
import { nanoid } from '@reduxjs/toolkit';

interface ListProps {
    className: string;
    data: CityWeatherData[];
}

export const WeatherList: FC<ListProps> = ({ className, data }) => (
    <div className={className}>
        {data.map((item) => (
            <WeatherCard key={nanoid()} data={item} />
        ))}
    </div>
);
