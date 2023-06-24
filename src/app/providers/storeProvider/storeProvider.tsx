import React, { ReactNode } from "react";
import { Provider } from "react-redux";

import { createReduxStore } from "app/providers/storeProvider/config/store";

import { StateSchema } from "./config/stateSchema";

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: StateSchema;
}

export function StoreProvider({ children, initialState }: StoreProviderProps) {
	const store = createReduxStore(initialState as StateSchema);

	return <Provider store={store}>{children}</Provider>;
}
