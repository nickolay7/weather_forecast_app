import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { StateSchema } from './stateSchema';
import { forecastReducer } from 'widgets/weatherCard';
import { $api } from 'shared/api/api';

export const createReduxStore = (initialState?: StateSchema) => {
    const rootReducer: ReducersMapObject<StateSchema> = {
        forecasts: forecastReducer,
    };

    return configureStore({
        reducer: rootReducer,
        devTools: true,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                    },
                },
            }),
    });
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
