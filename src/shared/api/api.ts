import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5';

export const $api = axios.create({
    baseURL: URL,
});
