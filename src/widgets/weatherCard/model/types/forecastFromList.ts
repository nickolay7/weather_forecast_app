export interface ForecastFromList {
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
    dt_txt: string;
}
