import { createSlice } from '@reduxjs/toolkit';
import { ForecastSchema } from '../types/forcast';
import { getCurrentForecast } from '../services/getCurrentForecast';
import { getForecastByCity } from '../services/getForecastByCity';
const initialState: ForecastSchema = {
    isLoading: false,
    data: [],
    error: undefined,
};

export const forecastSlice = createSlice({
    name: '@@forecastSlice',
    initialState,
    reducers: {
        addCityForecast: (state, action) => {
            state.data.push(action.payload);
        },
        initCitiesForecast: (state, action) => {
            state.data = action.payload;
        },
        resetError: (state) => {
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentForecast.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(getCurrentForecast.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getCurrentForecast.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getForecastByCity.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(getForecastByCity.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getForecastByCity.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
    },
});

export const { addCityForecast, initCitiesForecast, resetError } =
    forecastSlice.actions;
export const forecastReducer = forecastSlice.reducer;
