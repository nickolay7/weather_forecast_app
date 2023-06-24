import axios from 'axios';

const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export const getCurrentPositionWeather = async (
    setData: (data: any) => void,
) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&lang=ru&&appid=${OPEN_WEATHER_API_KEY}`,
        );
        setData([response.data]);
    });
};
