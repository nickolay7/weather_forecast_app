import React, { FC } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CityWeatherData } from '../model/types/forcast';
import { classNames } from 'shared/helpers/classNames';
import { TemperatureGraph } from './temperatureGraph';
import { formatDate } from '../lib/formatDate';
import { TemperatureBlock } from './temperatureBlock';
import { useStyles } from './styles/muiStyles';

import cls from './styles/weatherCard.module.scss';

interface WeatherCardProps {
    data: CityWeatherData;
}

export const WeatherCard: FC<WeatherCardProps> = ({ data }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { city, list } = data;
    const currentForecast = list[0];
    const cardBg = currentForecast.main.temp < 0;

    const dateFormat = formatDate(currentForecast.dt_txt, {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Card
            className={classNames(
                classes.bgWarm,
                { [classes.bgCold]: cardBg },
                [cls.card],
            )}
        >
            <CardContent>
                <div className={cls.cardNameAndIcon}>
                    <div className={cls.nameAndDate}>
                        <Typography
                            className={classes.title12}
                            color="textPrimary"
                            gutterBottom
                        >
                            {`${city.name}, ${city.country}`}
                        </Typography>
                        <Typography
                            className={classes.title14}
                            color="textPrimary"
                        >
                            {dateFormat}
                        </Typography>
                    </div>
                    <div className={cls.icon}>
                        <img
                            src={`http://openweathermap.org/img/w/${currentForecast.weather[0].icon}.png`}
                            alt="weather icon"
                        />
                        <Typography
                            className={classes.title10}
                            color="textSecondary"
                            gutterBottom
                        >
                            {t(currentForecast.weather[0].main)}
                        </Typography>
                    </div>
                </div>
                <TemperatureGraph weatherData={list} />
                <div className={cls.bottom}>
                    <TemperatureBlock
                        temperature={currentForecast.main.temp}
                        temperatureFeelsLike={currentForecast.main.feels_like}
                    />
                    <div className={cls.right}>
                        <Typography
                            className={classes.title10}
                            color="textPrimary"
                        >
                            {t('Wind')}:{' '}
                            <span className={cls.rightText}>
                                {currentForecast.wind.speed}
                                {t('m/s')}
                            </span>
                        </Typography>
                        <Typography
                            className={classes.title10}
                            color="textPrimary"
                        >
                            {t('Humidity')}:{' '}
                            <span className={cls.rightText}>
                                {currentForecast.main.humidity}%
                            </span>
                        </Typography>
                        <Typography
                            className={classes.title10}
                            color="textPrimary"
                        >
                            {t('Pressure')}:{' '}
                            <span className={cls.rightText}>
                                {currentForecast.main.pressure}
                                {t('Pa')}
                            </span>
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
