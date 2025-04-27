import { combineReducers, configureStore } from "@reduxjs/toolkit";
import textReducer from "@features/text/model/slice";
import settingsReducer from "@entities/settings/model/slice";
import userReducer from "@entities/user/model/slice";
import { $api } from "@shared/api";

const rootReducer = combineReducers({
  textReducer,
  userReducer,
  settingsReducer,
  [$api.reducerPath]: $api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat($api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
