import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TWeatherRecord, TUser } from '../types.ts';

export const weatherApi = createApi({
	reducerPath: 'weatherApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api'}),
	tagTypes: ['Weather'],
	endpoints: (builder) => ({
		getWeather: builder.query<TWeatherRecord[], void>({
			query: () => '/weather',
			providesTags: [{ type: 'Weather', id: 'LIST' }]
		}),
		getUsers: builder.query<TUser[], void>({
			query: () => '/users',
		}),
		saveWeatherRecord: builder.mutation<void, TWeatherRecord>({
			query: (record) => ({
				url: '/weather',
				method: 'POST',
				body: record,
			}),
			invalidatesTags: [{ type: 'Weather', id: 'LIST' }],
		}),
		deleteWeatherRecord: builder.mutation<void, number>({
			query: (id) => ({
				url: `/weather/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Weather', id: 'LIST' }] ,
		}),
	}),
});

export const {
	useGetWeatherQuery,
	useGetUsersQuery,
	useSaveWeatherRecordMutation,
	useDeleteWeatherRecordMutation,
} = weatherApi;
