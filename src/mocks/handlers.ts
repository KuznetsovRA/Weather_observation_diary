import {http, HttpResponse} from 'msw';
import { TWeatherRecord } from '../types.ts';
import {Users, Weather} from './data';

export const handlers = [
	http.get('/api/users', () => {
		return HttpResponse.json(Users, { status: 200 });
	}),

	http.get('/api/weather', () => {
		return HttpResponse.json(Weather, { status: 200 });
	}),

	http.post('/api/weather', async ({ request }) => {
		try {
			const weatherRecord = await request.json() as TWeatherRecord;

			if (weatherRecord && typeof weatherRecord === 'object') {
				Weather.push({ ...weatherRecord, id: Weather.length + 1 });
				return HttpResponse.json(
					weatherRecord,
					{ status: 201 }
				);
			} else {
				return HttpResponse.json(
					{ message: 'Invalid weather record' },
					{ status: 400 }
				);
			}
		} catch (error) {
			console.error('Error parsing request body:', error);
			return HttpResponse.json(
				{ message: 'Invalid JSON' },
				{ status: 400 }
			);
		}
	}),

	http.delete('/api/weather/:id', async ({ params }) => {
		const { id } = params;
		const updatedWeather = Weather.filter((record) => record.id !== Number(id));
		Weather.length = 0;
		Weather.push(...updatedWeather);

		return HttpResponse.json({Weather}, { status: 200 });
	}),
];
