import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Forecast } from '../model/types/forcast';
import { Button as MyButton } from 'shared/ui/button';

import cls from './weatherCard.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import i18n from 'shared/config/i18n';
import { classNames } from '../../../shared/helpers/classNames';

interface WeatherCardProps {
    data: Forecast;
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 12,
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
    const cardBg = data.main.temp < 0;
    // const language = useSelector((state) => state.language);

    const toggleTemperature = () => {
        setCelsius(!celsius);
        setCelsiusFeelsLike(!celsius);
    };

    const temperature = celsius
        ? data.main.temp.toFixed(1)
        : ((data.main.temp * 9) / 5 + 32).toFixed(1);

    const temperatureFeelsLike = celsiusFeelsLike
        ? data.main.feels_like.toFixed(1)
        : ((data.main.feels_like * 9) / 5 + 32).toFixed(1);

    const unit = celsius ? '°C' : '°F';

    const dtToDate = new Date();

    const date = new Intl.DateTimeFormat(i18n.language, {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    }).format(dtToDate);

    return (
        <Card className={classNames(cls.card, { [cls.coldCard]: cardBg }, [])}>
            <CardContent>
                <div className={cls.cardNameAndIcon}>
                    <div className={cls.nameAndDate}>
                        <Typography
                            className={classes.title12}
                            color="textSecondary"
                            gutterBottom
                        >
                            {`${data.name}, ${data.sys.country}`}
                        </Typography>
                        <Typography
                            className={classes.title14}
                            color="textPrimary"
                        >
                            {date}
                        </Typography>
                    </div>
                    <div className={cls.icon}>
                        <img
                            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                            alt="weather icon"
                        />
                        <Typography
                            className={classes.title10}
                            color="textSecondary"
                            gutterBottom
                        >
                            {t(data.weather[0].main)}
                        </Typography>
                    </div>
                </div>
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
                        <Typography className={classes.title10}>
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
                                {data.wind.speed}
                                {t('m/s')}
                            </span>
                        </Typography>
                        <Typography
                            className={classes.title10}
                            color="textPrimary"
                        >
                            {t('Humidity')}:{' '}
                            <span className={cls.rightText}>
                                {data.main.humidity}%
                            </span>
                        </Typography>
                        <Typography
                            className={classes.title10}
                            color="textPrimary"
                        >
                            {t('Pressure')}:{' '}
                            <span className={cls.rightText}>
                                {data.main.pressure}
                                {t('Pa')}
                            </span>
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
