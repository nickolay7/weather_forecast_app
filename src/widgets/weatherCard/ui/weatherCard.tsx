import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CityWeatherData } from '../model/types/forcast';
import { Button as MyButton } from 'shared/ui/button';
import { makeStyles } from '@material-ui/core/styles';
import { classNames } from 'shared/helpers/classNames';
import { TemperatureGraph } from './temperatureGraph';
import { formatDate } from '../lib/formatDate';

import cls from './weatherCard.module.scss';

interface WeatherCardProps {
    data: CityWeatherData;
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 12,
    },
    bgWarm: {
        background: '#f7f2ec',
    },
    bgCold: {
        background: '#ebebef',
    },
    title10: {
        fontSize: 10,
    },
    title12: {
        fontSize: 12,
        margin: 0,
    },
    title14: {
        fontSize: 14,
    },
});

export const WeatherCard = ({ data }: WeatherCardProps) => {
    const classes = useStyles();
    const [celsius, setCelsius] = useState(true);
    const [celsiusFeelsLike, setCelsiusFeelsLike] = useState(true);
    const { t } = useTranslation();
    const { city, list } = data;
    const currentForecast = list[0];
    const cardBg = currentForecast.main.temp < 0;

    const toggleTemperature = () => {
        setCelsius(!celsius);
        setCelsiusFeelsLike(!celsius);
    };

    const temperature = celsius
        ? currentForecast.main.temp.toFixed(1)
        : ((currentForecast.main.temp * 9) / 5 + 32).toFixed(1);

    const temperatureFeelsLike = celsiusFeelsLike
        ? currentForecast.main.feels_like.toFixed(1)
        : ((currentForecast.main.feels_like * 9) / 5 + 32).toFixed(1);

    const unit = celsius ? '°C' : '°F';

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
                    <div className={cls.left}>
                        <div className={cls.tempWithPointSwitcher}>
                            <Typography variant="h5" component="h2">
                                {Number(temperature) > 0
                                    ? `+${temperature}`
                                    : `-${temperature}`}
                            </Typography>
                            <div className={cls.pointSwitcher}>
                                <MyButton onClick={toggleTemperature}>
                                    °C
                                </MyButton>
                                <p className={cls.pointSwitcherDelimiter}>|</p>
                                <MyButton onClick={toggleTemperature}>
                                    °F
                                </MyButton>
                            </div>
                        </div>
                        <Typography
                            className={classes.title10}
                            color="textSecondary"
                        >
                            {`${t('Feels like')}: ${
                                Number(temperatureFeelsLike) > 0
                                    ? `+${temperatureFeelsLike}`
                                    : `-${temperatureFeelsLike}`
                            } ${unit}`}
                        </Typography>
                    </div>
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
