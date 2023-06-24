import { AxiosInstance } from 'axios';
import { ForecastSchema } from 'widgets/weatherCard/model/types/forcast';

export interface StateSchema {
    forecasts: ForecastSchema;
}

export interface ThunkExtraArgs {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    extra: ThunkExtraArgs;
    rejectValue: T;
    state: StateSchema;
}
