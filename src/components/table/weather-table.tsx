import { Button } from 'primereact/button';
import './weather-table.scss';
import {useEffect, useState} from 'react';
import {useDeleteWeatherRecordMutation, useGetWeatherQuery} from '../../api/weather-api.ts';
import {TWeatherRecord} from '../../types.ts';


export const WeatherTable = () => {
	const [weatherRecords, setWeatherRecords] = useState<TWeatherRecord[] >([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(null);

	const { data, error: fetchError, isFetching } = useGetWeatherQuery();

	useEffect(() => {
		setError(fetchError);

		if (data) {
			setWeatherRecords(data);
			setIsLoading(false);
			setError(null);
		}
		if (fetchError) {
			console.error('Error fetching weather records:', fetchError);
			setIsLoading(false);
		}
	}, [data, fetchError, isFetching]);

	const [deleteWeatherRecord] = useDeleteWeatherRecordMutation();

	const handleDelete = async (id: number) => {
		try {
			await deleteWeatherRecord(id).unwrap();
		} catch (error) {
			console.error('Failed to delete the record:', error);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	return (
		<table className="weather-table">
			<thead>
			<tr>
				<th>Дата и время</th>
				<th>Температура</th>
				<th>Погода</th>
				<th>Кто заполнил</th>
				<th>Комментарий</th>
				<th>Действие</th>
			</tr>
			</thead>
			<tbody>
			{weatherRecords?.map((record, index) => (
				<tr key={index}>
					<td>{record.dateTime}</td>
					<td>{record.temperature}</td>
					<td>{record.weather}</td>
					<td>{record.filledBy}</td>
					<td className={`comment-cell`}>{record.comment}</td>
					<td><Button label="Удалить" onClick={() => handleDelete(record.id)} /></td>
				</tr>
			))}
			{weatherRecords?.length === 0 && (
				<tr>
					<td colSpan={6} id={`no-records`}>0 записей</td>
				</tr>
			)}
			</tbody>
		</table>
	);
};
