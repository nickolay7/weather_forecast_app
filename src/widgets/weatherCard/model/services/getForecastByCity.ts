import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/storeProvider';
import { CityWeatherData } from '../types/forcast';
import { addCityForecast } from '../slice/forecastSlice';
import i18n from 'shared/config/i18n';
import { getWeatherList } from '../selectors/getWeatherList';
import { filterDataByDate } from '../../lib/filterDataByDate';

export const getForecastByCity = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>('@@getForecastByCity', async (cityName, thunkApi) => {
    const {
        extra: { api },
        rejectWithValue,
        getState,
        dispatch,
    } = thunkApi;

    try {
        const { data } = await api.get<CityWeatherData>('/forecast', {
            params: {
                q: cityName,
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
        const weatherList = getWeatherList(getState());
        localStorage.setItem('weatherList', JSON.stringify(weatherList));
    } catch (e) {
        return rejectWithValue('error');
    }
});
