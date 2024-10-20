import {TWeatherRecord, TUser } from '../types.ts';
import {Weather as WeatherTypes} from '../const.ts';

export const Weather: TWeatherRecord[] = [
	{ id: 1, filledBy: 'Roman', temperature: -45, weather: WeatherTypes[1], comment: 'Romancommecommecommecommecomment', dateTime:`01.01.2024 00:00`},
	{ id: 2, filledBy: 'Ivan', temperature: +45, weather: WeatherTypes[2], comment: 'Romancomment', dateTime:`01.01.2024 00:00`},
]

export let Users: TUser[] = [
	{ id: 1, name: 'Roman' },
	{ id: 2, name: 'Ivan' },
];
