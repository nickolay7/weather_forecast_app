import { StateSchema } from 'app/providers/storeProvider';

export const getWeatherList = (state: StateSchema) => state.forecasts.data;
export const getWeatherState = (state: StateSchema) => state.forecasts;
