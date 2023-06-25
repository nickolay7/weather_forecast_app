import React, {
    ChangeEvent,
    FC,
    KeyboardEventHandler,
    useEffect,
    useState,
} from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import cls from './searchBar.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'app/providers/storeProvider';
import {
    getForecastByCity,
    getWeatherState,
    resetError,
} from 'widgets/weatherCard';
import { Info } from 'shared/ui/button/ui/Info/info';

const GEO_NAME = process.env.REACT_APP_GEONAME;

interface City {
    name: string;
    countryName: string;
    geonameId: number;
}

export const SearchBar: FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [cities, setCities] = useState<City[]>([]);
    const dispatch = useAppDispatch();
    const weatherState = useAppSelector(getWeatherState);
    const { t } = useTranslation();

    const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSearchButtonClick = () => {
        dispatch(getForecastByCity(searchValue));
    };

    const handleSearchKeyPress: KeyboardEventHandler<HTMLInputElement> = (
        e,
    ) => {
        if (e.key === 'Enter') {
            dispatch(getForecastByCity(searchValue));
        }
    };

    useEffect(() => {
        const searchTimer = setTimeout(() => {
            if (searchValue.length >= 3) {
                axios
                    .get('http://api.geonames.org/searchJSON', {
                        params: {
                            q: searchValue,
                            maxRows: 10,
                            username: GEO_NAME,
                        },
                    })
                    .then((response) => {
                        setCities(response.data.geonames);
                    })
                    .catch((error) => {
                        console.error('Failed to fetch data:', error);
                    });
            }
        }, 500);

        return () => {
            clearTimeout(searchTimer);
        };
    }, [searchValue]);

    return (
        <div className={cls.searchBar}>
            <Autocomplete
                id="country-select-demo"
                sx={{ width: 300 }}
                options={cities}
                autoHighlight
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...props}
                        key={option.geonameId}
                    >
                        {`${option.name}, ${option.countryName}`}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={t('Search city')}
                        onChange={handleSearchValueChange}
                        onKeyDown={handleSearchKeyPress}
                        size="small"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearchButtonClick}
            >
                {t('Search')}
            </Button>
            {weatherState.error && (
                <Info
                    className={cls.alert}
                    status="error"
                    message={t("Sorry, I can't found this city!")}
                    fn={() => dispatch(resetError())}
                />
            )}
        </div>
    );
};
