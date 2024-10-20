import { configureStore } from '@reduxjs/toolkit';
import { weatherApi} from '../api/weather-api.ts';

export const store = configureStore({
	reducer: {
		[weatherApi.reducerPath]: weatherApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(weatherApi.middleware),
});
