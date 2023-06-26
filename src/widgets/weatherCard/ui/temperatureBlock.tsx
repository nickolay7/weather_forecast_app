import React, { FC, useState } from 'react';
import { Button as MyButton } from 'shared/ui/button';
import { classNames } from 'shared/helpers/classNames';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import cls from './styles/weatherCard.module.scss';
import { useStyles } from './styles/muiStyles';

interface TemperatureBlockProps {
    temperature: number;
    temperatureFeelsLike: number;
}

export const TemperatureBlock: FC<TemperatureBlockProps> = ({
    temperature,
    temperatureFeelsLike,
}) => {
    const [celsius, setCelsius] = useState(true);
    const [celsiusFeelsLike, setCelsiusFeelsLike] = useState(true);
    const { t } = useTranslation();
    const classes = useStyles();

    const onCelsius = () => {
        setCelsius(true);
        setCelsiusFeelsLike(true);
    };

    const onFahrenheit = () => {
        setCelsius(false);
        setCelsiusFeelsLike(false);
    };

    const temp = celsius
        ? temperature.toFixed(1)
        : ((temperature * 9) / 5 + 32).toFixed(1);

    const tempFeelsLike = celsiusFeelsLike
        ? temperatureFeelsLike.toFixed(1)
        : ((temperatureFeelsLike * 9) / 5 + 32).toFixed(1);

    const unit = celsius ? '°C' : '°F';

    return (
        <div>
            <div className={cls.tempWithPointSwitcher}>
                <Typography variant="h5" component="h2">
                    {Number(temp) > 0 ? `+${temp}` : `-${temp}`}
                </Typography>
                <div className={cls.unitsSwitcher}>
                    <MyButton
                        className={classNames('', {
                            [cls.pointActive]: celsius,
                        })}
                        onClick={onCelsius}
                    >
                        °C
                    </MyButton>
                    <p className={cls.unitsSwitcherDelimiter}>|</p>
                    <MyButton
                        className={classNames('', {
                            [cls.pointActive]: !celsius,
                        })}
                        onClick={onFahrenheit}
                    >
                        °F
                    </MyButton>
                </div>
            </div>
            <Typography className={classes.title10} color="textSecondary">
                {`${t('Feels like')}: ${
                    Number(tempFeelsLike) > 0
                        ? `+${tempFeelsLike}`
                        : `-${tempFeelsLike}`
                } ${unit}`}
            </Typography>
        </div>
    );
};
