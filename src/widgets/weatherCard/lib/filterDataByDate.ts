import { ForecastsList } from '../model/types/forcast';

export const filterDataByDate = (data: ForecastsList) => {
    return data.filter((forecast, idx) => {
        if (idx !== 1) {
            const hours = new Date(forecast.dt_txt).getHours();

            return hours === 12;
        }

        return true;
    });
};
