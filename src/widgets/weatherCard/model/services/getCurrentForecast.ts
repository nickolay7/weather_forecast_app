import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/storeProvider';
import { CityWeatherData } from '../types/forcast';
import { addCityForecast } from '../slice/forecastSlice';
import i18n from 'shared/config/i18n';
import { filterDataByDate } from '../../lib/filterDataByDate';

export const getCurrentForecast = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('@@getCurrentForecast', async (_, thunkApi) => {
    const {
        extra: { api },
        rejectWithValue,
        dispatch,
    } = thunkApi;

    try {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { data } = await api.get<CityWeatherData>('/forecast', {
                params: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    lang: i18n.language,
                    appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
                    units: 'metric',
                },
            });

            if (!data) {
                throw new Error('error');
            }

            const filteredData = { ...data, list: filterDataByDate(data.list) };

            dispatch(addCityForecast(filteredData));
        });
    } catch (e) {
        return rejectWithValue('error');
    }
});
