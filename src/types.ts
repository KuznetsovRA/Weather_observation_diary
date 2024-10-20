export interface TWeatherRecord {
	id: number;
	dateTime: string;
	temperature: number;
	weather: TWeather;
	filledBy: string;
	comment?: string;
}

export interface TUser {
	id: number;
	name: string;
}

export type TWeather = 'Sunny' | 'Rainy' | 'Cloudy';
