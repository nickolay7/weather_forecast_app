import { ForecastFromList } from './forecastFromList';
import { City } from './city';

export interface Forecast {
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    weather: [
        {
            main: string;
            icon: string;
        },
    ];
    wind: {
        speed: number;
    };
    sys: {
        country: string;
    };
    name: string;
}

export type ForecastsList = ForecastFromList[];

export interface CityWeatherData {
    city: City;
    list: ForecastsList;
}

export interface ForecastSchema {
    data: CityWeatherData[];
    isLoading: boolean;
    error: string | undefined;
}
