import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { StateSchema } from "./stateSchema";
import { AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
