import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/storeProvider';
import { Forecast } from '../types/forcast';
import { addCityForecast } from '../slice/forecastSlice';
import i18n from 'shared/config/i18n';

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
            const { data }: { data: Forecast } = await api.get<Forecast>(
                '/weather',
                {
                    params: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        lang: i18n.language,
                        appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
                        units: 'metric',
                    },
                },
            );

            if (!data) {
                throw new Error('error');
            }

            dispatch(addCityForecast(data));
        });
    } catch (e) {
        return rejectWithValue('error');
    }
});
